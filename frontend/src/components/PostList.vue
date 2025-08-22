<template>
  <div class="post-list">
    <h2>{{ type === 'latest' ? '最新帖子' : '热门帖子' }}</h2>
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue'
import PostItem from './PostItem.vue'

interface Post {
  id: number
  title: string
  author: string
  createdAt: string
  cover?: string     // 帖子封面图
  summary: string   // 帖子简介
}

interface Props {
  type: 'latest' | 'hot'
}

const props = defineProps<Props>()
const posts = ref<Post[]>([])

onMounted(() => {
  // 模拟接口获取帖子
  posts.value = [
    {
      id: 1,
      title: '避雷黄腔男',
      author: '作者A',
      createdAt: '2025-08-21',
      // cover: '/images/post1.jpg',
      summary: '避雷黄腔男避雷黄腔男避雷黄腔男避雷黄腔男避雷黄腔男避雷黄腔男避雷黄腔男避雷黄腔男。'
    },
    {
      id: 2,
      title: '百业社主装少爷欠30块不还',
      author: '作者B',
      createdAt: '2025-08-20',
      // cover: '/images/post2.jpg',
      summary: '百业社主装少爷欠30块不还百业社主装少爷欠30块不还百业社主装少爷欠30块不还百业社主装少爷欠30块不还百业社主装少爷欠30块不还'
    }
  ]
})
</script>

<style scoped>
.post-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.post-list h2 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
