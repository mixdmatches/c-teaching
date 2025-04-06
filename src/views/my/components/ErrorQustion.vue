<template>
  <!-- 错题本 -->
  <el-card shadow="never" style="margin-top: 20px">
    <template #header>
      <div class="header">
        <span>错题本</span>
        <span>共10题</span>
      </div>
    </template>
    <el-select style="width: 200px" v-model="selectOption">
      <option
        :label="item.text"
        :value="item.id"
        v-for="item in chapter"
        :key="item"
      ></option>
    </el-select>
    <!-- 错题列表 -->
    <div class="errorQuestions">
      <!-- 单题 -->
      <div class="questionItem border" v-for="item in 4" :key="item">
        <div class="info">
          <div class="type">单选题</div>
          <div class="starBox">
            <div class="label">难度：</div>
            <Stars :num="3" />
          </div>
          <div class="starBox">
            <div class="label">重点：</div>
            <Stars :num="3" />
          </div>
          <div class="tagBox">
            <Tag text="指针" />
          </div>
          <el-button>做同类型题</el-button>
        </div>
        <div class="title">1. c语言是什么</div>
        <el-radio-group v-model="model" class="radioGroup">
          <el-radio
            v-for="(item, index) in options"
            :key="index"
            :label="item.id + '、' + item.text"
            :value="item.id"
          />
        </el-radio-group>
        <div class="result">
          <span class="true-ans">正确答案:A</span>
          <span class="jiexi"
            >解析：
            <p>
              c语言是一种通用的、过程式的计算机程序设计语言。
              1972年，为了移植与开发UNIX操作系统，丹尼斯·里奇在贝尔电话实验室设计开发了C语言。
              C语言是一种广泛使用的计算机编程语言，它提供了高级程序设计语言的一些特性，
              允许开发者以更接近硬件的方式编写程序。
            </p>
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import Stars from '@/components/Stars.vue'
import Tag from '@/components/Tag.vue'
import { ref } from 'vue'
const selectOption = ref('全部')
const options = [
  { id: 'A', text: '高级语言' },
  { id: 'B', text: '低级语言' },
  { id: 'C', text: '机器语言' },
  { id: 'D', text: '汇编语言' },
]
const chapter = [
  { id: '1', text: '第一章' },
  { id: '2', text: '第二章' },
  { id: '3', text: '第三章' },
  { id: '4', text: '第四章' },
  { id: '5', text: '第五章' },
  { id: '6', text: '第六章' },
  { id: '7', text: '第七章' },
  { id: '8', text: '第八章' },
  { id: '9', text: '第九章' },
  { id: '10', text: '第十章' },
]
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid $light-border-color;
  border-radius: 4px;
}
.header {
  display: flex;
  gap: $margin-s;
  span {
    font-size: 1.6rem;
    font-weight: 500;
    color: $primary-color;
  }
}
.errorQuestions {
  margin-top: $margin-xl;
}
.questionItem {
  // width: 1200px;
  // height: 400px;
  margin-top: $margin-s;
  background-color: $base-bg-color;
  border-radius: $border-radius-m;
  padding: $padding-xl;
  .info {
    display: flex;
    align-items: center;
    gap: $padding-xxl;
    .type {
      background-color: $primary-color;
      color: white;
      font-size: $font-size-l;
      padding: $padding-s;
      border-radius: 9999px;
    }
    .starBox {
      display: flex;
      align-items: center;
      .label {
        color: $primary-color;
        font-size: $font-size-l;
      }
    }
    .tagBox {
      display: flex;
      align-items: center;
      gap: $padding-s;
    }
  }
  .title {
    margin: $padding-xl 0;
    color: $primary-color;
    font-size: $font-size-xxl;
  }
  .radioGroup {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-left: 20px;
  }
}
.submit {
  position: absolute;
  top: 270px;
  left: 40px;
}
.result {
  margin-top: $margin-l;
  font-size: $font-size-xl;
  display: flex;
  flex-direction: column;
  gap: $padding-s;
  .true-ans {
    color: $success-color;
    font-weight: 500;
  }
  .jiexi {
    line-height: 1.5;
    margin-top: $margin-l;
    font-weight: 500;
    color: $primary-color;
    p {
      font-size: $font-size-l;
      font-weight: 400;
      color: $info-color;
    }
  }
}
</style>
