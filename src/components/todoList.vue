<!-- 咩控制台 空白文件 -->
<template>
    <div class="todo-box" @click="update()">
        <h2 v-if="!state.todo.length" class="todo-msg">{{state.msg}}</h2>
        <div class="todo-list" v-if="state.todo.length">
            <div class="todo-item" v-for="(v,i) in state.todo" :key="i+1">
                <span class="todo-item-index">{{i+1}}.</span><span v-html="v.replace(/\n/g, '<br>')"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import axios from 'axios'


defineProps({
    msg: String
})

const state = reactive({
    todo: [],
    msg: '点击更新代办'
})

const update = () => {
    state.msg = '加载待办中...'
    axios.get('http://me:5757/todo').then((res) => {
        if (res.data.length) {
            console.log('todoList', res.data)
            state.todo = res.data
        } else {
            state.msg = '好棒！没有待办'
        }
    })
}
update()

expose({
    update
})
</script>

<style scoped>
.todo-item {
    font-size: 1.3em;
    display: flex;
}
.todo-box {
    max-width: 40vw;
    max-height: 75vh;
    overflow: auto;
}
.todo-item-index {
  margin-right: 2px;
}

.todo-msg {
  margin-right: 20px;
}
</style>
