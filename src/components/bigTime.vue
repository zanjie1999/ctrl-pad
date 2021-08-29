<!-- 大时间显示器 -->
<template>
  <div class="big-time-box-column">
    <div class="big-time-box-row" v-if="props.showAmPm">
      <div class="big-time-ampm">{{ state.timeAmPm }}</div>
    </div>
    <div class="big-time-box-row">
      <div class="big-time">{{ state.timeStr }}</div>
      <div class="big-date">{{ state.dateStr }}</div>
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

<style>
.big-time-box-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.big-time-box-column {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
}

.big-time-ampm {
  font-size: 3em;
}

.big-date {
  font-size: 5em;
}

.big-time {
  font-size: 17em;
}
</style>
