<template>
  <pre class="bg-gray-100 p-2 rounded">未知类型: {{ block.content }}</pre>
</template>

<script setup>
defineProps({ block: Object })
</script>
