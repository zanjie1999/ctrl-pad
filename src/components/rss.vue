<!-- 咩控制台 rss新闻流订阅 -->
<template>
    <var-button round text color="transparent" @click="prev()">
        <var-icon name="menu-left" :size="35" class="rss-button" />
    </var-button>
    <var-swipe ref="rssSwipe" class="rss-swipe" :autoplay="5000">
        <template #default>
            <var-swipe-item v-for="r in state.rssData" :key="r.title">
                <div class="rss-item" @click="props.openWeb(r.link)">
                    <h2 class="rss-text shadow">{{ r.title }}</h2>
                </div>
            </var-swipe-item>
        </template>
        <template #indicator="{ index, length }">
            <div class="indicators">
                {{ index + 1 }} / {{ length }}
            </div>
        </template>
    </var-swipe>
    <var-button round text color="transparent" @click="next()">
        <var-icon name="menu-right" :size="35" class="rss-button" />
    </var-button>
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import Parser from "rss-parser/dist/rss-parser.min.js";

const props = defineProps({
    openWeb: Function,
});

const state = reactive({
    rssUrl: [
        "https://news.google.com/rss?hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
        "https://www.zhihu.com/rss",
    ],
    rssData: [{ title: "假装这里有新闻", link: "" }],
});

const rssSwipe = ref(null);

// 拿不全还跨域 不如直接让后端拿
// let parser = new Parser();
// state.rssData = [];
// state.rssUrl.forEach((url) => {
//   parser.parseURL(url, (err, feed) => {
//     if (err) throw err;
//     console.log(feed.title, feed.items);
//     feed.items?.forEach((item) => {
//       state.rssData.push({ title: item.title, link: item.link });
//     });
//   });
// });

const update = () => {
    if (window.ipcRenderer) {
        state.rssData = [{ title: "加载订阅中...", link: "" }]
        ipcRenderer.send("rssParser", ...state.rssUrl);
    }
}

if (window.ipcRenderer) {
    // 从后端拿rss结果 因为浏览器几乎不能直接获取rss信息
    ipcRenderer.on("rssParser", (event, data) => {
        console.log("rssParser", data);
        if (data) {
            state.rssData = data;
        } else {
            state.rssData = [{ title: "暂无新闻", link: "" }]
        }
        rssSwipe.value.to(0);
    });
    update()
}

const prev = () => {
    rssSwipe.value.prev();
};

const next = () => {
    rssSwipe.value.next();
};

expose({
    update
})
</script>

<style scoped>
.rss-swipe {
    width: 60vw;
}

.rss-item {
    width: 60vw;
    display: flex;
    justify-content: center;
}

.rss-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 13px;
    font-weight:400;
}

.rss-button {
    padding-top: 8px;
}

.indicators {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 4px 0;
    font-size: 10px;
}

.dark-mode .shadow {
    /* text-shadow: 0 0 5px rgba(0, 0, 0, 0.6); */
}
</style>
