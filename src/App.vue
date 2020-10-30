<template>
  <div class="hero is-light is-fullheight">
    <header>
      <nav class="navbar has-background-warning is-fixed-top"
      role="navigation" aria-label="main navigation">

            <MarkIndicator />

            <ImageFilter />

      </nav>
    </header>
    <main class="hero-body mt-6 pt-6 is-light">
      <router-view/>
    </main>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Photos provided
          <a href="https://www.pexels.com">by Pexels</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import MarkIndicator from './components/MarkIndicator.vue';
import ImageFilter from './components/ImageFilter.vue';

export default {
  components: {
    MarkIndicator,
    ImageFilter,
  },
  created() {
    this.$store.commit('updateMarkImages');
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.footer {
  padding: 1rem;
  background-color: #ffdd57;
}
</style>
