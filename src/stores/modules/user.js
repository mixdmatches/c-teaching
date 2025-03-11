import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const isCeshi = ref(false || localStorage.getItem('isCeshi'))
  const totalTime = ref(0 || localStorage.getItem('totalTime'))
  const changeCeshi = () => {
    isCeshi.value = true
    localStorage.setItem('isCeshi', isCeshi.value)
  }
  const userId = ref('100001')
  const getUserId = () => {
    return userId.value
  }
  return { isCeshi, changeCeshi ,getUserId}
})
