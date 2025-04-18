import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const isCeshi = ref(false || localStorage.getItem('isCeshi'))
  const authority = ref()
  const totalTime = ref(Number(localStorage.getItem('totalTime')) || 0)
  const changeCeshi = () => {
    isCeshi.value = true
    localStorage.setItem('isCeshi', isCeshi.value)
  }
  const changeTotalTime = studyTime => {
    totalTime.value += studyTime
    localStorage.setItem('totalTime', totalTime.value)
  }
  const userInfo = ref({})
  const setUserInfo = newuserInfo => {
    userInfo.value = newuserInfo
  }
  const userId = ref('100001')
  const studentId = ref('210047301')
  const getUserId = () => {
    return userId.value
  }
  return {
    authority,
    userInfo,
    setUserInfo,
    isCeshi,
    changeCeshi,
    totalTime,
    changeTotalTime,
    getUserId,
    studentId: studentId.value,
  }
})
