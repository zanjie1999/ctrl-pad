<template>
  <div
    class="background"
    :style="{ backgroundImage: 'url(' + state.backgroundImg + ')' }"
  >
    <div class="dark-mode">
      <var-swipe ref="swipe" class="swipe" @change="pageChange">
        <!-- 凌晨大时间显示器 -->
        <var-swipe-item v-if="state.isDawn" class="swipe-item dawn-mode">
          <bigTime showAmPm="true" />
        </var-swipe-item>
        <!-- 正常的首页 -->
        <var-swipe-item>
          <div class="main-box">
            <smallTime />
          </div>
          <div class="main-box main-box-right">
            <vue-weather
              api-key="a9a79e59327a0dc88a110c7f442c8db8"
              units="uk"
            />
          </div>
        </var-swipe-item>
        <!-- 浏览器 -->
        <var-swipe-item>
          <var-app-bar :title="state.iframeSrc">
            <template #left>
              <var-button
                round
                text
                color="transparent"
                text-color="#fff"
                @click="backButton()"
              >
                <var-icon name="chevron-left" :size="35" />
              </var-button>
            </template>

            <template #right>
              <var-button
                round
                text
                color="transparent"
                text-color="#fff"
                @click="homeButton()"
              >
                <var-icon name="home" :size="35" />
              </var-button>
            </template>
          </var-app-bar>
          <iframe class="iframeBrowser" :src="state.iframeSrc"></iframe>
        </var-swipe-item>
      </var-swipe>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const state = reactive({
  debug: false,
  backgroundImg: "/src/assets/4.jpg",
  iframeSrc: "http://rk:8123/lovelace/default_view",
  swipePage: 0,
  swipeTimeout: 0
});

// 定时器一分钟一次
const minJob = () => {
  window.sparkle = state;
  console.log("minJob!");
  const day = dayjs();
  state.timeH = day.hour();
  // 定时切换凌晨大时钟
  state.isDawn = false || (state.timeH >= 0 && state.timeH <= 6);
  // 超时回到第一页 10min
  if (state.swipePage != 0) {
    state.swipeTimeout++
    if (state.swipeTimeout == 10) {
      state.swipePage = 0
      state.swipeTimeout = 0
      swipe.value.go(0)
      console.log("auto goto page 0");
    }
  }
};
minJob();
state.minTimer = setInterval(minJob, 60000);

const pageChange = (page) => {
  console.log("pageChange:", page);
  state.swipePage = page
  if (page == 0) {
    state.swipeTimeout = 0
  }
};

const backButton = () => {
  window.history.back()
}

const swipe = ref(null);
const homeButton = () => {
  swipe.value.go(0)
}

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

.dawn-mode {
  background-color: rgba(0, 0, 0, 0.5);
  color: rgb(245, 245, 245);
}

.light-mode {
  color: #000;
}

.dark-mode {
  background-color: rgba(0, 0, 0, 0.1);
  color: #fff;
}

.main-box {
  margin: 0.5em;
  height: calc(100% - 1em);
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

.iframeBrowser {
  width: calc(100%/1.25);
  height: calc(100%/1.25);
  border-width: 0;
  position: absolute;
  transform: scale(1.25);
  transform-origin: 0 0;
}

.var-app-bar {
  background-color: #03a9f4;
}
</style>
