<template>
  <div class="block-md">
    <div v-html="renderedHtml" class="prose"></div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import MarkdownIt from 'markdown-it'
import markdownItKatex from 'markdown-it-katex'
import 'katex/dist/katex.min.css'

// ✅ 给 defineProps 一个变量名
const props = defineProps({
  block: Object
})

// 初始化 Markdown-it 并启用 katex
const md = new MarkdownIt({ html: true, breaks: true}).use(markdownItKatex)

const renderedHtml = ref('')

// ✅ 使用 props.block
watchEffect(() => {
  if (props.block && props.block.content) {
    console.log(props.block.content)
    renderedHtml.value = md.render(props.block.content)
    console.log(renderedHtml.value)
  }
})
</script>

<style scoped>
.block-md {
  padding: 16px;
}
</style>