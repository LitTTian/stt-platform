<template>
  <v-img
    :src="block.content"
    width="100%"
    max-height="400"
    cover
    class="shadow-sm"
  />
</template>

<script setup>
defineProps({ block: Object })
</script>