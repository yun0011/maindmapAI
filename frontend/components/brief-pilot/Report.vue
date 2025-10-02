<template>
  <div class="flex flex-col h-full flex-1 bg-white">
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
      <!-- 내용 -->
      <div class="flex-1 overflow-hidden p-6 flex gap-6 min-h-0">
        <!-- 리포트 기본 정보 뷰 -->
        <div v-if="!showMessages" class="flex-1 flex flex-col min-h-0">
          <div v-if="reportData.content" class="flex-grow overflow-y-auto space-y-6 pr-2 min-h-0">
            <!-- 업무 타이틀 -->
            <div class="text-2xl font-semibold text-gray-900 pb-2 mb-4 border-b">
              {{ title }}
            </div>
            <!-- 업무 내용 -->
            <div>
              <div class="flex items-center mb-3 justify-between">
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
                <button
                  @click="toggleView"
                  class="ml-3 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                  {{ showMessages ? "기본 정보" : "원본 데이터" }}
                </button>
              </div>
              <div
                class="text-base leading-relaxed text-gray-700 bg-gray-50 p-4 rounded-lg border"
                @click="handleContentClick"
              >
                <p class="whitespace-normal break-words" v-html="sanitizeHtml(formatContent(reportData.content))"></p>
              </div>
            </div>

            <!-- 참여자 정보 -->
            <div>
              <h4 class="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1.5 h-4 w-4 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                참여자
              </h4>
              <div class="bg-gray-50 px-4 py-3 rounded-lg border space-y-4">
                <template v-for="[type, items] in orderedParticipantGroups" :key="type">
                  <div v-if="items.length > 0" class="flex items-start">
                    <h5 class="w-24 flex-shrink-0 text-base font-medium text-gray-600 pt-1">
                      {{ participantSectionLabels[type] }}
                    </h5>
                    <div class="flex-grow flex flex-wrap gap-2 items-center">
                      <span
                        v-for="item in items"
                        :key="item.value"
                        class="inline-flex items-center px-3 py-1 rounded-full text-base font-medium bg-gray-100 text-gray-800"
                      >
                        {{ item.value }}
                      </span>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- 업무 분류 -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h4 class="text-lg font-semibold text-gray-700 mb-3 flex items-center">
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
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  업무 성격
                </h4>
                <div class="bg-gray-50 p-4 rounded-lg border flex items-center">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-md text-base font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10"
                  >
                    {{ reportData.category }}
                  </span>
                </div>
              </div>

              <div>
                <h4 class="text-lg font-semibold text-gray-700 mb-3 flex items-center">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  업무 주도자
                </h4>
                <div class="bg-gray-50 p-4 rounded-lg border flex items-center">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-md text-base font-medium bg-yellow-100 text-yellow-800 border border-yellow-400"
                  >
                    {{ reportData.leader }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- 리포트가 아직 생성되지 않은 경우 -->
          <div v-else class="flex-1 flex items-center justify-center">
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
              <button
                @click="reportStore.fetchReport(issueId)"
                class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                새로고침
              </button>
            </div>
          </div>
        </div>

        <!-- 메시지 리스트 뷰  -->
        <div v-else class="flex-1 space-y-4 overflow-y-auto">
          <div class="flex justify-end mb-2">
            <button
              @click="toggleView"
              class="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              {{ showMessages ? "기본 정보" : "원본 데이터" }}
            </button>
          </div>

          <!-- 메시지 목록 -->
          <div v-if="referenceMessages.length === 0" class="text-center py-8">
            <p class="text-base text-gray-500">이 채널에 데이터가 없습니다.</p>
          </div>
          <div v-else class="space-y-6">
            <div
              v-for="referenceMessage in referenceMessages"
              :key="referenceMessage.messageId"
              class="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-x-2">
                  <span class="font-semibold text-gray-500 text-sm"
                    >[{{ messageIdToIndexMap.get(referenceMessage.messageId) }}]</span
                  >
                </div>
                <span class="text-sm text-gray-500">{{ referenceMessage.timestamp }}</span>
              </div>
              <div class="mb-3">
                <p
                  class="text-base text-gray-700 cursor-pointer hover:text-blue-600"
                  @click="openContentModal(referenceMessage.content)"
                  v-html="sanitizeHtml(getPreviewText(referenceMessage.content, 100))"
                ></p>
              </div>
              <div class="border-t border-gray-100 pt-3 space-y-2">
                <div class="flex items-center">
                  <span class="text-sm text-gray-500 font-medium w-14 flex-shrink-0">보낸이</span>
                  <span
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                  >
                    {{ referenceMessage.sender }}
                  </span>
                </div>
                <div class="flex items-start">
                  <span class="text-sm text-gray-500 font-medium w-14 flex-shrink-0 pt-0.5">받는이</span>
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="receiverName in referenceMessage.receivers"
                      :key="receiverName"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      {{ receiverName }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 원문 메시지 상세 모달 -->
    <div
      v-if="showContentModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click="closeContentModal"
    >
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-xl" @click.stop>
        <div class="flex justify-between items-center border-b border-gray-200 px-4 py-3">
          <h3 class="text-lg font-medium text-gray-800">메세지 원문</h3>
          <button @click="closeContentModal" class="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
          <p
            class="text-base text-gray-700 whitespace-pre-wrap"
            v-html="sanitizeHtml(formatContent(modalContent, false))"
          ></p>
        </div>
      </div>
    </div>

    <!-- 원문 데이터 팝오버 -->
    <div
      v-if="showMessagePopover"
      :style="{
        position: 'fixed',
        left: `${popoverPosition.x}px`,
        top: `${popoverPosition.y}px`,
      }"
      class="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-2xl max-h-96 overflow-y-auto z-50"
      @click.stop
    >
      <p class="text-sm text-gray-600 whitespace-pre-wrap break-words" style="word-break: break-word; overflow-wrap: anywhere;" v-html="sanitizeHtml(popoverContent)"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useReportStore } from "../../stores/reportStore";
