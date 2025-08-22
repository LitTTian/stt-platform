<template>
  <input type="text" v-model="query" @keyup.enter="search" placeholder="搜索帖子" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const query = ref<string>('')

const search = (): void => {
  console.log('搜索', query.value)
}
</script>
