import { Marked } from 'marked'
import hljs from 'highlight.js'
import { markedHighlight } from 'marked-highlight'
import 'highlight.js/styles/base16/github.css'

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'shell'
      return hljs.highlight(code, { language }).value
    },
  }),
)

export default {
  mounted(el, binding) {
    const html = marked.parse(binding.value)
    el.innerHTML = html
  },
  updated(el, binding) {
    const html = marked.parse(binding.value)
    el.innerHTML = html
  },
}
