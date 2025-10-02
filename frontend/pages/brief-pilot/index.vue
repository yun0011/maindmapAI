<template>
  <div class="bg-gray-50 text-gray-900 flex items-center justify-center" style="height: 100dvh">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">사용자 정보를 확인하는 중...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  // 저장된 사용자 정보 로드
  userStore.loadUserFromStorage();
  
  // 현재 사용자 역할에 따라 리다이렉트
  const currentRole = userStore.currentUser?.role || "ceo";
  
  // 적절한 역할 페이지로 리다이렉트
  router.replace(`/brief-pilot/${currentRole}`);
});
</script> 