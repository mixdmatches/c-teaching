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
import { ElMessage } from 'element-plus'
// 使用主题
VMdEditor.use(vuepressTheme, {
  Hljs: hljs,
})

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

// 当前选中的笔记
const currentNoteId = ref(0)

// 搜索模糊词
const inputSerch = ref('')

// 搜索笔记函数
async function getSearchNotes() {
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
async function deleteNote(id) {
  await apiDeleteNote(id)
  ElMessage.success('删除成功')
  await switchCategory(currentCategoryIndex.value)
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
  isEditor.value = !isEditor.value
  // postData.value = { ...notes.value[0] }
}

// 下拉框的编辑按钮
const handleEdit = note => {
  isEditor.value = true
  postData.value = { ...note }
}

// 更新保存笔记
async function editNote(item) {
  isEditor.value = !isEditor.value
  await apiPutNote(postData.value)
  await switchCategory(currentCategoryIndex.value)
}

// 收藏/取消收藏笔记 !!!有bug
async function starNote(item) {
  Object.assign(postData.value, item)
  postData.value.isStar = !item.star
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
      <el-button type="primary" icon="plus">新建笔记</el-button>
      <el-menu :default-active="'1'" class="el-menu-vertical-demo">
        <el-menu-item
          v-for="item in category"
          :key="item.index"
          :index="item.index"
          @click="switchCategory(item.index)"
          style="display: flex; justify-content: space-between"
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
      <el-input
        v-model="inputSerch"
        @input="getSearchNotes"
        placeholder="搜索笔记"
        prefix-icon="search"
      />
      <div class="notes">
        <div
          class="note-item"
          v-for="item in notes"
          :key="item"
          @click="Object.assign(postData, item)"
          :class="{ active: postData.id === item.id }"
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
            <el-dropdown placement="bottom-end">
              <el-icon><More /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleEdit(item)"
                    ><el-icon><EditPen /></el-icon>编辑</el-dropdown-item
                  >
                  <el-dropdown-item @click="deleteNote(item.id)"
                    ><el-icon><Delete /></el-icon>删除</el-dropdown-item
                  >
                  <el-dropdown-item @click="starNote(item)"
                    ><el-icon
                      ><component
                        :is="item.isStar ? 'star-filled' : 'star'"
                      ></component></el-icon
                    >收藏</el-dropdown-item
                  >
                  <el-dropdown-item
                    ><el-icon><Download /></el-icon>下载</el-dropdown-item
                  >
                  <el-dropdown-item
                    ><el-icon><Share /></el-icon>分享</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="work">
        <span class="work-inline" v-if="!isEditor">
          <el-button
            type="primary"
            plain
            @click="isEditor = true"
            :disabled="!postData.id"
            ><el-icon><EditPen /></el-icon>编辑</el-button
          >
        </span>
        <span class="work-inline" v-else>
          <!-- <p>
            保存于2024-03-23 12:22<el-icon><Loading /></el-icon>
          </p> -->
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="editNote">确定</el-button>
        </span>
      </div>
      <v-md-editor
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
</style>
