<script setup>
import { ref } from 'vue'
import { marked } from 'marked'

const markdownContent = ref(`
# Hello Marked!

- 列表项1
- 列表项2

\`\`\`javascript
console.log('代码高亮');
\`\`\`
`)

const htmlContent = marked(markdownContent.value)
</script>

<template>
  <div class="markdown-body" v-html="htmlContent"></div>
</template>
