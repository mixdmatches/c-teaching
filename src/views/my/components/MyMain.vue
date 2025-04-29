<template>
  <main>
    <!-- 用户信息卡片 -->
    <el-card shadow="never" class="info-card">
      <div class="filed" v-for="filed in userInfoFiled" :key="filed.value">
        <div class="label">{{ filed.label }}</div>
        <input
          v-if="isEditing"
          v-model="tempUserInfo[filed.value]"
          :disabled="!isEditing"
          class="input-field"
        />
        <span v-else class="display-field">{{ userInfo[filed.value] }}</span>
      </div>
      <!-- 按钮区域 -->
      <div class="buttonDiv">
        <el-button
          v-if="!isEditing"
          type="primary"
          @click="startEditing"
          class="edit-button"
        >
          修改个人信息
        </el-button>
        <template v-else>
          <el-button type="success" @click="confirmEdit">确定</el-button>
          <el-button type="danger" @click="cancelEdit">取消</el-button>
        </template>
      </div>
    </el-card>
    <!-- 错题本 -->
    <!-- <ErrorQustion /> -->
  </main>
</template>

<script setup>
import ErrorQustion from './ErrorQustion.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElButton } from 'element-plus'

import { getUserInfo, updateUserInfo } from '@/api/user.js'
import { useUserStore } from '@/stores/index.js'

// 初始化用户信息
const userStore = useUserStore()
const userInfo = ref({})
const handleGetUserInfo = async () => {
  userInfo.value = await getUserInfo()
}
const userInfoFiled = [
  {
    value: 'className',
    label: '班级',
  },
  {
    value: 'stuNum',
    label: '学号',
  },
  {
    value: 'phone',
    label: '电话',
  },
  {
    value: 'email',
    label: '邮箱',
  },
]
onMounted(async () => {
  await handleGetUserInfo()
})
// 编辑状态
const isEditing = ref(false)

// 临时存储用户信息
const tempUserInfo = reactive({})

// 开始编辑
const startEditing = () => {
  Object.assign(tempUserInfo, userInfo.value) //userInfo->tempUserInfo
  isEditing.value = true
}

// 确认修改
const confirmEdit = async () => {
  tempUserInfo.id = userStore.getUserId()
  await updateUserInfo(tempUserInfo)
  await handleGetUserInfo()
  isEditing.value = false
}

// 取消修改
const cancelEdit = () => {
  for (let key in tempUserInfo) {
    delete tempUserInfo[key]
  }
  isEditing.value = false
}
</script>

<style lang="scss" scoped>
@use 'sass:math';

main {
  width: 100%;
  // max-width: $main-width;
  // margin: $padding-xl auto;
  padding: $padding-l;
  // margin-top: calc($margin-xxl + $header-height);
}

.info-card {
  background-color: $base-bg-color;
  border: 1px solid $base-border-color;
  border-radius: $border-radius-m;
  // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 添加阴影效果
  padding: $padding-xl;
  display: flex;
  flex-direction: column;
  gap: $padding-xl;

  .filed {
    display: flex;
    align-items: center;
    gap: $padding-xl;

    .label {
      font-size: $font-size-xl;
      color: $primary-text-color;
      font-weight: bold;
      width: 120px;
    }

    .input-field,
    .display-field {
      font-size: $font-size-l;
      color: $text-color;
      min-width: 300px;
      padding: $padding-m $padding-xl;
      border-radius: $border-radius-s;
    }

    .input-field {
      // background-color: lighten($main-bg-color, 5%);
      border: 1px solid $base-border-color;
      outline: none;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: $primary-color;
      }
    }

    .display-field {
      background-color: transparent;
      border: none;
    }
  }

  .buttonDiv {
    display: flex;
    justify-content: flex-end;
    gap: $padding-m;

    .edit-button {
      width: 200px;
    }

    .el-button {
      font-size: $font-size-xl;
      padding: $padding-m $padding-xl;
      border-radius: $border-radius-s;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

// 移动端样式调整
@media screen and (max-width: 768px) {
  main {
    padding: $padding-s;
  }

  .info-card {
    padding: $padding-l;
  }

  .info-card .filed {
    margin-top: $margin-m; // 调整字段之间的间距
    flex-direction: column;
    align-items: flex-start;
    gap: $padding-m;
  }

  .info-card .filed .label {
    width: auto;
    font-size: $font-size-l;
  }

  .info-card .filed .input-field,
  .info-card .filed .display-field {
    min-width: auto;
    width: 100%;
    font-size: $font-size-m;
    padding: $padding-s $padding-m;
  }

  .info-card .buttonDiv {
    justify-content: center;
  }

  .info-card .buttonDiv .edit-button {
    width: 100%;
  }

  .info-card .buttonDiv .el-button {
    font-size: $font-size-m;
    padding: $padding-s $padding-m;
  }
  .buttonDiv {
    margin-top: $margin-xl;
  }
}
</style>