import DOMPurify from "dompurify";

const props = defineProps<{
  issueId: number;
  title: string;
}>();

const reportStore = useReportStore();
const reportData = computed(() => reportStore.reportData as any);
const referenceMessages = computed(() => reportStore.referenceMessages as any[]);
const isLoading = computed(() => reportStore.isLoading);
const error = computed(() => reportStore.error);
const showMessages = ref(false);

watch(
  () => props.issueId,
  (newId) => {
    reportStore.fetchReport(newId);
  },
  { immediate: true }
);
function toggleView() {
  showMessages.value = !showMessages.value;
}

// <---- 레퍼런스 링크 관련 ------>
const messageIdToIndexMap = computed(() => {
  const map = new Map<number, number>();
  referenceMessages.value.forEach((msg, index) => {
    map.set(msg.messageId, index + 1);
  });
  return map;
});

// "[message_id: 123]" 또는 "[message_id: 123, 456]" 형태의 레퍼런스를 클릭 가능한 링크로 변환
function linkifyMsgReferences(text: string): string {
  // "[msg: ...]" 또는 "[message_id: ...]" 블록을 찾아 치환한다.
  return text.replace(/\[(?:message_id):[^\]]+\]/g, (fullMatch: string) => {
    // 블록 안에서 나타나는 모든 숫자 추출
    const ids = (fullMatch.match(/\d+/g) || []).map((id) => parseInt(id, 10)).filter((id) => !isNaN(id));

    // 각 ID에 대해 링크(span) 생성 후 공백으로 이어붙임
    return ids
      .map((id) => {
        const displayIndex = messageIdToIndexMap.value.get(id);
        return `<span class="message-link cursor-pointer text-blue-600 hover:text-blue-800 hover:underline" data-message-id="${id}">[${
          displayIndex ?? id
        }]</span><br/>`;
      })
      .join("");
  });
}

// <---- 레포트 레퍼런스 팝오버 ------>
const showMessagePopover = ref(false);
const popoverContent = ref("");
const popoverPosition = ref({ x: 0, y: 0 });

function showPopoverWithContent(event: MouseEvent, htmlContent: string) {
  event.preventDefault();
  event.stopPropagation();

  const rect = (event.target as HTMLElement).getBoundingClientRect();
  popoverPosition.value = {
    x: rect.right + 10,
    y: rect.top,
  };
  popoverContent.value = htmlContent;
  showMessagePopover.value = true;

  document.addEventListener("click", closeMessagePopover);
}

function closeMessagePopover() {
  showMessagePopover.value = false;
  popoverContent.value = "";
  document.removeEventListener("click", closeMessagePopover);
}

function handleContentClick(event: MouseEvent) {
  const targetEl = event.target as HTMLElement;
  const messageLinkElement = targetEl.closest(".message-link") as HTMLElement | null;

  if (messageLinkElement && messageLinkElement.dataset.messageId) {
    const msgId = messageLinkElement.dataset.messageId;
    const msg = referenceMessages.value.find((m) => String(m.messageId) === msgId);
    if (msg) {
      showPopoverWithContent(event, msg.content);
    }
  }
}

// <------- 데이터 포맷팅 관련 -------->
function getPreviewText(html: string, length = 100): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  // 100자 이상이면 ... 붙이기, 아니면 그대로
  return text.length > length ? text.substring(0, length) + "..." : text;
}

function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html);
}

function formatContent(text: string, createLinks: boolean = true): string {
  if (!text) return "";

  const textWithActualNewlines = text.replace(/\\n/g, "\n");
  let processedText = textWithActualNewlines;

  if (createLinks) {
    processedText = linkifyMsgReferences(processedText);
  }

  if (textWithActualNewlines.includes("\n")) {
    return processedText.replace(/\n/g, "<br>");
  }
  return processedText;
}

// <------- 참가자 관리 -------->
const participantSectionLabels: Record<string, string> = {
  name: "이름",
  email: "이메일",
};

const groupedParticipants = computed(() => {
  const groups: Record<string, { value: string }[]> = {
    name: [],
    email: [],
  };

  if (!reportStore.participants || reportStore.participants.length === 0 || !reportData.value?.leader) return groups;

  // 참가자들을 그룹화(이름, 이메일)
  for (const p of reportStore.participants) {
    const value = p.name || "";
    if (!value) continue;
    if (!groups.name.some((item) => item.value === value)) {
      groups.name.push({ value });
    }
    if (!groups.email.some((item) => item.value === p.email)) {
      groups.email.push({ value: p.email });
    }
  }

  return groups;
});

const orderedParticipantGroups = computed(() => {
  const order = ["name", "email"];
  const groups = groupedParticipants.value;

  return Object.entries(groups).sort(([typeA], [typeB]) => {
    return order.indexOf(typeA) - order.indexOf(typeB);
  });
});

// <---- 원문보기 모달창 관련 ------>
const showContentModal = ref(false);
const modalContent = ref("");

function openContentModal(content: string) {
  modalContent.value = content;
  showContentModal.value = true;
  document.body.style.overflow = "hidden";
}

function closeContentModal() {
  showContentModal.value = false;
  modalContent.value = "";
  document.body.style.overflow = "";
}
</script>

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.content-container {
  position: relative;
}

.content-container::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 1.5em;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  pointer-events: none;
}

.popover-enter-active,
.popover-leave-active {
  transition: opacity 0.2s ease;
}

.popover-enter-from,
.popover-leave-to {
  opacity: 0;
}
</style>
