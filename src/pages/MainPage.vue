<template>
  <div class="container has-text-centered">
    <ImagesList :images="images"/>
    <div class="notification is-danger"
    v-if="$store.state.markedImages == 0">Ни одно фото не отмечено.</div>
    <BasePagination v-model="page" :count="markImages.length" :per-page="imagesPerPage"/>
  </div>
</template>

<script>
import BasePagination from '@/components/BasePagination.vue';
import ImagesList from '@/components/ImagesList.vue';
import axios from 'axios';

export default {
  data() {
    return {
      page: 1,
      imagesPerPage: 3,
      markImages: [],
    };
  },
  computed: {
    images() {
      const offset = (this.page - 1) * this.imagesPerPage;
      return this.markImages ? this.markImages.slice(offset, offset + this.imagesPerPage) : [];
    },
  },
  components: {
    BasePagination,
    ImagesList,
  },
  methods: {
    loadMarkedImages() {
      const api = axios.create({
        baseURL: 'https://api.pexels.com/v1',
        crossDomain: true,
        responseType: 'json',
        headers: {
          Authorization: '563492ad6f91700001000001c6bcce7f3549472d9f001e36d532ad09',
        },
      });
      for (let i = 0; i < this.$store.state.markedImages.length; i += 1) {
        api.get(`https://api.pexels.com/v1/photos/${this.$store.state.markedImages[i]}`)
          .then((response) => this.markImages.push(response.data));
      }
    },
  },
  created() {
    this.loadMarkedImages();
  },
};
</script>
