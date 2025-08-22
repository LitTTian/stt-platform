<template>
  <div class="block-file">
    <v-btn
      color="primary"
      outlined
      class="w-full justify-start"
      @click="downloadFile"
    >
      <v-icon left>mdi-file-download-outline</v-icon>
      {{ getFileName(block.content) }}
    </v-btn>
  </div>
</template>

<script setup>
defineProps({ block: Object })

// 获取文件名
const getFileName = (url) => {
  try {
    return url.split('/').pop()
  } catch {
    return '下载文件'
  }
}

// 点击下载
const downloadFile = () => {
  const link = document.createElement('a')
  link.href = block.content
  link.download = getFileName(block.content)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.block-file {
  margin-bottom: 16px;
}
</style>
