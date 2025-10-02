<template>
    <div class="flex w-full h-[88vh]">
      <!-- 사이드바 -->
      <div class="w-64 border-r p-4">
        <MailSidebar />
      </div>
  
      <!-- 메인 컨텐츠 영역 -->
      <div class="flex-1">
        <!-- 상단 검색 영역 -->
        <div class="flex items-center gap-4 p-3">
          <div class="flex items-center gap-2">
            <Button variant="roundedWhite" class="p-2 border-none">
              <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 12h16m-16 6h16" stroke-width="2" stroke-linecap="round" />
              </svg>
            </Button>
            <span class="text-xl font-medium">받은 메일함</span>
            <Button variant="roundedWhite" class="p-2 mx-3">
              <img :src="RefreshIcon" class="w-5 h-5" />
            </Button>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative">
              <div
                class="border px-3 py-2 h-[38px] text-sm min-w-[100px] bg-white flex items-center justify-between cursor-pointer"
              >
                <span>제목</span>
                <span class="ml-2">▼</span>
              </div>
            </div>
  
            <input type="text" class="border px-3 py-2 h-[38px] w-64 focus:outline-none focus:border-gray-900" />
            <Button variant="roundedBlack" class="w-20">검색</Button>
          </div>
        </div>
  
        <!-- 메일 필터 탭 -->
        <div class="p-2">
          <div class="flex items-center gap-2 mb-2">
            <Button variant="roundedWhite" class="px-4 py-1.5">삭제</Button>
            <Button variant="roundedWhite" class="px-4 py-1.5">답장</Button>
            <Button variant="roundedWhite" class="px-4 py-1.5">전체답장</Button>
            <Button variant="roundedWhite" class="px-4 py-1.5">전달</Button>
            <Button variant="roundedWhite" class="px-4 py-1.5">스팸</Button>
            <Button variant="roundedWhite" class="px-4 py-1.5">이동 ▼</Button>
            <Button variant="roundedWhite" class="px-4 py-1.5">추가기능 ▼</Button>
          </div>
        </div>
  
        <!-- 메일 목록 -->
        <div class="border-t">
          <!-- 메일 헤더 -->
          <div class="flex items-center px-4 py-3 bg-gray-50 text-sm font-medium border-b border-gray-500">
            <div class="w-6">
              <input type="checkbox" class="rounded" />
            </div>
            <div class="w-6 text-yellow-400">★</div>
            <div class="flex-1">보낸 사람 ▼</div>
            <div class="flex-[2]">제목 ▼</div>
            <div class="w-32 text-right">받은 날짜 ▼</div>
          </div>
  
          <!-- 메일 항목 -->
          <div
            v-for="mail in mails"
            :key="mail.id"
            class="flex items-center px-4 py-3 hover:bg-gray-50 border-b text-sm cursor-pointer"
            @click="navigateToDetail(mail.id)"
          >
            <div class="w-6" @click.stop>
              <input type="checkbox" class="rounded" />
            </div>
            <div class="w-6 text-gray-400">☆</div>
            <div class="flex-1">{{ mail.sender }}</div>
            <div class="flex-[2] truncate">{{ mail.subject }}</div>
            <div class="w-32 text-right text-gray-500">{{ formatMailDateTime(mail.created) }}</div>
          </div>
        </div>
  
        <!-- 페이지네이션 -->
        <div class="flex justify-center gap-1 mt-4">
          <Button variant="squareBlue" size="icon">1</Button>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import RefreshIcon from "@/assets/icons/refresh.png";
import MailSidebar from "@/components/mail/sidebar.vue";
import Button from "@/components/ui/button/Button.vue";
import { useMailStore, formatMailDateTime } from "@/stores/mailStore";
import { useRouter } from "vue-router";

const mailStore = useMailStore();
const mails = computed(() => mailStore.allMails);
const router = useRouter();

function navigateToDetail(mailId) {
  router.push(`/mail/${mailId}`);
}
</script>
  