<template>
  <div class="container has-text-centered" tabindex="-1">

    <div class="notification is-danger"
    v-if="loading">Загружаем...</div>

    <div v-else-if="total">Всего фото найдено: {{ total }}</div>

    <div class="notification is-danger"
    v-else>Фото не найдено. Попробуйте ещё раз.</div>

    <ImagesList v-if="images" :images="images"/>

    <button v-if="total"
    type="button" class="button is-primary is-centered mt-4"
    :disabled="!nextPage" @click="gotoNextPage()">NEXT</button>

   <div class="notification is-danger mt-4"
    v-if="addingFail">Сервер не отвечает. Попробуйте ещё раз.</div>

  </div>
</template>

<script>
import ImagesList from '@/components/ImagesList.vue';

export default {
  components: {
    ImagesList,
  },
  computed: {
    imagesData: {
      get() {
        return this.$store.getters.getPhotos(this.query)
          ? this.$store.getters.getPhotos(this.query) : null;
      },
      set(value) {
        this.imagesData = value;
      },
    },
    images: {
      get() {
        return this.imagesData
          ? this.imagesData.photos : [];
      },
      set(value) {
        this.images = value;
      },
    },
    total: {
      get() {
        return this.imagesData
          ? this.imagesData.total : 0;
      },
      set(value) {
        this.total = value;
      },
    },
    nextPage: {
      get() {
        return this.imagesData
          ? this.imagesData.nextPage : 0;
      },
      set(value) {
        this.nextPage = value;
      },
    },
    loading() {
      return this.$store.getters.getFails.loading;
    },
    loadingFail() {
      return this.$store.getters.getFails.loadingFail;
    },
    addingFail() {
      return this.$store.getters.getFails.addingFail;
    },
    query() {
      return this.$route.params.query;
    },
  },
  methods: {
    gotoNextPage() {
      this.$store.dispatch('gotoNextPage', this.$route.params.query);
    },
  },
  created() {
    if (!this.imagesData) {
      this.$store.dispatch('loadImages', this.$route.params.query);
    }
  },
};
</script>
