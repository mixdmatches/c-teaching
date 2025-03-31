<template>
  <!-- 引入头部组件 -->
  <HeaderCm />
  <div class="c-study-page">
    <div class="main-content">
      <!-- 视频教学区域 -->
      <div class="video-area">
        <video-player
          ref="videoRef"
          :options="playerOptions"
          class="vjs-custom-skin"
          @play="onVideoPlay"
        />
        <div class="info">
          <h3>主讲人：张老师</h3>
          <h2>开课时间：2025年3月26日</h2>
          <h2>本章内容：C语言历史</h2>
        </div>
      </div>

      <!-- 测试题目区域 -->
      <div class="question" v-if="currentQuestion">
        <h3>{{ currentQuestion.title }}</h3>
        <el-radio-group v-model="selectedOption">
          <el-radio
            v-for="option in currentQuestion.options"
            :key="option.id"
            :label="option.id"
          >
            {{ option.text }}
          </el-radio>
        </el-radio-group>
        <div class="actions">
          <el-button type="success" @click="submitAnswer">提交答案</el-button>
          <el-button type="primary">问AI</el-button>
        </div>
        <div v-if="showFeedback" class="feedback">
          <p v-if="isCorrect" style="color: green;">回答正确！</p>
          <p v-else style="color: red;">回答错误！正确答案是：{{ correctAnswer }}</p>
          <p><strong>解析：</strong>{{ currentQuestion.explanation }}</p>
        </div>
      </div>
    </div>

    <!-- 知识点呈现区域 -->
    <div class="knowledge-area">
      <el-scrollbar height="520px">
        <section class="markdown-container" v-html="markdownToHtml"></section>
      </el-scrollbar>
    </div>
  </div>
  <div class="footer">
    <div class="chapter">当前章*当前节</div>
    <div class="previous">
      <a href="#">
        <el-icon><ArrowLeft /></el-icon>
        上一节
      </a>
    </div>
    <div class="next">
      <a href="#">
        下一节
        <el-icon><ArrowRight /></el-icon>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import HeaderCm from '@/components/HeaderCm.vue';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import { VideoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';

// 定义视频播放器的 ref
const videoRef = ref(null);

// 配置播放器选项
const playerOptions = ref({
  autoplay: false,
  controls: true,
  loop: false,
  muted: false, // 是否静音
  preload: 'auto', // 预加载模式
  sources: [
    {
      src: '/video/cc.mp4',
      type: 'video/mp4',
    },

  ],
  poster: '',
  width: 600,
  height: 300,
  // controlBar: {
  //   fullscreenToggle: true, // 确保全屏按钮可见
  // },
});

// 视频播放事件处理函数
const onVideoPlay = () => {
  if (videoRef.value) {
    const player = (videoRef.value as any).player;
    if (player) {
      player.requestFullscreen(); // 调用全屏方法
    }
  }
};
// 配置 marked 高亮 -对代码块进行语法高亮
marked.setOptions({
  // 使用类型断言绕过类型检查
  highlight: function (code, lang) {
    return hljs.highlightAuto(code).value;
  },
} as any);


// 测试题目数据
const questionList = reactive([
  {
    title: '题目 1：以下哪一个是 C 语言中的基本数据类型？',
    options: [
      { id: 'A', text: 'String' },
      { id: 'B', text: 'int' },
      { id: 'C', text: 'Array' },
      { id: 'D', text: 'Object' },
    ],
    correctAnswer: 'B',
    explanation: 'C 语言的基本数据类型包括 int、float、char 等。',
  },
  {
    title: '题目 2：以下哪个符号用于注释单行代码？',
    options: [
      { id: 'A', text: '//' },
      { id: 'B', text: '/* */' },
      { id: 'C', text: '#' },
      { id: 'D', text: '--' },
    ],
    correctAnswer: 'A',
    explanation: '// 是 C 语言中用于注释单行代码的符号。',
  },
]);

// 当前题目索引
const currentQuestionIndex = ref(-1);
const selectedOption = ref('');
const showFeedback = ref(false);
const isCorrect = ref(false);

// 获取当前题目
const currentQuestion = computed(() => {
  if (currentQuestionIndex.value >= 0 && currentQuestionIndex.value < questionList.length) {
    return questionList[currentQuestionIndex.value];
  }
  return null;
});

// 获取正确答案
const correctAnswer = computed(() => {
  return currentQuestion.value?.correctAnswer || '';
});

// 开始测试
const startTest = () => {
  currentQuestionIndex.value = 0;
  selectedOption.value = '';
  showFeedback.value = false;
};

// 提交答案
const submitAnswer = () => {
  if (!selectedOption.value) {
    ElMessage.error('请选择一个选项！');
    return;
  }

  // 判断答案是否正确
  isCorrect.value = selectedOption.value === correctAnswer.value;
  showFeedback.value = true;

  // 如果还有下一题，等待用户点击继续
  if (currentQuestionIndex.value < questionList.length - 1) {
    setTimeout(() => {
      nextQuestion();
    }, 1000); // 延迟 2 秒自动跳到下一题
  } else {
    ElMessage.success('测试已完成！');
  }
};

// 下一题
const nextQuestion = () => {
  currentQuestionIndex.value++;
  selectedOption.value = '';
  showFeedback.value = false;
};

// Markdown 内容
const markdown = `
# C 语言基础知识点

## 基本语法
C 语言的基本语法包括变量声明、函数定义、控制结构等。例如，变量声明可以使用以下语法：
\`\`\`c
int num;
\`\`\`

## 变量声明
在 C 语言中，变量必须先声明后使用。声明变量时需要指定变量的类型和名称。例如：
\`\`\`c
float price;
\`\`\`
## 变量声明
在 C 语言中，变量必须先声明后使用。声明变量时需要指定变量的类型和名称。例如：
\`\`\`c
float price;
\`\`\`
`;

// 使用 computed 计算属性将 Markdown 转换为 HTML
const markdownToHtml = computed(() => {
  return marked(markdown);
});

// 在组件挂载时启动测试
onMounted(() => {
  startTest();
});
</script>


<style scoped lang="scss">
.c-study-page {
  margin: 10px 0;
  display: flex;
  padding: 20px;
  gap: 20px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.video-area {
  background-color: #ffffff;
  position: relative;
  height: 400px;
  width: 650px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  margin-top: 10px;
}

.question {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 600px;

  .actions {
    margin-top: 10px;
  }

  .feedback {
    margin-top: 10px;
  }
}

.knowledge-area {
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.markdown-container {
  line-height: 1.6;
  color: #333;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #222;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }

  p {
    margin-bottom: 1em;
  }

  pre {
    background-color: #f6f8fa;
    border-radius: 6px;
    padding: 1em;
    overflow-x: auto;
    margin-bottom: 1em;
  }

  code {
    background-color: #f6f8fa;
    padding: 0.2em 0.4em;
    border-radius: 6px;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }
}
.info {
  position: absolute;
  left: 20px;
  bottom: 10px;
  h2 {
    padding-top:10px;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
  padding: 0 20px;
  box-sizing: border-box;
  .previous {
    position: absolute;
    right: 100px;
  }
  a:hover {
    color: $primary-color;
  }
}

</style>