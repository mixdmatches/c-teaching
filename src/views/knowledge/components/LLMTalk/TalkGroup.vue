<script setup>
import { ref } from 'vue'
import html2canvas from 'html2canvas'
// 引入hooks
import { useCopy } from '@/hooks/useCopy'
const { handleCopy } = useCopy()

const props = defineProps({
  talkGroupArr: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['send-question'])

const editingIndex = ref(-1) // 当前正在编辑的消息索引

const handleEdit = index => {
  editingIndex.value = index
}

const refreshTalk = index => {
  editingIndex.value = -1
  if (!props.talkGroupArr[index].question) {
    return
  }
  const newQuestion = props.talkGroupArr[index].question
  props.talkGroupArr.splice(index, 1) // 删除指定索引的元素
  emit('send-question', newQuestion)
}

const shareAsImage = async () => {
  const element = document.getElementById('conversation-container')
  const canvas = await html2canvas(element)
  const image = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = image
  link.download = 'conversation.png'
  link.click()
}
</script>

<template>
  <!-- <div id="conversation-container">
    <div v-for="(item, index) in talkGroupArr" :key="index">
      <div class="user-message">
        {{ item.question }}
      </div>
      <div class="ai-message">
        {{ item.answer }}
      </div>
    </div>
  </div> -->
  <div v-for="(item, index) in talkGroupArr" :key="item" class="talk-group">
    <div class="right-box">
      <div v-if="editingIndex !== index">
        <div class="message-right">
          {{ item.question }}
        </div>
        <span class="works">
          <el-icon class="icon" size="16" @click="handleCopy(item.question)"
            ><CopyDocument
          /></el-icon>
          <el-icon class="icon" size="16" @click="handleEdit(index)"
            ><Edit
          /></el-icon>
        </span>
      </div>
      <div v-else>
        <el-input
          v-model="item.question"
          size="large"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          @keyup.enter="refreshTalk(index)"
        ></el-input>
        <span class="works">
          <el-button size="small" @click="editingIndex = -1">取消</el-button>
          <el-button size="small" type="primary" @click="refreshTalk(index)"
            >确定</el-button
          >
        </span>
      </div>
    </div>
    <div class="left-box">
      <div
        v-parsemd="item.answer"
        class="message-left font-10 markdown-container"
      ></div>
      <span class="works">
        <el-icon class="icon" size="16" @click="handleCopy(item.answer)"
          ><CopyDocument
        /></el-icon>
        <el-icon class="icon" size="16" @click="refreshTalk(index)"
          ><RefreshRight
        /></el-icon>
        <el-icon class="icon" size="16" @click="shareAsImage"
          ><Share
        /></el-icon>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-message {
  color: blue;
}

.ai-message {
  color: green;
}
@mixin talk-body {
  flex: 1;
  padding: $padding-xl;
  display: flex;
  flex-direction: column;
  gap: 50px;
  overflow-y: auto;
}
.talk {
  @include talk-body();
  // 滚动条颜色改变
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb($primary-color, 0.1);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgb(240, 244, 251);
  }
  .talk-group {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    .right-box {
      flex: 1;
      align-self: flex-end;
      .message-right {
        color: #fff;
        font-size: $font-size-m;
        line-height: 1.7;
        background-color: $primary-color;
        padding: $padding-l;
        border-radius: $border-radius-l;
        border-top-right-radius: 0;
      }
    }
    .left-box {
      display: flex;
      flex-direction: column;
      .message-left {
        flex: 1;
        max-width: 100%;
        background-color: #fff;
        padding: $padding-l $padding-m;
        border-radius: $border-radius-l;
        border-top-left-radius: 0;
        color: $text-color;
        font-size: $font-size-m;
        line-height: 1.7;
      }
    }
    .works {
      display: flex;
      align-items: center;
      gap: $margin-m;
      margin-top: $margin-s;
      padding: $padding-s;
      .icon {
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover {
          color: $primary-color;
        }
      }
    }
  }
}
</style>
