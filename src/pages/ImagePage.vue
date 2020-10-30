<template>
  <div class="container has-text-centered ">
    <article class="media pt-1">
      <div class="media-content">
        <div class="content">
          <picture v-if="image.src" class="is-centere">
            <source media="(max-width: 799px)" :srcset="image.src.portrait">
            <source media="(min-width: 800px)" :srcset="image.src.landscape">
            <img :src="image.src.large" :alt="Photo">
          </picture>

          <nav class="level is-mobile">

              <a class="level-item">
                <span class="icon is-large is-primary"
                :class="{'has-text-danger':imageMark !== (-1)}"
                @click="changeMark(imageMark)"><i class="fas fa-heart"></i></span>
              </a>

          </nav>
        </div>
      </div>
      <div class="media-right">
        <button class="delete" @click.prevent="goBack()"></button>
      </div>
    </article>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      imageData: {},
    };
  },
  computed: {
    image() {
      return this.imageData ? this.imageData : {};
    },
    imageMark() {
      return this.$store.state.markedImages.indexOf(this.image.id);
    },
  },
  methods: {
    loadImage() {
      clearTimeout(this.loadImagesTimer);
      this.loadImagesTimer = setTimeout(() => {
        const api = axios.create({
          baseURL: 'https://api.pexels.com/v1',
          crossDomain: true,
          responseType: 'json',
          headers: {
            Authorization: '563492ad6f91700001000001c6bcce7f3549472d9f001e36d532ad09',
          },
        });
        api.get(`https://api.pexels.com/v1/photos/${this.$route.params.id}`)
          .then((response) => { this.imageData = response.data; });
      }, 0);
    },
    changeMark(imageMark) {
      if (imageMark === (-1)) {
        this.$store.commit(
          'addMarkToImage',
          this.image.id,
        );
      } else {
        this.$store.commit(
          'removeMarkFromImage',
          this.imageMark,
        );
      }
    },
    goBack() {
      this.$router.back();
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadImage();
      },
      immediate: true,
    },
  },
};
</script>
