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
<<<<<<< HEAD
  const userId = ref('100001')
  const getUserId = () => {
    return userId.value
  }
  return { isCeshi, changeCeshi, totalTime, changeTotalTime ,getUserId}
=======
  return { isCeshi, changeCeshi, totalTime, changeTotalTime }
>>>>>>> a4b76a2fbb0bff24a491a58d366714375955a690
})
