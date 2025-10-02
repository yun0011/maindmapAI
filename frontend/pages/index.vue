<template>
  <div class="w-full p-10 grid grid-cols-[1fr_1.3fr_0.9fr] gap-6">
    <!-- 좌측 섹션 -->
    <div class="flex flex-col gap-6 h-[1100px]">
      <!-- 근태 기록 섹션 -->
      <div class="bg-white rounded-lg shadow p-4 border border-gray-400">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold">오늘의 근무 기록</h2>
          <Button variant="roundedGray" size="lg" class="px-14 py-3 text-lg">퇴근체크</Button>
        </div>
        <div class="border-t border-gray-200 py-3 border-b">
          <div class="flex justify-between text-sm font-bold px-16">
            <div>출근시간 <span class="text-blue-700 font-bold">09:00</span></div>
            <div>퇴근시간 <span class="text-blue-700 font-bold">기록없음</span></div>
          </div>
        </div>
        <h2 class="text-xl font-bold mb-4 mt-7">금주의 근태 기록</h2>
        <div class="border-t border-b">
          <div class="grid grid-cols-5 text-center border-b border-gray-700 py-3 text-sm font-bold items-center">
            <div>날짜</div>
            <div>출근</div>
            <div>퇴근</div>
            <div>근태 기록</div>
            <div>IP</div>
          </div>
          <div class="divide-y text-sm">
            <div class="grid grid-cols-5 text-center py-2 items-center">
              <div>25.08.11</div>
              <div>09:00:00</div>
              <div>18:00:00</div>
              <div>정상근무</div>
              <div class="text-gray-500">연구소(121.140.6.6)</div>
            </div>
            <div class="grid grid-cols-5 text-center py-2 items-center bg-gray-50">
              <div>25.08.12</div>
              <div>09:00:00</div>
              <div>18:00:00</div>
              <div>정상근무</div>
              <div class="text-gray-500">연구소(121.140.6.6)</div>
            </div>
            <div class="grid grid-cols-5 text-center py-2 items-center">
              <div>25.08.13</div>
              <div>09:00:00</div>
              <div>-</div>
              <div>정상근무</div>
              <div class="text-gray-500">연구소(121.140.6.6)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 결재 관리 섹션 -->
      <div class="bg-white rounded-lg shadow p-4 border border-gray-400">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-bold">결재 관리</h2>
          <div class="flex gap-2">
            <Button size="lg" class="px-3 py-2 bg-white text-blue-700 border border-blue-700 rounded-full"
              >임시저장보기</Button
            >
            <Button variant="roundedBlue" size="lg" class="px-5 py-2">기안하기</Button>
          </div>
        </div>
        <div class="p-2">
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-orange-50 p-4 text-center border border-orange-200">
              <div class="text-gray-600 mb-1">결재할 문서</div>
              <div class="font-semibold text-orange-500 text-2xl">0<span class="text-base ml-1">건</span></div>
            </div>
            <div class="bg-green-50 p-4 text-center border border-green-200">
              <div class="text-gray-600 mb-1">요청한 문서</div>
              <div class="font-semibold text-green-500 text-2xl">0<span class="text-base ml-1">건</span></div>
            </div>
            <div class="bg-purple-50 p-4 text-center border border-purple-200">
              <div class="text-gray-600 mb-1">결재완료</div>
              <div class="font-semibold text-purple-500 text-2xl">19<span class="text-base ml-1">건</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 연차 현황 섹션 -->
      <div class="bg-white rounded-lg shadow p-4 border border-gray-400 flex-1 flex flex-col">
        <div class="mb-4">
          <h2 class="text-xl font-bold">나의 연차 현황</h2>
        </div>

        <!-- 연차 통계 카드 -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="border border-gray-400 p-4 text-center">
            <div class="text-base mb-1">연차</div>
            <div class="text-2xl font-bold">15<span class="text-base ml-1">일</span></div>
          </div>
          <div class="border border-gray-400 p-4 text-center">
            <div class="text-base mb-1">사용연차</div>
            <div class="text-2xl font-bold">3<span class="text-base ml-1">일</span></div>
          </div>
          <div class="border border-gray-400 p-4 text-center">
            <div class="text-base mb-1 text-blue-700">잔여연차</div>
            <div class="text-2xl font-bold text-blue-700">12<span class="text-base ml-1">일</span></div>
          </div>
        </div>

        <!-- 연차 사용 내역 테이블 -->
        <div class="border-t border-b flex-1">
          <div class="grid grid-cols-4 text-center border-b border-gray-700 py-2 text-sm font-medium">
            <div>날짜</div>
            <div>구분</div>
            <div>시작시간</div>
            <div>종료시간</div>
          </div>
          <div class="divide-y text-sm">
            <div class="grid grid-cols-4 text-center py-2">
              <div>01월 20일</div>
              <div>휴가</div>
              <div>09:00</div>
              <div>18:00</div>
            </div>
            <div class="grid grid-cols-4 text-center py-2">
              <div>01월 06일</div>
              <div>휴가</div>
              <div>09:00</div>
              <div>18:00</div>
            </div>
            <div class="grid grid-cols-4 text-center py-2">
              <div>12월 26일</div>
              <div>휴가</div>
              <div>09:00</div>
              <div>18:00</div>
            </div>
            <div class="grid grid-cols-4 text-center py-2">
              <div>11월 12일</div>
              <div>휴가</div>
              <div>09:00</div>
              <div>18:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 중앙 섹션 -->
    <div class="bg-white rounded-lg shadow p-3 border border-gray-400 h-[1100px] flex flex-col">
      <div class="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" @click="handleMonthSelect(-1)">
          <ChevronLeft class="h-4 w-4" />
        </Button>
        <h2 class="text-xl font-semibold">{{ formatYearMonth }}</h2>
        <Button variant="ghost" size="icon" @click="handleMonthSelect(1)">
          <ChevronRight class="h-4 w-4" />
        </Button>
      </div>

      <!-- 달력 그리드 -->
      <div class="grid grid-cols-7 text-center border-b border-t border-gray-200">
        <!-- 요일 헤더 -->
        <div class="p-3 font-bold border-b border-gray-200 text-red-400">일</div>
        <div class="p-3 font-bold border-b border-gray-200">월</div>
        <div class="p-3 font-bold border-b border-gray-200">화</div>
        <div class="p-3 font-bold border-b border-gray-200">수</div>
        <div class="p-3 font-bold border-b border-gray-200">목</div>
        <div class="p-3 font-bold border-b border-gray-200">금</div>
        <div class="p-3 font-bold border-b border-gray-200 text-blue-500">토</div>

        <!-- 이전 달 날짜 -->
        <div v-for="day in calendarDays.prev" :key="`prev-${day}`" class="p-3 text-gray-400 min-h-[60px] flex">
          <span class="self-start -mt-2">{{ day }}</span>
        </div>

        <!-- 현재 달 날짜 -->
        <div
          v-for="day in calendarDays.current"
          :key="`current-${day}`"
          class="p-3 min-h-[60px] flex"
          :class="{
            'bg-gray-50':
              !isToday(day) && !isSelectedDate(day) && Math.floor((day + calendarDays.prev.length - 1) / 7) % 2 === 1,
            'text-red-400': (day + calendarDays.prev.length - 1) % 7 === 0 && !isToday(day) && !isSelectedDate(day),
            'text-blue-500': (day + calendarDays.prev.length - 1) % 7 === 6 && !isToday(day) && !isSelectedDate(day),
            '!bg-blue-700 !text-white': isToday(day),
            '!bg-blue-100 !text-white': isSelectedDate(day) && !isToday(day),
          }"
          @click="handleDateClick(day)"
        >
          <span class="self-start -mt-2">{{ day }}</span>
        </div>

        <!-- 다음 달 날짜 -->
        <div v-for="day in calendarDays.next" :key="`next-${day}`" class="p-3 text-gray-300 min-h-[60px] flex">
          <span class="self-start -mt-2">{{ day }}</span>
        </div>
      </div>

      <!-- Brief-Pilot 위젯 -->
      <div class="mt-6 flex-1 min-h-0">
        <div class="mb-3 px-2 flex items-center justify-between">
          <h2 class="text-lg font-bold">Brief-Pilot</h2>
          <Button
            variant="squareWhite"
            class="px-2 h-7 bg-gray-50 border border-gray-400 text-gray-500 text-md hover:bg-gray-50"
            @click="navigateToBriefPilot"
          >
            +
          </Button>
        </div>
        <div class="border-t border-b h-[calc(100%-2.5rem)] overflow-y-auto">
          <div v-if="issueStore.isLoading" class="h-full flex items-center justify-center text-gray-600">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <div v-else-if="issueStore.error" class="h-full flex items-center justify-center text-red-500">
            {{ issueStore.error }}
          </div>
          <div v-else-if="filteredIssues.length === 0" class="h-full flex items-center justify-center text-gray-600">
            {{ noIssuesMessage }}
          </div>
          <div v-else class="p-3 space-y-2">
            <div
              v-for="(issue, index) in filteredIssues"
              :key="issue.id"
              class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer"
              :class="{ 'bg-gray-50': index % 2 === 1, 'bg-white': index % 2 === 0 }"
              @click="handleIssueClick(issue)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-gray-900 text-sm leading-tight mb-1 truncate">
                    {{ issue.title }}
                  </h3>
                  <p class="text-xs text-gray-600 mb-1">업무 주도자: {{ issue.leader }}</p>
                  <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {{ formatReportContent(issue.report_content) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 우측 섹션 -->
    <div class="flex flex-col h-[1100px] space-y-6">
      <div class="flex gap-2">
        <Button variant="squareBlue" size="lg" class="px-20 py-5 text-2xl">메일쓰기</Button>
        <Button variant="squareWhite" size="lg" class="px-20 py-5 text-2xl">내게쓰기</Button>
      </div>

      <!-- 메일 사용량 섹션 -->
      <div class="bg-white rounded-lg shadow p-4 border border-gray-400">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold">메일 사용량</h2>
          <div class="text-blue-700 font-bold">159.1 MB / 무제한</div>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-3 mb-4">
          <div class="bg-blue-700 h-full rounded-full" style="width: 15.91%"></div>
        </div>
        <div class="flex items-center justify-between text-sm">
          <div class="font-bold">메일모아보기</div>
          <div class="flex items-center gap-2">
            <div class="font-bold">안읽음</div>
            <div class="w-[1px] h-3 bg-gray-300"></div>
            <div class="font-bold">중요</div>
            <div class="w-[1px] h-3 bg-gray-300"></div>
            <div class="font-bold">보호</div>
            <div class="w-[1px] h-3 bg-gray-300"></div>
            <div class="font-bold">임시</div>
            <div class="w-[1px] h-3 bg-gray-300"></div>
            <div class="font-bold">첨부</div>
          </div>
        </div>
      </div>

      <!-- 메일함 섹션 -->
      <div class="bg-white rounded-lg shadow p-4 border border-gray-400">
        <div class="flex items-center gap-2">
          <Button
            variant="squareBlue"
            class="px-5 py-5 bg-white border-t border-l border-r border-blue-700 text-blue-700 text-md hover:bg-white relative"
            >받은 메일 <span class="text-blue-700 font-bold ml-1">{{ mailStore.allMails.length }}</span>
            <div class="absolute bottom-[-1px] left-0 w-full h-[1px] bg-white"></div>
          </Button>
          <Button
            variant="squareWhite"
            class="px-5 py-5 bg-gray-50 border-t border-l border-r border-gray-400 text-gray-500 text-md hover:bg-gray-50 relative"
            >보낸 메일
            <div class="absolute bottom-[-1px] left-0 w-full h-[1px] bg-white"></div>
          </Button>
          <Button
            variant="squareWhite"
            class="px-2 h-7 bg-gray-50 border border-gray-400 text-gray-500 text-md hover:bg-gray-50 ml-auto"
            @click="router.push('/mail')"
          >
            +
          </Button>
        </div>
        <div class="border-t border-b">
          <div class="grid grid-cols-[2fr_0.8fr_0.8fr] text-center border-b border-gray-700 py-3 text-sm font-bold">
            <div>제목</div>
            <div>보낸 사람</div>
            <div>받은 날짜</div>
          </div>
          <div class="divide-y text-sm">
            <div
              v-for="(mail, index) in mailStore.allMails.slice(0, 7)"
              :key="mail.id"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              class="grid grid-cols-[2fr_0.8fr_0.8fr] text-center py-3 cursor-pointer hover:bg-blue-50"
              @click="router.push(`/mail/${mail.id}`)"
            >
              <div class="text-left pl-3 truncate">{{ mail.subject }}</div>
              <div>{{ mail.sender }}</div>
              <div>{{ formatMailDate(mail.created) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 게시판 섹션 -->
      <div class="bg-white rounded-lg shadow p-4 border border-gray-400 flex-1 flex flex-col">
        <div class="mb-4">
          <h2 class="text-xl font-bold">게시판(공지사항)</h2>
        </div>
        <div class="border-t border-b flex-1">
          <div class="divide-y text-sm">
            <div class="grid grid-cols-[1.7fr_0.5fr] py-3 bg-white">
              <div class="text-left pl-3">2025년도 법정의무교육 온라인 교육수강 안내의 건_감정…</div>
              <div class="text-center">25.07.22</div>
            </div>
            <div class="grid grid-cols-[1.7fr_0.5fr] py-3 bg-gray-50">
              <div class="text-left pl-3">2025년도 법정의무교육 온라인 교육수강 안내의 건</div>
              <div class="text-center">25.07.17</div>
            </div>
            <div class="grid grid-cols-[1.7fr_0.5fr] py-3 bg-white">
              <div class="text-left pl-3">2025년 내부관리계획 개정 공지</div>
              <div class="text-center">25.01.02</div>
            </div>
            <div class="grid grid-cols-[1.7fr_0.5fr] py-3 bg-gray-50">
              <div class="text-left pl-3">2025년 개인정보 관련 지침 및 업무가이드 문서 배포</div>
              <div class="text-center">25.01.02</div>
            </div>
            <div class="grid grid-cols-[1.7fr_0.5fr] py-3 bg-white">
              <div class="text-left pl-3">2024년도 법정의무교육 온라인 교육수강 안내의 건</div>
              <div class="text-center">24.07.15</div>
            </div>
            <div class="grid grid-cols-[1.7fr_0.5fr] py-3 bg-gray-50">
              <div class="text-left pl-3">2024년 내부관리계획 개정 공지</div>
              <div class="text-center">24.01.02</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 이슈 리포트 모달 -->
  <div
    v-if="showReportModal && selectedIssue"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    @click="closeReportModal"
  >
    <div class="bg-white rounded-lg w-full max-w-3xl h-[600px] overflow-hidden shadow-xl" @click.stop>
      <div class="flex justify-between items-center border-b border-gray-200 px-6 py-4">
        <h2 class="text-xl font-semibold text-gray-900">{{ selectedIssue.title }}</h2>
        <button @click="closeReportModal" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="overflow-y-auto h-[calc(600px-80px)]">
        <ReportSummary :issue-id="selectedIssue.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/ui/button/Button.vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { computed, ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMailStore, formatMailDate } from "@/stores/mailStore";
import { useIssueStore } from "@/stores/issueStore";
import { useReportStore } from "@/stores/reportStore";
import { useUserStore } from "@/stores/userStore";
import ReportSummary from "@/components/brief-pilot/ReportSummary.vue";

const router = useRouter();
const mailStore = useMailStore();
const issueStore = useIssueStore();
const reportStore = useReportStore();
const userStore = useUserStore();
const viewDate = ref(new Date());
const selectedDate = ref(null);

// 모달 관련 상태
const showReportModal = ref(false);
const selectedIssue = ref(null);
const viewYear = computed(() => viewDate.value.getFullYear());
const viewMonth = computed(() => viewDate.value.getMonth());

const handleMonthSelect = (delta) => {
  viewDate.value = new Date(viewYear.value, viewMonth.value + delta, 1);
};

const formatYearMonth = computed(() => {
  return `${viewYear.value}년 ${String(viewMonth.value + 1).padStart(2, "0")}월`;
});

const calendarDays = computed(() => {
  const firstDay = new Date(viewYear.value, viewMonth.value, 1);
  const lastDay = new Date(viewYear.value, viewMonth.value + 1, 0);

  // 이전 달의 마지막 날짜들
  const prevMonthDays = [];
  const firstDayOfWeek = firstDay.getDay();
  if (firstDayOfWeek > 0) {
    const prevLastDay = new Date(viewYear.value, viewMonth.value, 0);
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push(prevLastDay.getDate() - i);
    }
  }

  // 현재 달의 날짜들
  const currentMonthDays = Array.from({ length: lastDay.getDate() }, (_, i) => i + 1);

  // 다음 달의 시작 날짜들 (현재 주차 완성용)
  const nextMonthDays = [];
  const lastDayOfWeek = (firstDayOfWeek + currentMonthDays.length - 1) % 7;
  if (lastDayOfWeek !== 6) {
    const daysNeeded = 6 - lastDayOfWeek;
    for (let i = 1; i <= daysNeeded; i++) {
      nextMonthDays.push(i);
    }
  }

  return {
    prev: prevMonthDays,
    current: currentMonthDays,
    next: nextMonthDays,
  };
});

const isToday = (day) => {
  const today = new Date();
  return today.getFullYear() === viewYear.value && today.getMonth() === viewMonth.value && today.getDate() === day;
};

const isSelectedDate = (day) => {
  if (!selectedDate.value) return false;
  const selected = new Date(selectedDate.value);
  return (
    selected.getFullYear() === viewYear.value && selected.getMonth() === viewMonth.value && selected.getDate() === day
  );
};

const handleDateClick = (day) => {
  const clickedDate = new Date(viewYear.value, viewMonth.value, day);
  // 로컬 시간대를 기준으로 YYYY-MM-DD 형식 생성
  const year = clickedDate.getFullYear();
  const month = String(clickedDate.getMonth() + 1).padStart(2, "0");
  const dayStr = String(clickedDate.getDate()).padStart(2, "0");
  const dateString = `${year}-${month}-${dayStr}`;

  selectedDate.value = dateString;
  issueStore.setSelectedDate(dateString);
};

const handleIssueClick = async (issue) => {
  try {
    // reportStore에서 해당 이슈 ID로 리포트 데이터 가져오기
    await reportStore.fetchReport(issue.id);
    // 선택된 이슈 설정하고 모달 열기
    selectedIssue.value = issue;
    showReportModal.value = true;
    // body 스크롤 방지
    document.body.style.overflow = "hidden";
  } catch (error) {
    console.error("이슈 클릭 처리 중 오류:", error);
  }
};

// 모달 닫기 함수
const closeReportModal = () => {
  showReportModal.value = false;
  selectedIssue.value = null;
  document.body.style.overflow = "";
  reportStore.clearSelectedIssueId();
};

// 리포트 내용 포맷팅
const formatReportContent = (content) => {
  if (!content || typeof content !== "string") {
    return "내용이 없습니다.";
  }
  const cleanContent = content.replace(/\[message_id:\s*\d+(?:\s*,\s*\d+)*\]/g, "").trim();
  return cleanContent.length > 100 ? cleanContent.slice(0, 100) + "..." : cleanContent;
};

// 선택된 날짜가 변경될 때마다 이슈를 가져옴
watch(selectedDate, (newDate) => {
  if (newDate) {
    issueStore.fetchIssues(newDate);
  }
});

// 페이지 로드 시 오늘 날짜를 자동으로 선택
onMounted(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayString = `${year}-${month}-${day}`;

  selectedDate.value = todayString;
  issueStore.setSelectedDate(todayString);

  userStore.loadUserFromStorage();
});

// Brief-Pilot 버튼 클릭 시 현재 사용자 역할에 따른 동적 링크로 이동
const navigateToBriefPilot = () => {
  // 저장된 사용자 정보 로드
  userStore.loadUserFromStorage();

  // 현재 사용자 역할에 따라 적절한 페이지로 이동
  const currentRole = userStore.currentUser?.role || "ceo";
  const routePath = `/brief-pilot/${currentRole}`;

  // 선택된 날짜가 있으면 쿼리 파라미터로 추가
  const query = selectedDate.value ? { date: selectedDate.value } : {};

  router.push({ path: routePath, query });
};

// 이슈 필터링 (사용자 역할에 따라)
const filteredIssues = computed(() => {
  // CEO인 경우 위젯에서는 항상 모든 이슈 표시
  if (userStore.isCEO) {
    return issueStore.issues;
  } else {
    // 팀장은 본인 부서 이슈만 표시
    const currentDivision = userStore.currentDivision;
    return currentDivision ? issueStore.issues.filter((issue) => issue.division === currentDivision) : [];
  }
});

// 이슈가 없을 때 표시할 메시지
const noIssuesMessage = computed(() => {
  // CEO인 경우 위젯에서는 항상 전체 메시지
  if (userStore.isCEO) {
    return "선택한 날짜에 이슈가 없습니다.";
  } else {
    // 팀장인 경우 해당 부서 메시지
    const currentDivision = userStore.currentDivision;
    return currentDivision
      ? `선택한 날짜에 ${currentDivision} 부서의 이슈가 없습니다.`
      : "선택한 날짜에 이슈가 없습니다.";
  }
});
</script>
