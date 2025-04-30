<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  apiGetNotes,
  apiAddNotes,
  apiDeleteNote,
  apiPutNote,
  apiGetSerchNotes,
} from '@/api/notes.js'
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import hljs from 'highlight.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
// 使用主题
VMdEditor.use(vuepressTheme, {
  Hljs: hljs,
})
const targetElement = ref('')

onMounted(() => {
  targetElement.value = '.target'
})

// 编辑器实例
const editorRef = ref()

// 编辑数据，用于去传参/添加/修改笔记
const postData = ref({
  id: 0,
  content: '',
  date: '',
  isStar: false,
  isDelete: false,
})

// 编辑状态
const isEditor = ref(false)

// 总条数
const countAll = ref(0)
const countStar = ref(0)
const countDelete = ref(0)

// 分类列表
const category = computed(() => [
  {
    index: '1',
    title: '全部笔记',
    icon: 'Document',
    total: countAll.value,
  },
  {
    index: '2',
    title: '星标',
    icon: 'Star',
    total: countStar.value,
  },
  {
    index: '3',
    title: '最近删除',
    icon: 'Delete',
    total: countDelete.value,
  },
])

// 当前分类index
const currentCategoryIndex = ref(category.value[0].index || '0')

// 笔记列表
const notes = ref([])

// 搜索模糊词
const inputSerch = ref('')

// 搜索笔记函数
async function getSearchNotes() {
  if (inputSerch.value === '') {
    return switchCategory(currentCategoryIndex.value)
  }
  const { data } = await apiGetSerchNotes(inputSerch.value)
  notes.value = data
}

// 获取笔记列表
async function getNotes(params = {}) {
  const {
    data: {
      notes: filterNotes,
      countAll: cAll,
      countStar: cStar,
      countDelete: cDet,
    },
  } = await apiGetNotes(params)
  notes.value = filterNotes
  countAll.value = cAll
  countStar.value = cStar
  countDelete.value = cDet
  // postData.value = { ...notes.value[0] }
}

// 映射
const categoryMap = {
  1: () => getNotes(),
  2: () => getNotes({ isStar: true }),
  3: () => getNotes({ isDelete: true }),
}

// 删除笔记
async function deleteNote(item) {
  Object.assign(postData.value, item)
  postData.value.isDelete = true
  await apiPutNote(postData.value)
  await switchCategory(currentCategoryIndex.value)
  postData.value = { ...notes.value[0] }
  ElMessage.success('删除成功')
}

// 切换分类
async function switchCategory(index) {
  currentCategoryIndex.value = index
  const handler = categoryMap[index]
  if (handler) {
    await handler()
  }
}

// 取消编辑按钮回调
function handleCancel() {
  isEditor.value = false
  // postData.value = { ...notes.value[0] }
}

// 下拉框的编辑按钮
const handleEdit = note => {
  isEditor.value = true
  postData.value = { ...note }
}

// 笔记编辑确定按钮回调
async function editNote(_item) {
  isEditor.value = false
  if (postData.value.id === 0) {
    await apiAddNotes(postData.value)
    await switchCategory(currentCategoryIndex.value)
    // postData.value = { ...notes.value[0] }
  } else {
    await apiPutNote(postData.value)
    await switchCategory(currentCategoryIndex.value)
  }
}

// 收藏/取消收藏笔记
async function starNote(item) {
  Object.assign(postData.value, item)
  postData.value.isStar = !item.isStar
  await apiPutNote(postData.value)
  await switchCategory(currentCategoryIndex.value)
}

// 格式化日期
function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 添加笔记按钮回调
async function handleAddNote() {
  Object.assign(postData.value, {
    id: 0,
    content: '',
    date: formatDate(new Date()),
    isStar: false,
    isDelete: false,
  })
  isEditor.value = true
}

