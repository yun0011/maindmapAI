<template>
  <section class="flex flex-col" style="height: 100%">
    <div class="bg-white shadow-lg overflow-hidden rounded-xl border border-gray-200 h-full flex">
      <!-- 좌측 패널: 이슈 목록 -->
      <div class="w-1/3 border-r border-gray-200 flex flex-col max-h-full">
        <!-- 로딩 상태 표시 -->
        <div v-if="issueStore.isLoading" class="flex-1 flex items-center justify-center">
          <div class="text-center">
            <svg
              class="animate-spin mx-auto h-8 w-8 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p class="mt-2 text-base text-gray-500">이슈 목록을 불러오는 중...</p>
          </div>
        </div>

        <!-- 에러 상태 표시 -->
        <div v-else-if="issueStore.error" class="flex-1 flex items-center justify-center">
          <div class="text-center p-4">
            <svg
              class="mx-auto h-10 w-10 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 class="mt-2 text-base font-semibold text-red-700">오류 발생</h3>
            <p class="mt-1 text-base text-red-600">{{ issueStore.error }}</p>
            <button
              @click="issueStore.fetchIssues(selectedDate)"
              class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-base"
            >
              다시 시도
            </button>
          </div>
        </div>

        <!-- 이슈 목록 -->
        <div v-else-if="issues.length" class="overflow-y-auto" style="flex: 1 1 auto">
          <div
            v-for="issue in issues"
            :key="issue.id"
            @click="selectIssue(issue)"
            class="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
            :class="{ 'bg-blue-100 border-blue-200': selectedIssueId === issue.id }"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <div class="flex items-center mb-1">
                  <span
                    v-if="issue.leader"
                    class="mr-2 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-medium"
                  >
                    {{ issue.leader }}
                  </span>
                  <span
                    v-if="issue.division"
                    class="mr-2 px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-medium"
                  >
                    {{ issue.division }}
                  </span>
                </div>
                <h4
                  class="text-lg font-semibold truncate"
                  :class="selectedIssueId === issue.id ? 'text-blue-700' : 'text-gray-900'"
                >
                  {{ issue.title }}
                </h4>
                <div class="mt-1 text-sm text-gray-500 h-14">
                  <p class="break-words line-clamp-3 whitespace-pre-wrap">
                    {{ cleanReportContent(issue.report_content) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 데이터가 없을 때 -->
        <div v-else class="flex-1 flex items-center justify-center">
          <div class="text-center p-4">
            <svg
              class="mx-auto h-14 w-14 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <h3 class="mt-2 text-base font-semibold text-gray-900">팀 이슈를 찾을 수 없습니다</h3>
            <p class="mt-1 text-base text-gray-500">
              <span class="font-medium text-blue-600">{{ selectedDate }}</span
              >에 기록된 팀 이슈가 없습니다.
            </p>
          </div>
        </div>
      </div>

      <!-- 우측 패널: 선택된 이슈의 리포트 -->
      <div class="flex-1 flex flex-col">
        <div v-if="selectedIssueId && selectedIssueData" class="h-full">
          <Report :issue-id="selectedIssueId" :title="selectedIssueData.title" />
        </div>
        <div v-else class="flex-1 flex items-center justify-center bg-gray-50">
          <div class="text-center">
            <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 class="mt-2 text-lg font-medium text-gray-900">이슈를 선택하세요</h3>
            <p class="mt-1 text-base text-gray-500">좌측에서 이슈를 클릭하면 상세 정보가 여기에 표시됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import Report from "./Report.vue";
import { useIssueStore, type Issue } from "../../stores/issueStore";
import { useReportStore } from "../../stores/reportStore";
import type { Division } from "../../stores/userStore";

const props = defineProps<{
  selectedDate: string;
  division?: Division | null;
}>();

const issueStore = useIssueStore();
const reportStore = useReportStore();
const selectedIssueId = ref<number | null>(null);

const issues = computed(() => {
  // division이 지정된 경우 해당 부서의 이슈만 반환
  if (props.division) {
    return issueStore.issuesByDivision(props.division);
  }
  return issueStore.issues;
});

// 선택된 이슈 데이터
const selectedIssueData = computed(() => {
  if (!selectedIssueId.value) return null;
  return issues.value.find((issue) => issue.id === selectedIssueId.value);
});

watch(
  [() => props.selectedDate, () => props.division],
  ([date, division]) => {
    selectedIssueId.value = null; // 새로운 데이터 로드 시 선택 초기화
    if (date) {
      issueStore.fetchIssues(date);
    }
  },
  { immediate: true }
);

// reportStore에서 선택된 이슈 ID가 있으면 자동으로 선택
watch(
  [() => reportStore.selectedIssueId, () => issueStore.issues],
  ([reportSelectedId, issues]) => {
    if (reportSelectedId && issues.length > 0) {
      // 둘 다 준비되었을 때만
      const foundIssue = issues.find((issue) => issue.id === reportSelectedId);
      if (foundIssue) {
        selectedIssueId.value = reportSelectedId;
        issueStore.selectIssue(foundIssue);
        reportStore.clearSelectedIssueId(); // 성공했을 때만 초기화
      }
    }
  },
  { immediate: true }
);

function selectIssue(issue: Issue) {
  if (selectedIssueId.value === issue.id) {
    selectedIssueId.value = null;
    issueStore.selectIssue(null);
  } else {
    selectedIssueId.value = issue.id;
    issueStore.selectIssue(issue);
  }
}

function cleanReportContent(content: string | null | undefined): string {
  if (!content) {
    return "";
  }
  return content.replace(/\[message_id:\s*\d+(?:\s*,\s*\d+)*\]/g, "").trim();
}
</script>
