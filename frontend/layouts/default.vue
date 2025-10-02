<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- 헤더 -->
    <header class="bg-indigo-50 shadow-sm">
      <div class="max-w-8xl mx-auto px-20">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center ml-2">
            <NuxtLink to="/" class="text-xl font-bold text-gray-800 hover:text-gray-900">MAILNARA</NuxtLink>
          </div>
          <div class="flex-1 flex justify-center">
            <nav class="flex space-x-8">
              <NuxtLink 
                to="/" 
                class="px-3 py-2 text-md font-medium transition-colors"
                :class="isActiveRoute('/') ? 'text-blue-700 font-bold' : 'text-gray-600 hover:text-blue-700 hover:font-semibold'"
              >
                홈
              </NuxtLink>
              <span class="text-gray-600 px-3 py-2 text-md font-medium">인트라넷</span>
              <NuxtLink 
                to="/mail" 
                class="px-3 py-2 text-md font-medium transition-colors"
                :class="isActiveRoute('/mail') ? 'text-blue-700 font-bold' : 'text-gray-600 hover:text-blue-700 hover:font-semibold'"
              >
                메일
              </NuxtLink>
              <span class="text-gray-600 px-3 py-2 text-md font-medium">캘린더</span>
              <span class="text-gray-600 px-3 py-2 text-md font-medium">주소록</span>
              <span class="text-gray-600 px-3 py-2 text-md font-medium">게시판</span>
              <span class="text-gray-600 px-3 py-2 text-md font-medium">환경설정</span>
              <span class="text-gray-600 px-3 py-2 text-md font-medium">대량메일</span>
              <span class="text-gray-600 px-3 py-2 text-md font-medium">세금계산서</span>
              <NuxtLink 
                :to="briefPilotLink" 
                class="px-3 py-2 text-md font-medium transition-colors"
                :class="isActiveRoute('/brief-pilot') ? 'text-blue-700 font-bold' : 'text-gray-600 hover:text-blue-700 hover:font-semibold'"
              >
                Brief-Pilot
              </NuxtLink>
            </nav>
          </div>
          <div class="hidden sm:flex items-center gap-3">
            <div class="relative">
              <button 
                @click="toggleDropdown"
                class="flex items-center gap-3 p-2 focus:outline-none"
              >
                <div class="w-8 h-8 rounded-full bg-gray-200 border border-gray-300"></div>
                <div class="flex flex-col leading-tight">
                  <span class="text-sm font-medium text-gray-800">{{ currentRoleDisplayName }}</span>
                  <span class="text-xs text-gray-500">{{ userStore.currentUser?.email || 'kim@sds.co.kr' }}</span>
                </div>
                <span class="text-gray-500">▾</span>
              </button>
              
              <!-- 사용자 드롭다운 메뉴 -->
              <div 
                v-if="isDropdownOpen" 
                class="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                @click="closeDropdown"
              >
                <div class="py-1">
                  <button
                    v-for="role in userStore.availableRoles" 
                    :key="role" 
                    @click="selectRole(role)"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                    :class="{ 'bg-blue-50 text-blue-700': selectedRole === role }"
                  >
                    {{ roleDisplayNames[role] }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 페이지 콘텐츠 -->
    <main class="flex-1 w-full relative">
      <NuxtPage />
    </main>

    <!-- 푸터 -->
    <footer class="bg-white border-t">
      <div class="max-w-7xl mx-auto py-4 px-4 text-center text-sm text-gray-600">
        ⓒ 2025 MAILNARA. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore, type UserRole, roleDisplayNames } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

// 선택된 역할
const selectedRole = ref<UserRole>("ceo");

// Brief-Pilot 링크 (현재 선택된 역할에 따라 동적으로 변경)
const briefPilotLink = computed(() => {
  return `/brief-pilot/${selectedRole.value}`;
});

// 드롭다운 상태
const isDropdownOpen = ref(false);

// 현재 역할의 표시 이름
const currentRoleDisplayName = computed(() => {
  return roleDisplayNames[selectedRole.value] || selectedRole.value;
});

// 드롭다운 토글
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

// 드롭다운 닫기
function closeDropdown() {
  isDropdownOpen.value = false;
}

// 역할 선택 핸들러
function selectRole(role: UserRole) {
  selectedRole.value = role;
  isDropdownOpen.value = false;
  userStore.setUserRole(role);
  
  // 현재 Brief-Pilot 페이지에 있다면 새로운 역할 페이지로 리다이렉트
  if (router.currentRoute.value.path.startsWith('/brief-pilot/')) {
    router.push(briefPilotLink.value);
  }
}

// 현재 라우트가 특정 경로와 일치하는지 확인
function isActiveRoute(path: string) {
  const currentPath = router.currentRoute.value.path;
  if (path === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(path);
}

// 컴포넌트 마운트 시 초기화
onMounted(() => {
  // 저장된 사용자 정보 로드
  userStore.loadUserFromStorage();
  
  // 현재 사용자 역할을 선택된 역할로 설정
  if (userStore.currentUser?.role) {
    selectedRole.value = userStore.currentUser.role;
  }
  
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
    isDropdownOpen.value = false;
  }
}
</script>
