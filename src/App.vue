<template>
  <div class="background" :style="{backgroundImage: 'url(' + state.backgroundImg + ')'}">
    <var-swipe class="swipe">
      <var-swipe-item v-if="state.isDawn" class="dawn-mode">
        <!-- 大时间显示器 -->
        <bigTime showAmPm="true"></bigTime>
      </var-swipe-item>
      <var-swipe-item>
        <!-- 正常的首页 -->
        <smallTime></smallTime>
      </var-swipe-item>
      <var-swipe-item>
        <h1>33333</h1>
      </var-swipe-item>
    </var-swipe>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const state = reactive({
  debug: false,
  backgroundImg: "/src/assets/4.jpg",
});

// 定时器一分钟一次
const minJob = () => {
  window.sparkle = state;
  console.log("minJob!");
  const day = dayjs();
  state.timeH = day.hour();
  state.isDawn = false || (state.timeH >= 0 && state.timeH <= 7);
};
minJob();
state.minTimer = setInterval(minJob, 60000);
</script>

<style>
body {
  margin: 0;
} 
.background {
  background-color: grey;
  /* background-image: url("/src/assets/4.jpg"); */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  /* background-size: auto 100%; */
}

.swipe {
  width: 100vw;
  height: 100vh;
}

.swipe-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dawn-mode {
  background-color: rgba(0, 0, 0, 0.5);
  color: rgb(228, 228, 228);
}
</style>
