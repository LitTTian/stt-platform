<template>
  <div class="text-to-image">
    <h2>文本生成图片</h2>
    
    <input v-model="text" placeholder="输入文本" />

    <button @click="generateImage">生成图片</button>

    <div class="preview" v-if="imageData">
      <h3>预览：</h3>
      <img :src="imageData" alt="生成图片" />
      <a :href="imageData" download="text-image.png">下载图片</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('Hello World')
const imageData = ref<string | null>(null)

const generateImage = () => {
  const canvas = document.createElement('canvas')
  const width = 600
  const height = 200
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (!ctx) return

  // 背景色
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, width, height)

  // 文本样式
  ctx.fillStyle = '#333'
  ctx.font = 'bold 36px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // 绘制文本
  ctx.fillText(text.value, width / 2, height / 2)

  // 导出图片
  imageData.value = canvas.toDataURL('image/png')
}
</script>

<style scoped>
.text-to-image {
  max-width: 700px;
  margin: 50px auto;
  text-align: center;
}

input {
  padding: 8px;
  font-size: 16px;
  width: 300px;
  margin-right: 10px;
}

button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}

.preview img {
  margin-top: 20px;
  border: 1px solid #ccc;
  max-width: 100%;
}
</style>
