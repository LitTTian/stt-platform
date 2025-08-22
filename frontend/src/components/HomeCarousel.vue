<template>
  <div class="carousel-wrapper">
    <v-carousel
      cycle
      interval="3000"
      hide-delimiter-background
      height="300"
      ref="carouselRef"
    >
      <v-carousel-item
        v-for="(img, index) in props.images"
        :key="index"
      >
        <img
          :src="img"
          alt="轮播图"
          style="width: 100%; height: 100%; object-fit: cover;"
        />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

interface Props {
  images: string[]
}

const props = defineProps<Props>()
</script>

<style scoped>
.carousel-wrapper {
  width: 75%;           /* 设置宽度为80% */
  margin: 0 auto;       /* 居中 */
}

</style>