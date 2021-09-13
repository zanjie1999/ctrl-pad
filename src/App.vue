<template>
  <div
    class="background"
    :style="{
      backgroundImage: 'url(\'' + state.bgImg + '\')',
      backgroundColor: state.bgMutedColor,
    }"
  >
    <div :class="[state.useLightMode ? 'light-mode' : 'dark-mode']">
      <!-- <div :class="[ state.useLightMode ? 'light-mode' : 'dark-mode']" :style="{color: state.useLightMode ? state.bgDarkVibrant : state.bgLightVibrantColor}"> -->
      <var-swipe ref="swipe" class="swipe" @change="pageChange">
        <!-- 凌晨大时间显示器 -->
        <var-swipe-item v-if="state.isDawn" class="swipe-item dawn-mode">
          <bigTime showAmPm="true" />
        </var-swipe-item>
        <!-- 正常的首页 -->
        <var-swipe-item>
          <!-- 主页顶 -->
          <div class="main-box-top">
            <rss ref="rssBar" :openWeb="openWeb" class="shadow" />
          </div>
          <!-- 主页左 -->
          <div class="main-box">
            <weather :dark="!state.useLightMode" class="shadow" />
            <smallTime class="shadow" :minJob="minJob" />
          </div>
          <!-- 主页右 -->
          <div class="main-box main-box-right">
            <div class="main-button-box">
              <var-button round text color="transparent" @click="uiharu()">
                <var-icon name="wrench" />
              </var-button>
              <var-button round text color="transparent" @click="bgChange()">
                <var-icon name="refresh" />
              </var-button>
              <var-button round text color="transparent" @click="minimize()">
                <var-icon name="minus" />
              </var-button>
            </div>
          </div>
        </var-swipe-item>
        <!-- 浏览器 -->
        <var-swipe-item>
          <var-app-bar title-position="center">
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
              <var-input
                :hint="false"
                :line="false"
                :placeholder="state.iframeSrc"
                v-model="state.iframeSrcInp"
                @keyup.enter="iframeSrcInpEnter"
                style="width: 75vw; overflow: hidden;"
              />
            </template>

            <template #right>
              <var-menu :offset-y="38" :offset-x="-20" v-model:show="state.isWebListMenuOpen">
                <var-button
                  round
                  text
                  color="transparent"
                  text-color="#ffffff"
                  @click="state.isWebListMenuOpen = !state.isWebListMenuOpen"
                >
                  <var-icon name="menu" :size="35" />
                </var-button>

                <template #menu>
                  <div class="menu-list">
                    <var-cell
                      class="menu-cell"
                      v-for="v in state.webList"
                      :key="v.n"
                      @click="openWeb(v.u)"
                    >
                      {{ v.n }}
                    </var-cell>
                  </div>
                </template>
              </var-menu>
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
import { Snackbar, Dialog } from "@varlet/ui";
import "@varlet/ui/es/dialog/style/index.js";
import "@varlet/ui/es/snackbar/style/index.js";
// import dayjs from "dayjs";
// import "dayjs/locale/zh-cn";
// dayjs.locale("zh-cn");
import * as Vibrant from "node-vibrant";

const swipe = ref(null);
const rssBar = ref(null);

const state = reactive({
  debug: false,
  bgImgList: ["1.png", "2.png", "3.png", "4.jpg", "5.jpg"],
  bgImg: "",
  bgMutedColor: "#000",
  bgLightVibrantColor: "#fff",
  bgDarkVibrant: "#000",
  bgLastChange: 0,
  useLightMode: false,
  iframeSrc: "",
  swipePage: 0,
  swipeTimeout: 0,
  webList: [
    { n: "Hass", u: "http://rk:8123/lovelace/default_view" },
    { n: "群晖", u: "http://owo:5000", },
    { n: "百度", u: "https://www.baidu.com", },
    { n: "Google", u: "https://www.google.com/ncr", },
    { n: "网抑", u: "https://simplecloudmusic.com/", },    
    ],
  isWebListMenuOpen: false,
});

// 输入框回车
const iframeSrcInpEnter = () => {
  if (state.iframeSrcInp == "") {
    state.iframeSrcInp = state.iframeSrc
    return;
  }
  if (state.iframeSrcInp.indexOf("://") > 0){
    state.iframeSrc = state.iframeSrcInp;
  } else {
    state.iframeSrc = "http://" + state.iframeSrcInp;
  }
  state.iframeSrcInp = "";
};

// 在浏览器打开页面
const openWeb = (url) => {
  console.log("openWeb:", url);
  if (url) {
    swipe.value.to(1);
    state.iframeSrc = url;
  }
};

