<template>
  <div class="header">
    <div class="logo">C语言教学平台</div>
    <nav>
      <ul>
        <li @click="()=>router.push('/')">首页</li>
        <li @click="()=>router.push('/question')">课程</li>
        <li @click="()=>router.push('/my')">个人中心</li>
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
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'DingTalk'; // 自定义字体名称
  src: url('@/assets/fonts/DingTalk-JinBuTi.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.header {
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
      font-size: 1.25 * $font-size-xl;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
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
    font-size: 1.25 * $font-size-xl;
  }
  img {
    width: 2.5 * $font-size-xl;
    height: 2.5 * $font-size-xl;
    border-radius: 50%;
  }
}
</style>
