<script setup>
const props = defineProps({
  text:{type:String, required: true},
});
</script>

<template>
  <div class="tag">{{props.text}}</div>
</template>

<style scoped lang="scss">
.tag{
  display: inline-block;
  background-color: #e6f4ff;
  border: 1px solid #BAE0FF;
  border-radius: 4px;
  padding: $padding-s;
  color: $primary-color;
}
</style>