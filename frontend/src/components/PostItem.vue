<template>
    <v-card class="ma-4" elevation="3" max-width="1200">
      <!-- 帖子封面图 -->
      <v-img :src="imageSrc" height="200px" class="white--text align-end">
        <v-card-title>{{ post.title }}</v-card-title>
      </v-img>

    <!-- 帖子信息 -->
    <v-card-subtitle class="pt-2">
      作者: {{ post.author }} | 时间: {{ post.createdAt }}
    </v-card-subtitle>

    <!-- 简介 / 摘要 -->
    <v-card-text>
      {{ post.summary }}
    </v-card-text>

    <!-- 操作按钮 -->
    <v-card-actions>
      <v-btn color="primary" text @click="viewPost">查看详情</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue'

interface Post {
  id: number
  title: string
  author: string
  createdAt: string
  cover?: string      // 封面图可选
  summary: string
}

const props = defineProps<{ post: Post }>()
const imageSrc = ref<string>('')

// 生成文本封面
const generateTextImage = (text: string, width = 600, height = 200): string => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // 背景颜色
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)

  // 文本样式
  ctx.fillStyle = '#333'
  ctx.font = 'bold 36px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // 绘制文本
  ctx.fillText(text, width / 2, height / 2)

  return canvas.toDataURL('image/png')
}

const viewPost = () => {
  console.log(`查看帖子: ${props.post.id}`)
  // 可结合路由跳转
}

onMounted(() => {
  if (props.post.cover && props.post.cover.trim() !== '') {
    imageSrc.value = props.post.cover
  } else {
    imageSrc.value = generateTextImage(props.post.title)
  }
})
</script>

<style scoped>
/* 可选自定义样式 */
</style>
