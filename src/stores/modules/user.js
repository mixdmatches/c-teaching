import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const isCeshi = ref(false || localStorage.getItem('isCeshi'))
  const totalTime = ref(Number(localStorage.getItem('totalTime')) || 0)
  const changeCeshi = () => {
    isCeshi.value = true
    localStorage.setItem('isCeshi', isCeshi.value)
  }
  const changeTotalTime = studyTime => {
    totalTime.value += studyTime
    localStorage.setItem('totalTime', totalTime.value)
  }
  return { isCeshi, changeCeshi, totalTime, changeTotalTime }
})
