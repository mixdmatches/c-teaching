<template>
  <main>
    <!-- 用户信息卡片 -->
    <el-card class="info-card">
      <div class="filed" v-for="(value, key) in userInfo" :key="key">
        <div class="label">{{ formatLabel(key) }}</div>
        <input
          v-if="isEditing"
          v-model="tempUserInfo[key]"
          :disabled="!isEditing"
          class="input-field"
        />
        <span v-else class="display-field">{{ value }}</span>
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
  </main>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { ElButton } from 'element-plus';

// 初始化用户信息
const userInfo = reactive({
  clazz: '班级1',
  number: '20230001',
  mobile: '12345678901',
  email: 'example@example.com',
});

// 编辑状态
const isEditing = ref(false);

// 临时存储用户信息
const tempUserInfo = reactive({ ...userInfo });

// 格式化字段名称
const formatLabel = (key) => {
  switch (key) {
    case 'clazz':
      return '班级';
    case 'number':
      return '学号';
    case 'mobile':
      return '电话';
    case 'email':
      return '邮箱';
    default:
      return key;
  }
};

// 开始编辑
const startEditing = () => {
  // 将当前用户信息复制到临时对象
  Object.assign(tempUserInfo, userInfo);
  isEditing.value = true;
};

// 确认修改
const confirmEdit = () => {
  // 将临时数据同步到 userInfo
  Object.assign(userInfo, tempUserInfo);
  isEditing.value = false;
  console.log('用户信息已更新:', userInfo);
};

// 取消修改
const cancelEdit = () => {
  // 恢复原始数据
  Object.assign(tempUserInfo, userInfo);
  isEditing.value = false;
};
</script>
<style lang="scss" scoped>
// 引入全局变量
@import '@/styles/variables.scss'; 

main {
  width: 100%;
  max-width: $main-width; 
  margin: $padding-xl auto; 
  padding: $padding-l; 
}

.info-card {
  background-color: $base-bg-color; 
  border: 1px solid $base-border-color; 
  border-radius: $border-radius-m; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 添加阴影效果
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
      background-color: lighten($main-bg-color, 5%); 
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
</style>