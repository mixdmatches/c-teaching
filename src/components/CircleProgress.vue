<script setup>
defineProps({
  size: { type: Number, default: 70 },
  borderWidth: { type: Number, default: 20 },
  progress: { type: Number, default: 0 },
  color: { type: String, default: '#ff4d4f' },
})
</script>

<template>
  <div
    class="progress-ring"
    :style="{ '--progress': progress, '--size': size + 'px', '--color': color }"
  >
    <div
      class="progress-inner"
      :style="{ '--innerSize': size - borderWidth + 'px' }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.progress-ring {
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: conic-gradient(
    var(--color) calc(var(--progress) * 3.6deg),
    #f3f3f3 0deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-inner {
  width: var(--innerSize);
  height: var(--innerSize);
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2 * $font-size-l;
}
</style>
