<template>
  <var-swipe class="swipe">
    <var-swipe-item v-if="state.timeH >= 0 && state.timeH <= 7">
      <!-- 大时间显示器 -->
      <bigTime showAmPm="true"></bigTime>
    </var-swipe-item>
    <var-swipe-item>
      <!-- 正常的首页 -->
      <bigTime></bigTime>
    </var-swipe-item>
    <var-swipe-item>
      <h1>33333</h1>
    </var-swipe-item>
  </var-swipe>
</template>

<script setup>
import { reactive } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const state = reactive({});

// 定时器一分钟一次
const minJob = () => {
  window.sparkle = state;
  console.log("minJob!");
  const day = dayjs();
  state.timeH = day.hour();
}
minJob();
state.minTimer = setInterval(minJob, 60000);
</script>

<style>
body {
  background-color: grey;
}

.swipe {
  width: 100%;
  height: 97.7vh;
}

.swipe-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


</style>
