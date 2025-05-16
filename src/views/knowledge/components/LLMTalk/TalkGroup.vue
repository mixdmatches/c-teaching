<script setup>
import { ref } from 'vue'
// 引入hooks
import { useCopy } from '@/hooks/useCopy'
const { handleCopy } = useCopy()

const props = defineProps({
  talkGroupArr: {
    type: Array,
    required: true,
  },
  dialogVisible: {
    type: Boolean,
  },
})

const emit = defineEmits([
  'update:talk-group-arr',
  'send-question',
  'update:dialog-visible',
])

const editingIndex = ref(-1) // 当前正在编辑的消息索引

const originQuestion = ref('')
const inputQuestion = ref('')

const handleEdit = index => {
  editingIndex.value = index
  originQuestion.value = props.talkGroupArr[index].question
  inputQuestion.value = props.talkGroupArr[index].question
}

const handleCancel = () => {
  editingIndex.value = -1
  inputQuestion.value = originQuestion.value
}

const refreshTalk = index => {
  editingIndex.value = -1
  if (!props.talkGroupArr[index].question) {
    return
  }

  let newTalkGroupArr = [...props.talkGroupArr]
  newTalkGroupArr.splice(index, 1)
  emit('update:talk-group-arr', newTalkGroupArr)
  localStorage.setItem('talkGroupArr', JSON.stringify(newTalkGroupArr))
  const newQuestion = inputQuestion.value
  emit('send-question', newQuestion)
}

const handleShare = index => {
  emit('update:dialog-visible', index)
}

const handleDelete = index => {
  let newTalkGroupArr = [...props.talkGroupArr]
  newTalkGroupArr.splice(index, 1)
  emit('update:talk-group-arr', newTalkGroupArr)
  localStorage.setItem('talkGroupArr', JSON.stringify(newTalkGroupArr))
}
</script>

<template>
  <el-backtop :right="50" :bottom="100" />
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
          <el-icon class="icon" size="16" @click="handleDelete(index)">
            <Delete />
          </el-icon>
        </span>
      </div>
      <div v-else>
        <el-input
          v-model="inputQuestion"
          size="large"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          @keyup.enter="refreshTalk(index)"
        ></el-input>
        <span class="works">
          <el-button size="small" @click="handleCancel">取消</el-button>
          <el-button size="small" type="primary" @click="refreshTalk(index)"
            >确定</el-button
          >
        </span>
      </div>
    </div>
    <div class="left-box">
      <div
        v-parsemd="item.answer"
        class="message-left markdown-container"
      ></div>
      <span class="works">
        <el-icon class="icon" size="16" @click="handleCopy(item.answer)"
          ><CopyDocument
        /></el-icon>
        <el-icon class="icon" size="16" @click="refreshTalk(index)"
          ><RefreshRight
        /></el-icon>
        <el-icon class="icon" size="16" @click="handleShare(index)"
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
</style>
