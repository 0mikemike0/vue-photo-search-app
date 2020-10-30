<template>
  <router-link :to="{name: 'main'}" class="goto-main is-text px-5">
    <span class="icon has-text-danger px-4">
      <i class="fa fa-lg fa-heart" aria-hidden="true"></i>
    </span>
    <span class="marked-amount">{{ $store.state.markedImages.length }}</span>
  </router-link>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.marked-amount {
  font-size: 20px;
}
.goto-main {
  outline: none;
    @media (max-width: 417px) {
      margin-top: 15px;
    }
}

</style>
