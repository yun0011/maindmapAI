import { defineStore } from "pinia";
import type { Division } from "./userStore";

// API 응답 데이터 구조 정의
// TODO: 실제 API 응답 데이터 타입에 맞게 변경
// NOTE: 구현시 임의로 사용한 API 응답 명세서
// - 요청 url example: http://localhost:9000/issue/list=20250708
//    - 요청 메서드: GET
//    - 요청 파라미터: date (YYYYMMDD 형식)
// - 응답 데이터:
//    - 응답 데이터 타입: JSON
//    - 응답 데이터:
//      - issueid: 이슈 고유 아이디 (number)
//      - issue_title: 이슈 제목 (string)
//      - report_content: 이슈 내용 (string)
//      - issue_leader: 업무 주도자 (string)
//      - division: 이슈 소속 부서 (string)
// 응답 예시:
// [
//     {
//         "issueid": 21,
//         "issue_title": "프로젝트 AI Chatbot DB 마이그레이션",
//         "report_content": "...분석을 진행 중입니다. [message_id: 2103]",
//         "issue_leader": "김철수"
//         "division": "개발"
//   }
// ]

export interface IssueAPIResponse {
  issueid: number;
  issue_title: string;
  report_content: string;
  issue_leader: string;
  division: string;
}

export interface Issue {
  id: number;
  title: string;
  report_content: string;
  leader: string;
  date: string | null;
  timestamp: string;
  division: Division;
}

export const useIssueStore = defineStore("issues", {
  state: () => ({
    issues: [] as Issue[],
    selectedIssue: null as Issue | null,
    isLoading: false,
    error: null as string | null,
    selectedDate: null as string | null,
    _activeRequestId: null as number | null,
    _abortController: null as AbortController | null,
  }),

  getters: {
    // 특정 부서의 이슈만 필터링
    issuesByDivision: (state) => (division: Division | null) => {
      if (!division) return state.issues;
      return state.issues.filter(issue => issue.division === division);
    },
  },

  actions: {
    clearSelectedIssue() {
      this.selectedIssue = null;
    },
    getSelectedDate() {
      return this.selectedDate;
    },
    setSelectedDate(date: string) {
      this.selectedDate = date || null;
    },
    selectIssue(issue: Issue | null) {
      this.selectedIssue = issue;
    },

    async fetchIssues(date: string) {
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

      const formattedDate = date ? date.replace(/-/g, "") : "";

      try {
        const config = useRuntimeConfig();
        const baseUrl = config.public.baseUrl;
        const path = `issue/list=${formattedDate}`;
        const url = baseUrl ? `${baseUrl.replace(/\/$/, "")}/${path}` : `/${path}`; // TODO: 이후 실제 API 명세서에 맞게 변경

        const response = await fetch(url, { signal: this._abortController.signal });

        // 최신 요청만 처리
        if (this._activeRequestId !== requestId) return;

        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }

        const data: IssueAPIResponse[] = await response.json();

        // API 데이터를 내부 Issue 타입으로 변환
        const mappedIssues: Issue[] = data.map((item) => {
          // report_content 문자열에서 [message_id: 123] 패턴을 찾아 숫자 배열로 추출
          const messageIds: number[] = (item.report_content.match(/\[message_id:\s*(\d+)\]/g) || [])
            .map((match) => parseInt(match.match(/\d+/)![0], 10))
            .filter((id) => !Number.isNaN(id));

          return {
            id: item.issueid,
            title: item.issue_title,
            report_content: item.report_content,
            leader: item.issue_leader,
            division: item.division as Division,
            date: formattedDate || null,
            timestamp: new Date().toISOString(),
          } as Issue;
        });
        this.issues = mappedIssues;
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        if (this._activeRequestId !== requestId) return;
        console.error("이슈 목록을 가져오는 중 오류가 발생했습니다:", err);
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
