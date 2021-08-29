<template>
  <div id="weather-v2-plugin-simple"></div>　　
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({})

const state = reactive({})

window.WIDGET = {
    CONFIG: {
        "layout": 1,
        "width": "300",
        "height": "150",
        "background": 1,
        "dataColor": "FFFFFF",
        "language": "zh",
        "borderRadius": 5,
        "city": "CN101250106",
        "key": "6yYvSSecPy"
    }
};
(function (d) {
    var c = d.createElement('link')
    c.rel = 'stylesheet'
    c.href = 'http://apip.weatherdt.com/standard/static/css/weather-standard.css?v=2.0'
    var s = d.createElement('script')
    s.src = 'http://apip.weatherdt.com/standard/static/js/weather-standard.js?v=2.0'
    var sn = d.getElementsByTagName('script')[0]
    sn.parentNode.insertBefore(c, sn)
    sn.parentNode.insertBefore(s, sn)
})(document)

</script>

<style scoped>

</style>
