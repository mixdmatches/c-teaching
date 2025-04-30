<script setup></script>
<template>
  <HeaderCm />
  <div class="body">
    <div class="vedio-content">
      <h1>c语言的历史</h1>
      <video
        ref="videoRef"
        class="vedio"
        controls
        preload="metadata"
        @ended="handleVideoEnded"
      >
        <source
          src="https://www.bilibili.com/video/av754202248/"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>
<style scoped lang="scss">
.body {
  margin-top: 90px;
  margin-left: 50px;
}
.vedio {
  width: 50%;
}
</style>
