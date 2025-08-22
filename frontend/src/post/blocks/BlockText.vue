<template>
  <div class="block-text">
    {{ block.content }}
  </div>
</template>

<script setup>
defineProps({ block: Object })
</script>

<style scoped>
.block-text {
  padding: 16px;
}
</style>