<template>
  <div class="header">
    <div class="logo">C语言教学平台</div>
    <nav>
      <ul>
        <li
          :class="{ active: r.path === $route.path }"
          v-for="(r, i) in routers"
          :key="i"
        >
          <router-link :to="r.path">{{ r.name }}</router-link>
        </li>
      </ul>
    </nav>
    <div class="user">
      <span>姓名</span>
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>
  </div>
</template>

<script setup>
const routers = [
  {
    path: '/',
    name: '首页',
  },
  {
    path: '/cources',
    name: '课程',
  },
  {
    path: '/my',
    name: '个人中心',
  },
]
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'DingTalk'; // 自定义字体名称
  src: url('@/assets/fonts/DingTalk-JinBuTi.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.header {
  // // 固定在页面顶部
  // position: fixed;
  // top: 0;
  // left: 0;
  // z-index: 999;
  width: 100%;
  height: $header-height;
  background-color: $base-bg-color;
  border-radius: $border-radius-s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 $padding-xl;
  gap: 3 * $margin-xxl;
}
.logo {
  color: $primary-color;
  font-size: 4rem;
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
      font-size: $font-size-xl;
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
