<script setup>
import { ref, computed } from 'vue'
import html2canvas from 'html2canvas'
import { ElMessage } from 'element-plus'

const props = defineProps({
  talkGroupArr: {
    type: Array,
    required: true,
  },
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  shareIndex: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits(['update:dialogVisible'])

const visible = computed({
  get: () => props.dialogVisible,
  set: value => emits('update:dialogVisible', value),
})

const imgRef = ref(null)
const checkAll = ref(false)
const checkedMessages = ref([])
const visibleImg = ref(false)

const handleCheckAllChange = val => {
  checkedMessages.value = val ? props.talkGroupArr : []
}

const handleCheckedMessagesChange = value => {
  checkedMessages.value = value
  const checkedCount = value.length
  checkAll.value = checkedCount === props.talkGroupArr.length
}

const shareAsImage = async () => {
  const element = imgRef.value
  const canvas = await html2canvas(element)
  const image = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')
  link.href = image
  const imageName = checkedMessages.value[0]?.question.slice(0, 10) || 'default'
  link.download = `${imageName}.jpeg`
  link.click()
}

const handleShare = () => {
  if (checkedMessages.value.length === 0) {
    ElMessage.warning('请选择要分享的消息')
    return
  }
  visibleImg.value = true
}
</script>

<template>
  <el-dialog
    v-model="visibleImg"
    align-center
    title="预览图片"
    destroy-on-close
  >
    <div class="scroll">
      <div ref="imgRef" class="img">
        <div class="title">c语言AI教学平台</div>
        <div v-for="item in checkedMessages" :key="item" class="talk-group">
          <div class="user-messsage">
            {{ item.question }}
          </div>
          <div
            v-parsemd="item.answer"
            class="ai-message markdown-container"
          ></div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="shareAsImage">下载图片</el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="visible"
    destroy-on-close
    title="选择对话"
    width="600"
    align-center
  >
    <div class="scroll">
      <div class="select-message">
        <el-checkbox
          v-model="checkAll"
          label="全选"
          @change="handleCheckAllChange"
        />
        <el-checkbox-group
          v-model="checkedMessages"
          @change="handleCheckedMessagesChange"
        >
          <div
            v-for="(item, index) in talkGroupArr"
            :key="item"
            class="talk-group"
            :class="{ active: checkedMessages.includes(item) }"
          >
            <el-checkbox
              :checked="shareIndex == index"
              :value="item"
            ></el-checkbox>
            <div class="user-messsage">
              {{ item.question }}
            </div>
            <div
              v-parsemd="item.answer"
              class="ai-message markdown-container"
            ></div>
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleShare">生成图片</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.img {
  background-color: $light-blue;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  padding: 10px;
  .title {
    font-size: 30px;
    font-weight: bold;
    color: white;
    text-align: center;
  }
}
.scroll {
  max-height: 600px;
  overflow-y: auto;
}
.select-message {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.talk-group {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  padding: 2px;
  margin-bottom: $margin-m;
  &:hover {
    cursor: pointer;
  }
  &.active {
    background-color: #f0f0f0;
    border-radius: 10px;
  }
  .user-messsage {
    align-self: flex-end;
    color: #fff;
    font-size: $font-size-m;
    line-height: 1.7;
    background-color: $primary-color;
    padding: $padding-l;
    border-radius: $border-radius-l;
    border-top-right-radius: 0;
  }
  .ai-message {
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
</style>
