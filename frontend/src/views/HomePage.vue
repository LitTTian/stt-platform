<template>
  <MyHeader />
  <div style="padding-top: 80px;">
    <HomeCarousel :images="carouselImages" />
    <PostList type="latest" />
    <PostList type="hot" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MyHeader from '../components/MyHeader.vue'
import HomeCarousel from '../components/HomeCarousel.vue'
import PostList from '../components/PostList.vue'

const carouselImages = ref<string[]>([
  '/images/banner1.png',
  '/images/banner2.png',
  '/images/banner3.png'
])
</script>