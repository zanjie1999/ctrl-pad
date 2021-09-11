<!-- 咩控制台 rss新闻流订阅 -->
<template>

</template>

<script setup>
// import Parser from "rss-parser/dist/rss-parser.min.js";
import { defineProps, reactive } from "vue";

const props = defineProps({
  openWeb: Function,
});

const state = reactive({
  rssUrl: [
    "https://news.google.com/rss?hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
    "https://www.zhihu.com/rss",
  ],
  rssData: [{ title: "暂无新闻", link: "" }],
});

// let parser = new Parser();
// let feed = parser.parseURL("https://cors-anywhere.herokuapp.com/" + state.rssUrl[0]);
// console.log(feed);

// if (window.ipcRenderer) {
//   // 从后端拿rss结果 因为浏览器不能直接获取rss信息
//   ipcRenderer.on('rssParser', (event, data) => {
//     console.log('rssParser', data);
//     state.rssData = data
//   })
//   // ipcRenderer.send('rssParser', state.rssUrl);
// }
</script>

<style>
</style>
