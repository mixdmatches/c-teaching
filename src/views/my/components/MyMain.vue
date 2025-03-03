<template>
  <main>
    <div class="filed">
      <div class="label">班级</div>
      <input v-model="userInfo.clazz">
    </div>
    <div class="filed">
      <div class="label">学号</div>
      <input v-model="userInfo.number">
    </div>
    <div class="filed">
      <div class="label">电话</div>
      <input v-model="userInfo.mobile">
    </div>
    <div class="filed">
      <div class="label">邮箱</div>
      <input v-model="userInfo.email">
    </div>

    <div class="buttonDiv">
      <button>修改个人信息</button>
    </div>
  </main>
</template>

<script setup>
import {reactive} from "vue";

const userInfo = reactive({
  clazz: '',
  number: '',
  mobile: '',
  email: ''
})
</script>

<style lang="scss" scoped>
main {
  width: 1200px;
  // 高度根据子盒子自适应
  height: auto;
  margin: 0 auto;
  background-color: $base-bg-color;
  padding: 150px 30px 30px;
  display: flex;
  flex-direction: column;
  gap: 2 * $padding-xl;
  .filed{
    display: flex;
    gap: $padding-xl;
    align-items: center;
    .label{
      font-size: $font-size-xxxl;
    }
    input{
      border: none;
      background-color: $main-bg-color;
      font-size: $font-size-xxl;
      padding: $padding-l;
      min-width: 300px;
    }
  }
  .buttonDiv{
    text-align: right;
    button{
      border: none;
      background-color: $primary-color;
      color: white;
      font-size: $font-size-xxxl;
      border-radius: 5px;
      padding: $padding-s;
      cursor: pointer;
    }
  }
}
</style>
