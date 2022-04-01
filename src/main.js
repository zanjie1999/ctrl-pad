import { createApp } from 'vue'
import App from './App.vue'
import copyAndEditThisConfig from '../config.js' 

const me = createApp(App).mount('#app')
// 没啥用 一个个import好了 
// me.provide('$config', copyAndEditThisConfig) // 这样要inject('$config')取出来
// me.config.globalProperties.$config = copyAndEditThisConfig // 这个是this.$config 但前提是用export来初始化
