<template>
  <div id="tp-weather-widget" :class="{'dark-mode-weather': props.dark}"></div>
</template>

<script>  (function(a,h,g,f,e,d,c,b){b=function(){d=h.createElement(g);c=h.getElementsByTagName(g)[0];d.src=e;d.charset="utf-8";d.async=1;c.parentNode.insertBefore(d,c)};a["SeniverseWeatherWidgetObject"]=f;a[f]||(a[f]=function(){(a[f].q=a[f].q||[]).push(arguments)});a[f].l=+new Date();if(a.attachEvent){a.attachEvent("onload",b)}else{a.addEventListener("load",b,false)}}(window,document,"script","SeniverseWeatherWidget","//cdn.sencdn.com/widget2/static/js/bundle.js?t="+parseInt((new Date().getTime() / 100000000).toString(),10)));</script>
<script setup>
import { defineProps, reactive } from 'vue'

const props = defineProps({
  dark: String,
});

const state = reactive({})
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
</script>

<style>
  .dark-mode-weather .sw-container .sw-bar-slim {
    color: #fff;
  }
</style>
