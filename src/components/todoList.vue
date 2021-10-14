<!-- 咩控制台 空白文件 -->
<template>
  
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })

axios.get('http://64.27.14.219:5757/todo').then((data) => {
  console.log('todo',data)
})

</script>

<style scoped>

</style>
