<!-- 咩控制台 小时间显示器 -->
<template>
  <div class="small-time-box-row">
    <div class="small-time-box-column">
      <div class="small-time">{{ state.timeStr }}</div>
    </div>
    <div class="small-time-box-column ampm-date-box">
      <div class="small-time-ampm">{{ state.timeAmPm }}</div>
      <div class="small-date">{{ state.dateStr }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onBeforeUnmount } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const props = defineProps({
  showAmPm: String,
});

const state = reactive({});

state.bigTimer = setInterval(() => {
  const day = dayjs();
  state.timeAmPm = day.format("A");
  state.timeStr = day.format("h:mm:ss");
  state.dateStr = day.format("M月D日  ddd");
}, 1000);

onBeforeUnmount(() => {
  // 销毁时要停止定时器
  console.log("bigTime onBeforeUnmount");
  if (state.bigTimer) {
    window.clearInterval(state.bigTimer);
  }
});
</script>

<style scoped>
.small-time-box-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.small-time-box-column {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
}

.ampm-date-box {
  align-items: flex-start;
  padding-left: 0.5em;
}

.small-time-ampm {
  font-size: 1.5em;
  padding-top: 1.5em;
}

.small-date {
  font-size: 2em;
}

.small-time {
  font-size: 8em;
}
</style>
