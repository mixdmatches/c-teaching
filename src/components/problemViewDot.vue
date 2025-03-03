<script setup>
import {computed} from "vue";

const props = defineProps({
  value: String,
  completeColor: {type: String, default: '#1890ff'},
  incompleteColor: {type: String, default: '#c4c4c4'},
  errorColor: {type: String, default: '#ff0000'},
  error: {type: Boolean, default: false},
});
const color = computed(() => {
  if (props.error) {
    return props.errorColor
  }
  if (props.value) {
    return props.completeColor
  }else {
    return props.incompleteColor
  }
})
</script>

<template>
  <div class="dot" :style="{backgroundColor: color}">
    <slot/>
  </div>
</template>

<style scoped lang="scss">
.dot{
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>