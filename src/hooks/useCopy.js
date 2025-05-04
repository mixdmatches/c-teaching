import { ElMessage } from 'element-plus'
export const useCopy = () => {
  // 复制按钮回调
  const handleCopy = async text => {
    try {
      await navigator.clipboard.writeText(text)
      ElMessage.success('复制成功')
    } catch (_err) {
      ElMessage.error('复制失败，请手动选择文本复制')
    }
  }
  return { handleCopy }
}
