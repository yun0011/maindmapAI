<template>
  <div class="flex flex-col h-full bg-white">
    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="flex-1 flex items-center justify-center">
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
        <p class="mt-2 text-base text-gray-500">리포트 로딩 중...</p>
      </div>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <svg
          class="mx-auto h-10 w-10 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-2 text-base font-medium text-red-700">리포트 로딩 실패</h3>
        <p class="mt-1 text-sm text-red-600">{{ error }}</p>
        <button
          @click="reportStore.fetchReport(issueId)"
          class="mt-3 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          다시 시도
        </button>
      </div>
    </div>

    <!-- 성공 상태 -->
    <div v-else-if="reportData" class="h-full flex flex-col">
      <div class="flex-1 overflow-hidden p-6">
        <div v-if="reportData.content" class="flex-grow overflow-y-auto space-y-6">
          <!-- 업무 내용 -->
          <div>
            <div class="flex items-center mb-3">
              <h4 class="text-lg font-semibold text-gray-700 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1.5 h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                업무 내용
              </h4>
            </div>
            <div class="text-base leading-relaxed text-gray-700 bg-gray-50 p-4 rounded-lg border">
              <p class="whitespace-normal break-words" v-html="sanitizeHtml(formatContentForModal(reportData.content))"></p>
            </div>
          </div>

          <!-- 업무 주도자 -->
          <div>
            <div class="flex items-center mb-3">
              <h4 class="text-lg font-semibold text-gray-700 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1.5 h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                업무 주도자
              </h4>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg border flex items-center">
              <span
                class="inline-flex items-center px-3 py-1 rounded-md text-base font-medium bg-yellow-100 text-yellow-800 border border-yellow-400"
              >
                {{ reportData.leader }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- 리포트가 아직 생성되지 않은 경우 -->
        <div v-else class="flex-1 flex items-center justify-center min-h-[450px]">
          <div class="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 class="mt-2 text-lg font-medium text-gray-900">리포트가 아직 생성되지 않았습니다.</h3>
            <p class="mt-1 text-base text-gray-500">잠시 후 다시 확인해 주세요.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, computed } from "vue";
import { useReportStore } from "../../stores/reportStore";
import DOMPurify from "dompurify";

const props = defineProps<{
  issueId: number;
}>();

const reportStore = useReportStore();
const reportData = computed(() => reportStore.reportData as any);
const isLoading = computed(() => reportStore.isLoading);
const error = computed(() => reportStore.error);

watch(
  () => props.issueId,
  (newId) => {
    reportStore.fetchReport(newId);
  },
  { immediate: true }
);

// 모달용 콘텐츠 포맷팅 (레퍼런스 링크 제거)
function formatContentForModal(text: string): string {
  if (!text) return "";

  // [message_id: 123] 패턴 제거하고 띄어쓰기로 대체
  let processedText = text.replace(/\s*\[(?:message_id):[^\]]+\]\s*/g, " ");
  
  // 연속된 공백을 하나로 정리
  processedText = processedText.replace(/\s+/g, " ");
  
  // 양쪽 끝 공백 제거
  return processedText.trim();
}

function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html);
}
</script>

<style scoped>
/* 필요한 경우 추가 스타일 */
</style>
