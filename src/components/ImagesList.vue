<template>
  <ul class="">
    <li class="image" v-for="image in images" :key="image.id">
      <router-link :to="{name: 'image', params: {id: image.id}}">
        <img :src="image.src.tiny" alt="взять из input">
      </router-link>
      <p class="is-size-6"><a :href="image.photographer_url">{{ image.photographer }}</a></p>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['images'],
};
</script>

<style lang="scss" scoped>

.image {
  display: inline-block;
  margin: 10px 10px 0 10px;
  transition: transform 0.5s ease;
  margin: 12px 12px 0 12px;
    &:hover {
      transform: scale(1.07);
  }
}
</style>
