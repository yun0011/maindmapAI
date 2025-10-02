import { defineStore } from "pinia";

// 사용자 역할 타입 정의
export type UserRole = "ceo" | "dev-manager" | "infra-manager" | "data-manager";

// 부서 타입 정의 (issueStore의 division과 매칭)
export type Division = "개발" | "인프라운영" | "데이터분석";

// CEO가 선택할 수 있는 부서 (전체 포함)
export type CEODivisionOption = "전체" | Division;

// 사용자 정보 인터페이스
export interface UserInfo {
  id: string;
  email: string;
  role: UserRole;
  division?: Division;
}

// 역할별 사용자 정보 매핑
const userProfiles: Record<UserRole, UserInfo> = {
  ceo: {
    id: "ceo",
    email: "ceo@sds.co.kr",
    role: "ceo",
  },
  "dev-manager": {
    id: "dev-manager",
    email: "dev-manager@sds.co.kr",
    role: "dev-manager",
    division: "개발",
  },
  "infra-manager": {
    id: "infra-manager",
    email: "infra-manager@sds.co.kr",
    role: "infra-manager",
    division: "인프라운영",
  },
  "data-manager": {
    id: "data-manager",
    email: "data-manager@sds.co.kr",
    role: "data-manager",
    division: "데이터분석",
  },
};

// 역할 표시 이름 매핑
export const roleDisplayNames: Record<UserRole, string> = {
  ceo: "CEO",
  "dev-manager": "개발팀장",
  "infra-manager": "인프라운영팀장",
  "data-manager": "데이터팀장",
};

// 부서 목록
export const divisions: Division[] = ["개발", "인프라운영", "데이터분석"];

// CEO가 선택할 수 있는 부서 옵션 (전체 포함)
export const ceoDivisionOptions: CEODivisionOption[] = ["전체", ...divisions];

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null as UserInfo | null,
    selectedDivision: null as Division | null, // CEO가 선택한 부서 (CEO만 사용)
    selectedCEODivision: "전체" as CEODivisionOption, // CEO가 선택한 부서 옵션 (전체 포함)
  }),

  getters: {
    // 현재 사용자가 CEO인지 확인
    isCEO: (state) => state.currentUser?.role === "ceo",
    
    // 현재 사용자의 부서 (팀장의 경우) 또는 선택된 부서 (CEO의 경우)
    currentDivision: (state) => {
      if (state.currentUser?.role === "ceo") {
        // CEO가 "전체"를 선택한 경우 null 반환 (모든 부서)
        return state.selectedCEODivision === "전체" ? null : state.selectedCEODivision as Division;
      }
      return state.currentUser?.division || null;
    },

    // 사용 가능한 역할 목록
    availableRoles: () => Object.keys(userProfiles) as UserRole[],

    // CEO가 선택할 수 있는 모든 부서 (전체 포함)
    availableDivisions: () => ceoDivisionOptions,
  },

  actions: {
    // 사용자 역할 설정
    setUserRole(role: UserRole) {
      this.currentUser = userProfiles[role];
      
      // CEO가 아닌 경우 해당 팀장의 부서로 selectedDivision 설정
      if (role !== "ceo" && this.currentUser?.division) {
        this.selectedDivision = this.currentUser.division;
        this.selectedCEODivision = this.currentUser.division;
      } else if (role === "ceo") {
        // CEO의 경우 기본적으로 "전체" 선택
        this.selectedCEODivision = "전체";
        this.selectedDivision = null;
      }
      
      // localStorage에 저장
      if (typeof window !== "undefined") {
        localStorage.setItem("userRole", role);
        localStorage.setItem("selectedCEODivision", this.selectedCEODivision);
        if (this.selectedDivision) {
          localStorage.setItem("selectedDivision", this.selectedDivision);
        }
      }
    },

    // CEO가 부서 선택
    selectDivision(division: CEODivisionOption) {
      if (this.isCEO) {
        this.selectedCEODivision = division;
        this.selectedDivision = division === "전체" ? null : division as Division;
        
        // localStorage에 저장
        if (typeof window !== "undefined") {
          localStorage.setItem("selectedCEODivision", division);
          if (this.selectedDivision) {
            localStorage.setItem("selectedDivision", this.selectedDivision);
          } else {
            localStorage.removeItem("selectedDivision");
          }
        }
      }
    },

    // 저장된 사용자 정보 로드
    loadUserFromStorage() {
      if (typeof window !== "undefined") {
        const savedRole = localStorage.getItem("userRole") as UserRole;
        const savedCEODivision = localStorage.getItem("selectedCEODivision") as CEODivisionOption;
        const savedDivision = localStorage.getItem("selectedDivision") as Division;
        
        if (savedRole && userProfiles[savedRole]) {
          this.currentUser = userProfiles[savedRole];
          
          if (savedRole === "ceo") {
            // CEO
            if (savedCEODivision && ceoDivisionOptions.includes(savedCEODivision)) {
              this.selectedCEODivision = savedCEODivision;
              this.selectedDivision = savedCEODivision === "전체" ? null : savedCEODivision as Division;
            } else {
              this.selectedCEODivision = "전체";
              this.selectedDivision = null;
            }
          } else {
            // 팀장의 경우
            if (savedDivision && divisions.includes(savedDivision)) {
              this.selectedDivision = savedDivision;
              this.selectedCEODivision = savedDivision;
            } else if (this.currentUser?.division) {
              this.selectedDivision = this.currentUser.division;
              this.selectedCEODivision = this.currentUser.division;
            }
          }
        } else {
          // 기본값: CEO
          this.setUserRole("ceo");
        }
      }
    },

    // 사용자 정보 초기화
    resetUser() {
      this.currentUser = null;
      this.selectedDivision = null;
      this.selectedCEODivision = "전체";
      
      if (typeof window !== "undefined") {
        localStorage.removeItem("userRole");
        localStorage.removeItem("selectedDivision");
        localStorage.removeItem("selectedCEODivision");
      }
    },
  },
}); 