import { defineStore } from "pinia";

// 메일 타입 정의
export interface Mail {
    id: number;
    sender: string;
    receiver: string;
    subject: string;
    content: string;
    created: string;
}

export const useMailStore = defineStore('mail', {
    state: () => ({
        mails: [
            {
                id: 1,
                sender: "영업팀 김나래",
                receiver: "홍길동",
                subject: "발주서 확인 요청",
                content: "안녕하세요,\n\n첨부된 발주서 내용을 확인해 주시기 바랍니다.\n\n주요 확인 사항:\n1. 발주 품목 및 수량\n2. 납기 일정\n3. 단가 및 총액\n4. 특별 요구사항\n\n검토 후 승인 여부를 회신해 주시면 감사하겠습니다.\n빠른 처리 부탁드립니다.\n\n감사합니다.",
                created: "2025-08-10T09:00:00Z"
            },
            {
                id: 2,
                sender: "PM 이도현",
                receiver: "홍길동",
                subject: "주간 프로젝트 진행 현황 공유",
                content: "안녕하세요,\n\n이번 주 프로젝트 진행 현황을 공유드립니다.\n\n[진행 현황]\n• 백엔드 API 개발: 85% 완료\n• 프론트엔드 UI 구현: 70% 완료\n• QA 테스트: 50% 완료\n• 문서화 작업: 30% 완료\n\n[다음 주 계획]\n• API 최종 테스트 및 배포\n• UI 마무리 작업\n• 통합 테스트 진행\n\n궁금한 사항이 있으시면 언제든지 연락주세요.\n\n감사합니다.",
                created: "2025-08-10T14:30:00Z"
            },
            {
                id: 3,
                sender: "인프라운영팀",
                receiver: "홍길동",
                subject: "개발 서버 점검 안내 (08/12 20:00)",
                content: "개발 서버 정기 점검 안내\n\n점검 일시: 2025년 8월 12일 (수) 20:00 ~ 23:00\n대상 서버: 개발서버 전체 (DEV, STG)\n\n점검 내용:\n• 보안 패치 적용\n• 데이터베이스 최적화\n• 로그 정리 및 백업\n• 성능 모니터링 설정 업데이트\n\n점검 중에는 개발 서버 접속이 불가능합니다.\n작업 일정을 미리 조정해 주시기 바랍니다.\n\n문의사항이 있으시면 인프라팀으로 연락주세요.",
                created: "2025-08-11T10:15:00Z"
            },
            {
                id: 4,
                sender: "디자인팀 박예린",
                receiver: "홍길동",
                subject: "디자인 시안 2차 리뷰 요청",
                content: "안녕하세요,\n\n1차 피드백을 반영한 디자인 시안을 첨부로 보내드립니다.\n\n수정 사항:\n• 메인 페이지 레이아웃 개선\n• 버튼 스타일 통일\n• 컬러 팔레트 조정\n• 모바일 반응형 최적화\n\n검토 후 추가 의견이나 수정사항이 있으시면\n8월 13일까지 회신해 주시기 바랍니다.\n\n최종 시안 확정 후 개발팀과 협업하여\n구현 가이드를 제작하겠습니다.\n\n감사합니다.",
                created: "2025-08-11T16:20:00Z"
            },
            {
                id: 5,
                sender: "컨설팅팀 조민준",
                receiver: "홍길동",
                subject: "회의록: 고객사 A 기능 정의 회의(08/11)",
                content: "고객사 A와의 기능 정의 회의 결과를 공유드립니다.\n\n회의 일시: 2025년 8월 11일 (화) 14:00-16:00\n참석자: 고객사 A (김부장, 이과장), 당사 (조민준, 박개발자)\n\n주요 논의 사항:\n1. 사용자 권한 관리 시스템 요구사항\n2. 데이터 내보내기 기능 상세 정의\n3. 알림 시스템 구현 방안\n4. 모바일 앱 연동 방식\n\n결정 사항:\n• 3단계 권한 체계 적용\n• Excel/PDF 형태 내보내기 지원\n• 실시간/배치 알림 혼합 방식\n• REST API 기반 연동\n\n다음 회의: 8월 18일 (화) 동일 시간\n\n자세한 내용은 첨부된 회의록을 참조해 주세요.",
                created: "2025-08-11T17:45:00Z"
            },
            {
                id: 6,
                sender: "경영지원팀",
                receiver: "홍길동",
                subject: "결재 요청: 계약서 초안",
                content: "계약서 초안 검토 및 결재 요청드립니다.\n\n계약 건명: ○○회사 시스템 구축 프로젝트\n계약 금액: 150,000,000원\n계약 기간: 2025.11.01 ~ 2025.11.31\n\n주요 계약 조건:\n• 분할 지급: 착수금 30%, 중간금 40%, 잔금 30%\n• 하자보수 기간: 1년\n• 지적재산권: 당사 소유\n• 기술 이전 및 교육 포함\n\n첨부 문서:\n- 계약서 초안\n- 사업제안서\n- 기술 검토서\n- 비용 산정 내역서\n\n8월 14일까지 검토 및 결재 부탁드립니다.\n\n문의사항이 있으시면 경영지원팀으로 연락주세요.",
                created: "2025-08-12T09:30:00Z"
            },
            {
                id: 7,
                sender: "QA 김지훈",
                receiver: "홍길동",
                subject: "QA 이슈 리스트 업데이트",
                content: "주간 QA 테스트 결과 및 이슈 현황을 업데이트했습니다.\n\n[테스트 진행률]\n• 기능 테스트: 95% 완료\n• 성능 테스트: 80% 완료\n• 보안 테스트: 70% 완료\n• 호환성 테스트: 85% 완료\n\n[발견된 이슈]\n• 치명적(Critical): 0건\n• 높음(High): 2건\n• 보통(Medium): 5건\n• 낮음(Low): 8건\n\n[주요 이슈]\n1. 대용량 파일 업로드 시 시간 초과 (HIGH)\n2. 브라우저별 UI 렌더링 차이 (MEDIUM)\n3. 모바일에서 특정 기능 느림 (MEDIUM)\n\n상세한 이슈 내용은 첨부된 리포트를 확인해 주세요.\n개발팀과 협의하여 우선순위별로 수정 작업을 진행하겠습니다.\n\n감사합니다.",
                created: "2025-08-12T15:20:00Z"
            },
            {
                id: 8,
                sender: "HR팀 최수민",
                receiver: "홍길동",
                subject: "2025년 하반기 교육 계획 안내",
                content: "2025년 하반기 직원 교육 일정을 안내드립니다.\n\n[기술 교육]\n• 클라우드 보안 워크샵: 9월 5일\n• React 심화 과정: 9월 12일\n• 데이터베이스 최적화: 9월 19일\n• API 설계 방법론: 9월 26일\n\n[업무 역량 강화]\n• 프로젝트 관리 기법: 10월 2일\n• 커뮤니케이션 스킬: 10월 9일\n• 리더십 개발: 10월 16일\n\n교육 신청은 인사시스템에서 8월 20일까지 접수해 주세요.\n참석 인원에 따라 일정 조정이 있을 수 있습니다.\n\n문의사항은 HR팀으로 연락주세요.",
                created: "2025-08-13T11:00:00Z"
            },
            {
                id: 9,
                sender: "보안팀 이정호",
                receiver: "홍길동",
                subject: "보안 정책 업데이트 및 준수 사항",
                content: "회사 정보보안 정책이 업데이트되었습니다.\n\n[주요 변경 사항]\n1. 비밀번호 정책 강화\n   - 최소 12자리 이상\n   - 특수문자 2개 이상 포함\n   - 90일마다 변경 필수\n\n2. 2단계 인증 도입\n   - 모든 업무 시스템 적용\n   - 휴대폰 인증 앱 사용\n\n3. USB 사용 제한\n   - 사전 등록된 장치만 사용 가능\n   - 암호화된 USB만 허용\n\n4. 원격근무 보안 가이드\n   - VPN 필수 사용\n   - 공용 Wi-Fi 사용 금지\n\n시행일: 2025년 8월 15일\n교육 세션: 8월 13일 오후 2시\n\n필수 참석 부탁드립니다.",
                created: "2025-08-13T16:30:00Z"
            },
            {
                id: 10,
                sender: "총무팀 박소영",
                receiver: "홍길동",
                subject: "사무용품 주문 및 재고 현황",
                content: "8월 사무용품 주문 요청을 받습니다.\n\n[현재 재고 현황]\n• A4 용지: 부족 (추가 주문 필요)\n• 볼펜: 충분\n• 포스트잇: 부족\n• 파일바인더: 충분\n• 프린터 토너: 부족\n\n[주문 가능 품목]\n- 사무용지류\n- 필기구\n- 파일 정리용품\n- 컴퓨터 주변기기\n- 청소용품\n\n주문 요청은 8월 15일까지 총무팀 메일로 보내주세요.\n품목명, 수량, 사용 부서를 명시해 주시기 바랍니다.\n\n예산 내에서 우선순위에 따라 주문 진행하겠습니다.",
                created: "2025-08-14T14:20:00Z"
            }
        ] as Mail[]
    }),

    getters: {
        // 모든 메일 목록 (최신순)
        allMails: (state) => {
            return state.mails.sort((a, b) => b.id - a.id);
        }
    },

    actions: {
        // ID로 특정 메일 가져오기
        getMailById(id: number): Mail | undefined {
            return this.mails.find(mail => mail.id === id);
        },
    }
});

// 메일 관련 유틸리티 함수들
export const formatMailDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
};

export const formatMailDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};