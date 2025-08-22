<template>
  <div v-html="block.content" class="prose max-w-none block-html"></div>
</template>

<script setup>
defineProps({ block: Object })
</script>

<style scoped>
.block-html {
  padding: 16px;
}
</style>