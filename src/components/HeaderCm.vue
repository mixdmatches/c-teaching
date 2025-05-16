<template>
  <div class="header">
    <div class="logo">C语言AI教学平台</div>
    <nav>
      <ul>
        <li
          v-for="r in headRoutes"
          :key="r.path"
          :class="{ active: r.path === $route.path }"
          @click="handleToPath(r.path)"
        >
          <!-- <el-icon v-if="r.meta.icon">
            <component :is="r.meta.icon" />
          </el-icon> -->
          <!-- <router-link></router-link> -->
          {{ r.meta.title }}
        </li>
      </ul>
    </nav>
    <div class="user">
      <span>{{ userInfo?.name }}</span>
      <el-dropdown>
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="r in dropdownRoutes" :key="r.path">
              <el-icon v-if="r.meta.icon">
                <component :is="r.meta.icon" />
              </el-icon>
              <router-link :to="r.path">{{ r.meta.title }}</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click="handleOut"
              ><el-icon><SwitchButton /></el-icon> 退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { getUserInfo, apiPostOutLogin } from '@/api/user.js'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const dropdownRoutes = computed(() => {
  return router.getRoutes().filter(r => r.meta && r.meta.show === 'dropdown')
})
const headRoutes = computed(() => {
  return router.getRoutes().filter(r => r.meta && r.meta.show === 'header')
})

const userInfo = ref()
const handleGetUserInfo = async () => {
  userInfo.value = await getUserInfo('210047301')
}

const handleToPath = path => {
  router.push(path)
}

// 退出登录
const handleOut = async () => {
  await apiPostOutLogin()
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  router.push('/login')
}
onMounted(async () => {
  await handleGetUserInfo()
})
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .logo {
    display: none;
  }
}

@font-face {
  font-family: 'DingTalk'; // 自定义字体名称
  src: url('@/assets/fonts/DingTalk-JinBuTi.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100%;
  height: $header-height;
  background-color: $base-bg-color;
  border-radius: $border-radius-s;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 $padding-xl;
  gap: 3 * $margin-xxl;
}
.logo {
  color: $primary-color;
  font-size: 4em;
  font-family: 'DingTalk';
}
nav {
  flex: 1;
  ul {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 2 * $margin-xl;
    li {
      font-size: $font-size-l;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $margin-s;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        color: $primary-color;
      }
      &.active {
        color: $primary-color;
      }
    }
  }
}
.user {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $margin-xl;
  span {
    font-size: $font-size-xl;
  }
  img {
    width: 2.5 * $font-size-xl;
    height: 2.5 * $font-size-xl;
    border-radius: 50%;
  }
}
</style>