// 背景图切换
const bgChange = () => {
  // 随机选择背景图
  if (state.bgLastChange == 0 || state.bgLastChange == state.bgImgList.length) {
    state.bgLastChange = 0;
    // 打乱list顺序
    for (let i = state.bgImgList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.bgImgList[i], state.bgImgList[j]] = [
        state.bgImgList[j],
        state.bgImgList[i],
      ];
    }
    console.log("bgShuffle: ", state.bgImgList);
  }
  state.bgImg = encodeURI(
    "/src/assets/bg/" + state.bgImgList[state.bgLastChange]
  );
  console.log("bgChange: ", state.bgImg);
  state.bgLastChange++;

  // 分析背景颜色 太卡了延时下
  setTimeout(updateColor(), 1000);
};

const updateColor = () => {
  Vibrant.from(state.bgImg)
    .quality(1)
    .getPalette()
    .then((palette) => {
      console.log("bgPalette", palette);
      // let lm = palette.LightMuted.getRgb()
      // let dm = palette.DarkMuted.getRgb()
      // let m = [lm[0]-dm[0], lm[1]-dm[1], lm[2]-dm[2]];
      // state.bgMutedColor = Vibrant.Util.rgbToHex(...m);
      
      state.bgLightVibrantColor = palette.LightVibrant.getHex();
      state.bgDarkVibrant = palette.DarkVibrant.getHex();
      // 转为灰度
      // let m = palette.LightVibrant.getRgb()
      // let grayscale = (m[0] * 299 + m[1] * 587 + m[2] * 114 + 500) / 1000;
      // console.log("toGrayscale:", grayscale);
      // state.useLightMode = grayscale > 130;
      // 为什么要自己算XD
      state.useLightMode = palette.Muted.getBodyTextColor() == '#000' || palette.Vibrant.getBodyTextColor() == '#000'
      if (state.useLightMode) {
        state.bgMutedColor = palette.LightMuted.getHex()
      } else {
        state.bgMutedColor = palette.Muted.getHex()
      }
  });
}

// 定时器一分钟一次
const minJob = (timeH, timeM) => {
  window.sparkle = state;
  console.log("minJob!");
  // 定时切换凌晨大时钟
  state.isDawn = false || (timeH >= 0 && timeH <= 6);
  // 超时回到第一页 10min
  if (state.swipePage != 0) {
    state.swipeTimeout++;
    if (state.swipeTimeout == 10) {
      state.swipePage = 0;
      swipe.value.to(0);
      console.log("auto goto page 0");
    }
  } else {
    state.swipeTimeout = 0
  }
  // 自动更换背景 10min
  if (timeM % 10 == 0) {
    bgChange();
  }
  // 更新新闻
  if (timeH == 6 || timeH == 12 || timeH == 18) {
    rssBar.value.update();
  }
};
minJob();

const pageChange = (page) => {
  console.log("pageChange:", page);
  state.swipePage = page;
  if (page == 0) {
    state.swipeTimeout = 0;
  }
};

const backButton = () => {
  window.history.back();
};

const homeButton = () => {
  swipe.value.to(0);
};

const minimize = () => {
  ipcRenderer.send("minimize");
};

if (window.ipcRenderer) {
  // 后端推送提示框
  ipcRenderer.on("Dialog", (event, msg) => {
    Dialog(msg);
  });
  ipcRenderer.on("Snackbar", (event, msg) => {
    Snackbar(msg);
  });

  // 从后端拿到背景图列表
  ipcRenderer.on("getBgImgList", (event, err, data) => {
    console.log("getBgImgList", err, data);
    if (err) {
      Dialog(err);
      return;
    }
    state.bgImgList = data;
    bgChange();
  });
  ipcRenderer.send("getBgImgList");
} else {
  // 使用普通浏览器无法与electron后端通信
  bgChange();
}

const uiharu = () => {
  console.log('bar',rssBar.value.update)
  rssBar.value.update();
}
</script>

<style>
body::-webkit-scrollbar { width: 0 !important }

body {
  margin: 0;
}
.background {
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
  /* background-color: rgba(0, 0, 0, 0.1); */
  color: #fff;
}

.dark-mode .shadow {
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
}

.light-mode .shadow {
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
}

.main-box {
  float: left;
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

.main-box-top {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
}

.main-button-box {
  /* opacity: 0.3; */
}

.main-button-box .var-button {
  margin-left: 1em;
  width: 3em;
  height: 3em;
}

.iframeBrowser {
  width: calc(100% / 1.25);
  height: calc(100% / 1.25);
  border-width: 0;
  position: absolute;
  transform: scale(1.25);
  transform-origin: 0 0;
}

.var-app-bar {
  background-color: #03a9f4;
}

.var-menu {
  background: transparent;
}

.menu-list {
  background: #fff;
}

.menu-list .menu-cell {
  display: block;
  padding: 10px;
}
</style>
