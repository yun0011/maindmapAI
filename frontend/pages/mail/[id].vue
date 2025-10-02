<template>
    <div class="flex w-full">
      <!-- 사이드바 -->
      <div class="w-64 border-r min-h-screen p-4">
        <MailSidebar />
      </div>
      <!-- 메인 컨텐츠 영역 -->
      <div class="flex-1 min-h-screen">
        <!-- 상단 메일 메뉴 영역 -->
        <div class="flex flex-col p-3 border-b">
          <div class="flex items-center gap-2">
            <Button variant="roundedWhite" class="p-2 border-none">
              <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 12h16m-16 6h16" stroke-width="2" stroke-linecap="round" />
              </svg>
            </Button>
            <span class="text-xl font-medium">받은 메일함</span>
            <Button variant="roundedWhite" class="p-2 mx-3">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </Button>
          </div>
          <div class="flex gap-2 mt-3">
            <Button variant="roundedWhite" class="px-4 py-1.5">삭제</Button>
            <Button variant="roundedWhite" class="px-4 py-1.5">답장</Button>
            <Button variant="roundedWhite" class="px-4 py-1.5">전체답장</Button>
            <Button variant="roundedWhite" class="px-4 py-1.5">전달</Button>
            <Button variant="roundedWhite" class="px-4 py-1.5">스팸</Button>
            <Button variant="roundedWhite" class="px-4 py-1.5">이동 ▼</Button>
            <Button variant="roundedWhite" class="px-4 py-1.5">추가기능 ▼</Button>
          </div>
        </div>
  
        <!-- 메일 제목 -->
        <div class="p-2 border-b" v-if="mail">
          <div class="flex items-center gap-2 m-2">
            <span class="text-xl font-bold">{{ mail.subject }}</span>
          </div>
        </div>
  
        <!-- 메일 상세 내용 -->
        <div class="p-6" v-if="mail">
          <!-- 메일 헤더 정보 -->
          <div class="border-b pb-4">
            <div class="flex items-center gap-2 mb-4">
              <span class="font-bold min-w-[80px]">보낸사람</span>
              <span>{{ mail.sender }}</span>
              <button class="text-blue-600 text-sm ml-2">주소추가</button>
              <span class="text-red-500 text-sm ml-2">수신차단</span>
            </div>
            <div class="flex items-center gap-2 mb-4">
              <span class="font-bold min-w-[80px]">받는사람</span>
              <span>{{ mail.receiver }}</span>
              <button class="text-blue-600 text-sm ml-2">주소추가</button>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-600">{{ formatMailDateTime(mail.created) }}</span>
            </div>
          </div>
  
          <!-- 메일 본문 -->
          <div class="p-10">
            <div class="space-y-2">
              <p class="whitespace-pre-line">{{ mail.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import MailSidebar from "@/components/mail/sidebar.vue";
import Button from "@/components/ui/button/Button.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useMailStore, formatMailDateTime } from "@/stores/mailStore";

const route = useRoute();
const mailStore = useMailStore();

const mail = computed(() => {
  const mailId = parseInt(route.params.id);
  return mailStore.getMailById(mailId);
});
</script>