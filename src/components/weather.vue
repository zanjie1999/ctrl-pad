<!-- 咩控制台 天气 -->
<template>
  <div id="tp-weather-widget" :class="{'dark-mode-weather': props.dark}" v-if="state.show"></div>
</template>

<script>  (function(a,h,g,f,e,d,c,b){b=function(){d=h.createElement(g);c=h.getElementsByTagName(g)[0];d.src=e;d.charset="utf-8";d.async=1;c.parentNode.insertBefore(d,c)};a["SeniverseWeatherWidgetObject"]=f;a[f]||(a[f]=function(){(a[f].q=a[f].q||[]).push(arguments)});a[f].l=+new Date();if(a.attachEvent){a.attachEvent("onload",b)}else{a.addEventListener("load",b,false)}}(window,document,"script","SeniverseWeatherWidget","//cdn.sencdn.com/widget2/static/js/bundle.js?t="+parseInt((new Date().getTime() / 100000000).toString(),10)));</script>
<script setup>
import { defineProps, reactive } from 'vue'

const props = defineProps({
  dark: String,
});

const state = reactive({
  show: true,
})

const init = () => {
  window.SeniverseWeatherWidget('show', {
    flavor: "slim",
    location: "WS0E9D8WN298",
    geolocation: true,
    language: "zh-Hans",
    unit: "c",
    theme: "auto",
    token: "9f41368b-06dd-43fd-a772-0820ff2b1e98",
    hover: "enabled",
    container: "tp-weather-widget"
  })
}
init();

</script>

<style>
  .dark-mode-weather .sw-bar-slim {
    color: #fff;
  }

  /* 温度 */
  #tp-weather-widget .sw-container .sw-bar-slim .sw-typography {
    font-size: 3em !important;
  }
 
  .sw-bar-slim-location {
    display:none;
  }

  /* 天气图标 */
  #tp-weather-widget .sw-container .sw-bar-slim img {
    filter: drop-shadow(0px 0px 20px rgba(0,0,0,0.5));
    width: 3.5em !important;
    height: 3.5em !important;
  }

  /* 预警图标 */
  .icon-background-alarmCircle {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  .icon-background-alarmCircle .jRCMdc {
    font-size: 3em !important;
    filter: drop-shadow(0px 0px 20px rgba(0,0,0,0.5));
  }

  /* 卡片里面的字 */
  #tp-weather-widget .sw-card-slim-container { 
    text-shadow: 0 0 0 rgba(0,0,0,0.5);
    max-height: 85vh;
    overflow: auto;
  }

</style>
