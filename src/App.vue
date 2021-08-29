<template>
  <div class="background" :style="{ backgroundImage: 'url(' + state.backgroundImg + ')' }">
    <div class="dark-mode">
      <var-swipe class="swipe">
        <!-- 凌晨大时间显示器 -->
        <var-swipe-item v-if="state.isDawn" class="swipe-item dawn-mode">
          <bigTime showAmPm="true"/>
        </var-swipe-item>
        <!-- 正常的首页 -->
        <var-swipe-item class="swipe-item">
          <div class="main-box">
            <smallTime/>
          </div>
          <div class="main-box main-box-right">
            <vue-weather api-key="a9a79e59327a0dc88a110c7f442c8db8" units="uk" />
          </div>
        </var-swipe-item>
        <var-swipe-item class="swipe-item">
          <h1>33333</h1>
        </var-swipe-item>
      </var-swipe>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import dayjs from "dayjs";
import vueWeather from "vue-weather-widget"; 
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
  padding: 8px;
}

.dawn-mode {
  background-color: rgba(0, 0, 0, 0.5);
  color: rgb(228, 228, 228);
}

.light-mode {
  color: #000;
}

.dark-mode {
  background-color: rgba(0, 0, 0, 0.1);
  color: rgb(245, 245, 245);
}

.main-box {
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
}

.main-box-right {
  float: right;
  align-items: flex-end;

}
</style>
