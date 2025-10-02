<template>
  <div class="bg-gray-50 text-gray-900 flex" style="height: 100dvh">
    <div class="w-full transition-all duration-300 flex flex-col">
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="w-full py-5 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <!-- 날짜 선택 -->
            <div class="flex items-center bg-gray-50 py-1.5 px-3 rounded-md border border-gray-200 shadow-sm">
              <input
                type="date"
                id="date-select"
                v-model="selectedDate"
                class="block pl-2 pr-2 py-1 text-sm bg-transparent border-0 focus:outline-none focus:ring-0"
              />
            </div>
            
            <!-- CEO만 부서 선택 드롭다운 표시 -->
            <div v-if="userStore.isCEO" class="relative">
              <button 
                @click="toggleDivisionDropdown"
                class="flex items-center bg-gray-50 py-1.5 px-3 rounded-md border border-gray-200 shadow-sm hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <span class="block pl-2 pr-2 py-1 text-sm min-w-[80px]">{{ selectedDivision }}</span>
                <svg class="ml-1 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <!-- 드롭다운 메뉴 -->
              <div 
                v-if="isDivisionDropdownOpen" 
                class="absolute left-0 top-full mt-2 w-full bg-white rounded-md shadow-lg border border-gray-200 z-50"
                @click="closeDivisionDropdown"
              >
                <div class="py-1">
                  <button
                    v-for="division in userStore.availableDivisions" 
                    :key="division" 
                    @click="selectDivision(division)"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                    :class="{ 'bg-blue-50 text-blue-700': selectedDivision === division }"
                  >
                    {{ division }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main class="flex-grow overflow-auto px-4 sm:px-6 lg:px-8 py-2 pb-2">
        <IssueList 
          :selected-date="selectedDate" 
          :division="userStore.currentDivision" 
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import IssueList from "@/components/brief-pilot/IssueList.vue";
import { useUserStore, type UserRole, roleDisplayNames, type CEODivisionOption } from "@/stores/userStore";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const LOCAL_STORAGE_KEY = "selectedDate";

// URL 파라미터에서 역할 가져오기
const role = computed(() => route.params.role as UserRole);

// 역할 표시 이름
const roleDisplayName = computed(() => roleDisplayNames[role.value] || role.value);

// 선택된 부서 (CEO만 사용)
const selectedDivision = ref<CEODivisionOption>(userStore.selectedCEODivision);

// 드롭다운 상태
const isDivisionDropdownOpen = ref(false);

function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getInitialDate(): string {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const dateFromUrl = urlParams.get("date");
    if (dateFromUrl) {
      // URL에서 받은 날짜를 localStorage에 저장
      localStorage.setItem(LOCAL_STORAGE_KEY, dateFromUrl);
      return dateFromUrl;
    }

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) return saved;
  }
  return getTodayDateString();
}

const selectedDate = ref(getInitialDate());

// 부서 변경 핸들러 (CEO만)
function onDivisionChange() {
  if (userStore.isCEO && selectedDivision.value) {
    userStore.selectDivision(selectedDivision.value);
  }
}

// 드롭다운 토글
function toggleDivisionDropdown() {
  isDivisionDropdownOpen.value = !isDivisionDropdownOpen.value;
}

// 드롭다운 닫기
function closeDivisionDropdown() {
  isDivisionDropdownOpen.value = false;
}

// 부서 선택 핸들러
function selectDivision(division: CEODivisionOption) {
  selectedDivision.value = division;
  isDivisionDropdownOpen.value = false;
  userStore.selectDivision(division);
}

// 날짜 변경 감지
watch(selectedDate, (newVal) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, newVal);
  }
});

// 선택된 부서 변경 감지
watch(() => userStore.selectedCEODivision, (newDivision) => {
  selectedDivision.value = newDivision;
});

// 컴포넌트 마운트 시 초기화
onMounted(() => {
  // 유효한 역할인지 확인
  const validRoles = userStore.availableRoles;
  if (!validRoles.includes(role.value)) {
    // 유효하지 않은 역할인 경우 CEO 페이지로 리다이렉트
    router.push('/brief-pilot/ceo');
    return;
  }

  // 사용자 역할 설정
  userStore.setUserRole(role.value);
  
  // 저장된 사용자 정보 로드
  userStore.loadUserFromStorage();
  
  // 초기 부서 설정
  selectedDivision.value = userStore.selectedCEODivision;
  
  // 외부 클릭 시 드롭다운 닫기
  document.addEventListener('click', handleOutsideClick);
});

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});

// 외부 클릭 핸들러
function handleOutsideClick(event: Event) {
  const dropdown = event.target as HTMLElement;
  if (!dropdown.closest('.relative')) {
    isDivisionDropdownOpen.value = false;
  }
}
</script> 