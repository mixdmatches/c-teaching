<script setup>
import { ref } from 'vue'
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import hljs from 'highlight.js'
const content = ref('# 这是一个标题\n\n这是一个段落。')
// 使用主题
VMdEditor.use(vuepressTheme, {
  Hljs: hljs,
})

const currentNote = ref(1) // 当前选中的笔记
const notes = ref([
  {
    id: 1,
    content: '# 这是一个标题\n\n这是一个段落。',
    createTime: '2024-05-15 14:30',
    isStar: false,
  },
  {
    id: 2,
    content: '# 这是一个标题\n\n这是一个段落。',
    createTime: '2024-05-15 14:30',
    isStar: false,
  },
  {
    id: 3,
    content: '# 这是一个标题\n\n这是一个段落。',
    createTime: '2024-05-15 14:30',
    isStar: true,
  },
]) // 笔记列表
</script>
<template>
  <HeaderCm />
  <div class="noteContent">
    <div class="left">
      <el-button type="primary" icon="plus">新建笔记</el-button>
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item
          index="1"
          style="display: flex; justify-content: space-between"
        >
          <div class="title">
            <el-icon><Document /></el-icon>
            <span>文档</span>
          </div>
          <i>12</i>
        </el-menu-item>
        <el-menu-item
          index="2"
          style="display: flex; justify-content: space-between"
        >
          <div class="title">
            <el-icon><Star /></el-icon>
            <span>星标</span>
          </div>
          <i>12</i>
        </el-menu-item>
        <el-menu-item
          index="3"
          style="display: flex; justify-content: space-between"
        >
          <div class="title">
            <el-icon><Delete /></el-icon>
            <span>最近删除</span>
          </div>
          <i>12</i>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="center">
      <el-input placeholder="搜索笔记" prefix-icon="search" />
      <div class="notes">
        <div class="note-item" v-for="item in notes" :key="item">
          <span class="time">
            <el-icon><Clock /></el-icon>
            <span>2024-05-15 14:30</span>
          </span>
          <div class="content">
            <p>
              笔记内笔记内容笔记内容笔记内容笔记内容笔记内容笔记内容笔记内容笔记内容笔记内容笔记内容笔记内容笔记内容容
            </p>
          </div>
          <div class="footer">
            <el-dropdown placement="bottom-end">
              <el-button type="text">
                <el-icon><More /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    ><el-button type="text" icon="edit"
                      >编辑</el-button
                    ></el-dropdown-item
                  >
                  <el-dropdown-item
                    ><el-button type="text" icon="delete"
                      >删除</el-button
                    ></el-dropdown-item
                  >
                  <el-dropdown-item
                    ><el-button type="text" icon="star"
                      >收藏</el-button
                    ></el-dropdown-item
                  >
                  <el-dropdown-item>
                    <el-button type="text" icon="download">下载</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" icon="share">分享</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="right"><v-md-editor v-model="content" height="100%" /></div>
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
    overflow-y: auto;
    .notes {
      display: flex;
      flex-direction: column;
      gap: $margin-m;
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
  }
}
</style>
