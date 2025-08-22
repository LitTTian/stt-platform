<template>
  <div class="block-link flex items-center justify-between">
    <div class="block-title">
      {{ props.block.title || getFileName(props.block.content) }}
    </div>

    <v-btn
      color="primary"
      outlined
      small
      @click="handleClick"
    >
      <v-icon left>{{ icon }}</v-icon>
      {{ hint }}
    </v-btn>
  </div>
</template>

<style scoped>
.block-link {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: space-between; /* 左右分开 */
  gap: 8px;           /* ← 标题和按钮间距 */
  padding: 16px;
  height: auto;
}

.block-title {
  font-weight: 500;
  font-size: 0.95rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* flex: 1; */
  align-self: center; /* 垂直居中 */
}
</style>

<script setup>
const props = defineProps({
  block: Object
})

// 判断是否为文件
const isFile = (url) => {
  const fileExts = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.rar']
  return fileExts.some(ext => url.toLowerCase().endsWith(ext))
}

// 判断是否为视频
const isVideo = (url) => {
  const videoExts = ['.mp4', '.webm', '.ogg']
  return videoExts.some(ext => url.toLowerCase().endsWith(ext))
}

// 获取文件名
const getFileName = (url) => {
  try {
    return url.split('/').pop()
  } catch {
    return '打开链接'
  }
}

// 根据类型选择图标
const icon = isFile(props.block.content)
  ? 'mdi-file-download-outline'
  : isVideo(props.block.content)
  ? 'mdi-play-circle-outline'
  : 'mdi-link-variant'

const hint = isFile(props.block.content)
  ? '下载文件'
  : isVideo(props.block.content)
  ? '播放视频'
  : '打开链接'

// 点击事件
const handleClick = () => {
  if (isFile(props.block.content)) {
    const link = document.createElement('a')
    link.href = props.block.content
    link.download = getFileName(props.block.content)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } else {
    window.open(props.block.content, '_blank')
  }
}
</script>
