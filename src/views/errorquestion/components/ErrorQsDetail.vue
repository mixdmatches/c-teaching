<template>
  <!-- 修改对话框宽度为响应式 -->
  <el-dialog
    v-model="visible"
    title="题目详情"
    :width="isMobile ? '90%' : '800px'"
  >
    <div class="questionItem border">
      <div class="title">{{ currentRow.title }}</div>
      <ul v-for="op in currentRow.option" :key="op.key" class="options">
        <li
          class="option"
          :class="{
            errorOption: op.key == currentRow.studentAnswer,
            trueOption: op.key == currentRow.answer,
          }"
        >
          {{ op.key }}、{{ op.value }}
        </li>
      </ul>
      <div class="result">
        <span class="true-ans">正确答案: {{ currentRow.answer }}</span>
        <span class="err-ans"
          >你的答案:
          {{
            currentRow.studentAnswer ? currentRow.studentAnswer : '未作答'
          }}</span
        >
        <span class="jiexi"
          >解析：
          <p>
            {{ currentRow.analysis }}
          </p>
        </span>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, toRef, ref, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  visible: Boolean,
  currentRow: Object,
})
const currentRow = toRef(props, 'currentRow')
const emits = defineEmits(['update:visible'])
const visible = computed({
  get: () => props.visible,
  set: value => emits('update:visible', value),
})

// 判断是否为移动端
const isMobile = ref(window.innerWidth < 768)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid $light-border-color;
  border-radius: 4px;
}
.errorQuestions {
  margin-top: $margin-xl;
}
.questionItem {
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
    margin-bottom: $padding-l;
    color: $primary-color;
    font-size: $font-size-xxl;
  }
  .options {
    display: flex;
    flex-direction: column;
    .option {
      padding: $padding-m;
      border: 1px solid $light-border-color;
      border-radius: $border-radius-m;
      margin-bottom: $margin-s;
    }
  }
  .trueOption {
    background-color: $success-color;
    color: white;
  }
  .errorOption {
    background-color: $danger-color;
    color: white;
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
    margin-bottom: $margin-s;
  }
  .err-ans {
    color: $danger-color;
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

// 移动端样式适配
@media screen and (max-width: 768px) {
  .questionItem {
    padding: $padding-m;
  }

  .questionItem .title {
    font-size: $font-size-xl;
  }

  .questionItem .options .option {
    font-size: $font-size-m;
  }

  .result {
    font-size: $font-size-m;
  }

  .result p {
    font-size: $font-size-s;
  }
}
</style>
