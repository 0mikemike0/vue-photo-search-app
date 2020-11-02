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
import { mapGetters } from 'vuex';

export default {
  components: {
    ImagesList,
  },
  computed: {
    ...mapGetters([
      'getPhotos',
      'getFails',
    ]),
    imagesData() {
      return this.getPhotos(this.query) ? this.getPhotos(this.query) : null;
    },
    images() {
      return this.imagesData ? this.imagesData.photos : [];
    },
    total() {
      return this.imagesData ? this.imagesData.total : 0;
    },
    nextPage() {
      return this.imagesData ? this.imagesData.nextPage : 0;
    },
    loading() {
      return this.getFails.loading;
    },
    loadingFail() {
      return this.getFails.loadingFail;
    },
    addingFail() {
      return this.getFails.addingFail;
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
