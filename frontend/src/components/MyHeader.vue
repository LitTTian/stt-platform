<template>
  <v-app-bar color="primary" dark flat>
    <!-- 左侧标题 / Logo -->
    <v-toolbar-title class="mr-6">燕云吃瓜小助手</v-toolbar-title>

    <!-- 中间搜索框 -->
    <v-text-field
      v-model="searchQuery"
      placeholder="搜索内容..."
      dense
      hide-details
      rounded
      outlined
      append-inner-icon="mdi-magnify"
      @click:append-inner="onSearch"
      class="flex-grow-1 mx-4"
    ></v-text-field>

    <!-- 右侧登录按钮 -->
    <v-btn color="secondary" @click="onLogin">登录</v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchQuery = ref('')

const onSearch = () => {
  console.log('搜索内容:', searchQuery.value)
  // 可以触发搜索逻辑
}

const onLogin = () => {
  console.log('点击登录')
  // 跳转到登录页面或弹窗
}
</script>

<style scoped>
/* 可以根据需要调整搜索框宽度 */
.v-text-field.flex-grow-1 {
  max-width: 400px;
}
</style>

