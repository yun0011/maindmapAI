<template>
    <div>
      <!-- 메일쓰기 버튼 영역 -->
      <div class="flex gap-2 mb-6">
        <Button variant="squareBlue" size="lg" class="px-7 py-3">메일쓰기</Button>
        <Button variant="squareWhite" size="lg" class="px-7 py-3">내게쓰기</Button>
      </div>
  
      <!-- 메일 상태 아이콘 -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center justify-between w-full">
          <div class="flex flex-col items-center">
            <div class="text-teal-500 text-lg">{{ mailStore.allMails.length }}</div>
            <div class="text-sm text-gray-400">안읽음</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-yellow-400 text-lg">★</div>
            <div class="text-sm text-gray-400">중요</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-pink-500 text-lg">🔒</div>
            <div class="text-sm text-gray-400">보호</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-purple-400 text-lg">📁</div>
            <div class="text-sm text-gray-400">임시</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-lg">📎</div>
            <div class="text-sm text-gray-400">첨부</div>
          </div>
        </div>
      </div>
  
      <!-- 메일함 목록 -->
      <div class="space-y-1">
        <div class="flex items-center justify-between p-2 text-[#4B57D9] font-medium">
          <span>▼ 받은 메일함</span>
          <span class="text-sm">{{ mailStore.allMails.length }}</span>
        </div>
        <div class="flex items-center justify-between p-2 text-gray-500">
          <span class="pl-5">- 내게쓴 메일함</span>
          <span class="text-sm">0</span>
        </div>
        <div class="flex items-center justify-between p-2 text-gray-500">
          <span>보낸 편지함</span>
          <div class="text-xs bg-gray-100 px-2 py-1 rounded-full">수신확인</div>
        </div>
        <div class="flex items-center justify-between p-2 text-gray-500">
          <span>임시 보관함</span>
        </div>
        <div class="flex items-center justify-between p-2 text-gray-500">
          <span>정크 메일</span>
          <span class="text-sm">113</span>
        </div>
        <div class="flex items-center justify-between p-2 text-gray-500">
          <span>지운 편지함</span>
          <span class="text-gray-400">🗑</span>
        </div>
      </div>
  
      <!-- 개인 메일함 -->
      <div class="mt-6">
        <div class="flex items-center gap-2 p-2 text-[#4B57D9] font-medium">
          <span>▲</span>
          <span>개인 메일함</span>
          <div class="ml-auto flex gap-2">
            <span class="text-gray-400 cursor-pointer mr-1">+</span>
            <span class="text-gray-400 cursor-pointer">⚙️</span>
          </div>
        </div>
      </div>
  
      <!-- 외부 메일 설정 -->
      <div class="mt-6">
        <div class="p-2 text-gray-500">외부 메일 수신 설정</div>
      </div>
    </div>
</template>
  
<script setup>
import Button from "@/components/ui/button/Button.vue";
import { useMailStore } from "@/stores/mailStore";

const mailStore = useMailStore();
</script>