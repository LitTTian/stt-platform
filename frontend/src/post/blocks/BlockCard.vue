<template>
  <v-sheet class="pa-4 shadow-sm mb-4 position-relative" elevation="1" rounded="lg">
    <!-- 左上角显示 block 类型 -->
    <div class="block-type-label">
      {{ block.content_type }}
    </div>

    <!-- 根据 content_type 自动渲染子组件 -->
    <component
      :is="blockComponent"
      :block="block"
    />
  </v-sheet>
</template>

<script setup>
import { computed } from 'vue'
import BlockText from './BlockText.vue'
import BlockImg from './BlockImg.vue'
import BlockHtml from './BlockHtml.vue'
import BlockMd from './BlockMd.vue'
import BlockLink from './BlockLink.vue'
import BlockDefault from './BlockDefault.vue'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const blockComponent = computed(() => {
  switch (props.block.content_type) {
    case 'text': return BlockText
    case 'img': return BlockImg
    case 'html': return BlockHtml
    case 'md': return BlockMd
    case 'link': return BlockLink
    default: return BlockDefault
  }
})
</script>

<style scoped>
/* 左上角文字，无背景，浅灰色，小字号 */
.block-type-label {
  position: absolute;
  top: 6px;
  left: 6px;
  color: #999;       /* 浅灰色 */
  font-size: 0.625rem; /* 更小一点，大约 10px */
  font-weight: 400;
  text-transform: uppercase;
  pointer-events: none; /* 避免挡住内容 */
}

.position-relative {
  position: relative;
}
</style>
