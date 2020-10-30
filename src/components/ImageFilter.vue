<template>
  <div class="field navbar-item">
    <button class="delete is-small" @click.prevent="clear()"></button>
    <p class="control">
      <input class="input" type="text" placeholder="что ищем?"
      v-model="currentQuery" @keydown.enter="search()">
    </p>
    <button type="submit" class="button is-primary" @click.prevent="search()">Найти</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      currentQuery: '',
    };
  },
  watch: {
    '$route.path': {
      handler() {
        if (this.$route.name === 'main') {
          this.clear();
        }
      },
    },
  },
  methods: {
    search() {
      if (this.$route.path === `/search/${this.currentQuery}`) {
        this.$store.dispatch('loadImages', this.currentQuery);
      } else {
        this.$store.dispatch('loadImages', this.currentQuery);
        this.$router.push({ name: 'query', params: { query: this.currentQuery } });
      }
    },
    clear() {
      this.currentQuery = '';
    },
  },
};
</script>

<style lang="scss" scoped>

.field {
  position: relative;
}

.navbar-item {
  display: flex;
}

.delete {
  position: absolute;
  top: 20px;
  right: 100px;
  z-index: 10;
}

</style>