// 下载笔记按钮函数
function downloadMarkdown(note) {
  const markdownContent = note.content
  const blob = new Blob([markdownContent], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  // 从content中提取标题作为文件名
  const titleMatch = markdownContent.match(/# (.+)/)
  const fileName = titleMatch ? titleMatch[1] : '未命名笔记'
  a.download = `${fileName}.md`
  a.click()
  URL.revokeObjectURL(url)
}

// 分享笔记
function shareNote(_note) {
  ElMessage.info('分享功能还未实现')
}

// 全部清除按钮/彻底删除按钮函数
async function permanentlyDeleteNote(id) {
  ElMessageBox.confirm('笔记将被彻底删除，此操作不能撤销', '确定删除笔记?', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const ids = notes.value.map(item => item.id)
      if (id) {
        await apiDeleteNote([id])
      } else {
        await apiDeleteNote(ids)
      }
      await switchCategory(currentCategoryIndex.value)
      postData.value = { ...notes.value[0] }
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}

// 还原笔记函数
async function restoreNote() {
  postData.value.isDelete = false
  await apiPutNote(postData.value)
  await switchCategory(currentCategoryIndex.value)
}

onMounted(() => {
  getNotes()
})
</script>

<template>
  <HeaderCm />
  <div class="noteContent">
    <div class="left">
      <el-button type="primary" icon="plus" @click="handleAddNote"
        >写笔记</el-button
      >
      <el-menu :default-active="'1'" class="el-menu-vertical-demo">
        <el-menu-item
          v-for="item in category"
          :key="item.index"
          :index="item.index"
          style="display: flex; justify-content: space-between"
          @click="switchCategory(item.index)"
        >
          <div class="title">
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.title }}</span>
          </div>
          <i>{{ item.total }}</i>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="center">
      <!-- 搜索笔记 -->
      <el-input
        v-model="inputSerch"
        placeholder="搜索笔记"
        prefix-icon="search"
        @input="getSearchNotes"
      />
      <!-- 仅在最近删除时展示的信息提醒和一键清除按钮 -->
      <div v-if="currentCategoryIndex === '3'" class="deleteInfo">
        <el-button
          type="danger"
          :icon="'delete'"
          size="small"
          plain
          :disabled="notes.length === 0"
          @click="permanentlyDeleteNote(null)"
          >全部清除</el-button
        >
        <p>被删除的笔记保留30天后将清除</p>
      </div>
      <!-- 笔记列表区域 -->
      <div v-if="notes.length" class="notes">
        <div
          v-for="item in notes"
          :key="item"
          class="note-item"
          :class="{ active: postData.id === item.id }"
          @click="Object.assign(postData, item)"
        >
          <span class="time">
            <el-icon><Clock /></el-icon>
            <span>{{ item.date }}</span>
          </span>
          <div class="content">
            <p>
              {{ item.content }}
            </p>
          </div>
          <div class="footer">
            <el-dropdown
              placement="bottom-end"
              :append-to="targetElement"
              trigger="click"
            >
              <el-icon><More /></el-icon>
              <template #dropdown>
                <!-- 不是最近删除显示 -->
                <el-dropdown-menu v-if="currentCategoryIndex !== '3'">
                  <el-dropdown-item @click="handleEdit(item)">
                    <el-icon><EditPen /></el-icon>编辑
                  </el-dropdown-item>
                  <el-dropdown-item @click="deleteNote(item)">
                    <el-icon><Delete /></el-icon>删除
                  </el-dropdown-item>
                  <el-dropdown-item @click="starNote(item)">
                    <el-icon>
                      <component :is="item.isStar ? 'star-filled' : 'star'"
                    /></el-icon>
                    收藏
                  </el-dropdown-item>
                  <el-dropdown-item @click="downloadMarkdown(item)">
                    <el-icon><Download /></el-icon>下载
                  </el-dropdown-item>
                  <el-dropdown-item @click="shareNote(item)">
                    <el-icon><Share /></el-icon>分享
                  </el-dropdown-item>
                </el-dropdown-menu>
                <!-- 是最近删除显示 -->
                <el-dropdown-menu v-else>
                  <el-dropdown-item @click="restoreNote(item)">
                    <el-icon><Back /></el-icon>还原
                  </el-dropdown-item>
                  <el-dropdown-item @click="permanentlyDeleteNote(item.id)">
                    <el-icon><Delete /></el-icon>彻底删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
      <!-- 无笔记列表时展示 -->
      <div v-else class="notes">
        <img
          src="https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/inspiration.29187097.svg"
          alt=""
        />
      </div>
    </div>
    <div class="right">
      <!-- 操作，删除列表不展示 -->
      <div v-if="currentCategoryIndex !== '3'" class="work">
        <span v-if="!isEditor" class="work-inline">
          <el-button
            type="primary"
            plain
            :disabled="!postData.id"
            @click="isEditor = true"
            ><el-icon><EditPen /></el-icon>编辑</el-button
          >
        </span>
        <span v-else class="work-inline">
          <!-- <p>
            保存于2024-03-23 12:22<el-icon><Loading /></el-icon>
          </p> -->
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="editNote">确定</el-button>
        </span>
      </div>
      <v-md-editor
        ref="editorRef"
        v-model="postData.content"
        :mode="isEditor ? 'editable' : 'preview'"
        height="100%"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 覆盖 el-menu 的默认边框颜色 */
.el-menu {
  border-right: 1px solid white;
}
.noteContent {
  width: 100%;
  height: calc(100vh - $header-height);
  display: flex;
  gap: $margin-s;
  padding: $padding-m;
  .left {
    width: 200px;
    padding: $padding-m;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: $margin-l;
  }
  .center {
    width: 300px;
    padding: $padding-m;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: $margin-l;
    .deleteInfo {
      display: flex;
      align-items: center;
      padding: $padding-s;
      gap: $margin-s;
      p {
        font-size: 12px;
        color: $info-color;
      }
    }
    .notes {
      display: flex;
      flex-direction: column;
      gap: $margin-m;
      padding-right: $padding-m;
      overflow-y: auto;
      .note-item {
        border: 1px solid $light-border-color;
        border-radius: 4px;
        padding: $padding-m;
        display: flex;
        flex-direction: column;
        gap: $margin-s;
        cursor: pointer;

        transition: all 0.3s ease; // 过渡效果，平滑过渡;
        &.active {
          border-color: $primary-color;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        &:hover {
          // 悬浮
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        .time {
          display: flex;
          align-items: center;
          gap: $margin-s;
          span {
            font-size: 12px;
            color: #999;
          }
        }
        .content {
          height: 30px; // 固定高度，防止内容溢出导致布局崩;
          display: flex;
          flex-direction: column;
          gap: $margin-s;
          line-height: 3; // 行高;
          // 超过两行省略
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1; // 控制显示的行数
          line-clamp: 1; // 定义标准属性，提高兼容性，控制显示的行数
          -webkit-box-orient: vertical;
          p {
            font-size: 14px;
            color: $text-color;
          }
        }
        .footer {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
  .right {
    flex: 1;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: $margin-l;
    padding: $padding-m;
    .work {
      display: flex;
      justify-content: end;
      align-items: center;
      gap: $margin-s;
      padding: 0 $padding-m;
      .work-inline {
        width: 100%;
        display: flex;
        align-items: center;
        p {
          flex: 1;
          font-size: $font-size-l;
          color: $info-color;
          margin-right: $margin-l;
        }
      }
    }
    .v-md-editor {
      box-shadow: none;
    }
  }
}

// 移动端样式适配
@media screen and (max-width: 768px) {
  .noteContent {
    flex-direction: column;
    height: auto;
  }

  .noteContent .left,
  .noteContent .center,
  .noteContent .right {
    width: 100%;
    box-sizing: border-box;
  }

  .noteContent .left {
    width: 100%;
  }

  .noteContent .center .notes .note-item .content {
    height: auto;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .noteContent .right .v-md-editor {
    height: 400px;
  }
}
</style>
