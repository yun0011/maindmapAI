import { defineStore } from "pinia";

// API 응답 데이터 구조 정의
// TODO: 실제 API 응답 데이터 타입에 맞게 변경
// NOTE: 구현시 임의로 사용한 API 응답 명세서
// - 요청 url example: http://localhost:9000/report/21
//    - 요청 메서드: GET
//    - 요청 파라미터: id (이슈 고유 아이디)
// - 응답 데이터:
//    - 응답 데이터 타입: JSON
//    - 응답 데이터:
//      - report_content: 이슈 내용 (string)
//      - participants: 참여자 목록 (Vec<Object> (name, email))
//      - issue_leader: 업무 주도자 (Object(name, email))
//      - category: 카테고리 (string)
//      - reference: 참조 메시지 목록 (Vec<Object> (message_id, content, timestamp, sender, receiver))
// 응답 예시:
// {
//     "report_content": "...필터 UX를 개선해 사용자 클릭 경로를 15% 감소시켰습니다. [message_id: 2903]",
//     "participants": [
//         {
//             "name": "오준호",
//             "email": "junho@google.com"
//         },
//         {
//             "name": "김철수",
//             "email": "chul@google.com"
//         },
//         {
//             "name": "김유리",
//             "email": "yuri@google.com"
//         }
//     ],
//     "issue_leader": {
//         "name": "오준호",
//         "email": "junho@google.com"
//     },
//     "category": "유지보수",
//     "reference": [
//         {
//             "message_id": 2901,
//             "content": "대시보드 쿼리 최적화로 렌더링 시간 20% 단축",
//             "timestamp": "2025-08-11",
//             "sender": {
//                 "name": "오준호",
//                 "email": "junho@google.com"
//             },
//             "receiver": [
//                 {
//                     "name": "김철수",
//                     "email": "chul@google.com"
//                 },
//                 {
//                     "name": "김유리",
//                     "email": "yuri@google.com"
//                 }
//             ]
//         },
//         {
//             "message_id": 2902,
//             "content": "캐시 계층 도입 및 만료 정책 정교화",
//             "timestamp": "2025-08-11",
//             "sender": {
//                 "name": "김철수",
//                 "email": "chul@google.com"
//             },
//             "receiver": [
//                 {
//                     "name": "오준호",
//                     "email": "junho@google.com"
//                 },
//                 {
//                     "name": "김유리",
//                     "email": "yuri@google.com"
//                 }
//             ]
//         }
//     ]
// }

interface ApiPerson {
  name: string;
  email: string;
}

interface ApiReference {
  message_id: number;
  content: string;
  timestamp: string;
  sender: ApiPerson;
  receiver: ApiPerson[];
}

interface ReportAPIResponse {
  report_content: string;
  participants: ApiPerson[];
  issue_leader: ApiPerson;
  category: string;
  reference: ApiReference[];
}

// 스토어 내부 사용 타입
interface ReportData {
  id: number;
  content: string;
  leader: string;
  category: string;
}

interface ReferenceMessage {
  messageId: number;
  content: string;
  receivers: string[];
  sender: string;
  timestamp: string;
}

export interface Participant {
  name: string;
  email: string;
}

export const useReportStore = defineStore("report", {
  state: () => ({
    participants: [] as Participant[],
    reportData: null as ReportData | null,
    referenceMessages: [] as ReferenceMessage[],
    selectedIssueId: null as number | null,
    isLoading: false,
    error: null as string | null,
    _activeRequestId: null as number | null,
    _abortController: null as AbortController | null,
  }),

  actions: {
    setParticipants(list: Participant[]) {
      this.participants = Array.isArray(list) ? list : [];
    },

    clearSelectedIssueId() {
      this.selectedIssueId = null;
    },

    async fetchReport(id: number) {
      if (!id) return;

      const requestId = Date.now();
      this._activeRequestId = requestId;

      // 이전 요청 중단
      if (this._abortController) {
        try {
          this._abortController.abort();
        } catch {}
      }
      this._abortController = new AbortController();

      this.isLoading = true;
      this.error = null;
      this.reportData = null;
      this.referenceMessages = [];
      this.participants = [];
      this.selectedIssueId = id;

      try {
        const config = useRuntimeConfig();
        const baseUrl = config.public.baseUrl;
        const path = `report/${id}`;
        const url = baseUrl ? `${baseUrl.replace(/\/$/, "")}/${path}` : `/${path}`;

        const response = await fetch(url, { signal: this._abortController.signal });

        // 최신 요청만 처리
        if (this._activeRequestId !== requestId) return;

        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }

        const data: ReportAPIResponse = await response.json();

        this.reportData = {
          id,
          content: data.report_content ?? "",
          leader: data.issue_leader?.name ?? "",
          category: data.category ?? "",
        };

        this.setParticipants((data.participants ?? []).map((p) => ({ name: p.name, email: p.email })));

        this.referenceMessages = (data.reference ?? []).map((r) => ({
          messageId: r.message_id,
          content: r.content ?? "",
          receivers: (r.receiver ?? []).map((rec) => rec.name),
          sender: r.sender?.name ?? "",
          timestamp: r.timestamp ?? "",
        }));
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        if (this._activeRequestId !== requestId) return;
        console.error("보고서를 가져오는 중 오류가 발생했습니다:", err);
        this.error = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      } finally {
        if (this._activeRequestId === requestId) {
          this.isLoading = false;
          this._abortController = null;
        }
      }
    },
  },
});
