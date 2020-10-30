<template>
  <nav class="pagination is-rounded is-centered mt-3" role="navigation" aria-label="pagination">
    <a v-if="count" class="pagination-previous" @click.prevent="paginatePrev(page)"
    :disabled="isPrevButtonDisabled">
    <span class="icon has-text-primary">
      <i class="fas fa-arrow-left"></i>
    </span></a>
    <a v-if="count" class="pagination-next" @click.prevent="paginateNext(page)"
    :disabled="isNextButtonDisabled">
      <span class="icon has-text-primary">
        <i class="fas fa-arrow-right"></i>
      </span>
    </a>
    <ul class="pagination-list">
      <li v-for="pageNumber in pagesAmount" :key="pageNumber">
        <a class="pagination-link"
        :class="{'is-current': pageNumber === page}"
        @click="paginate(pageNumber)" aria-label="Goto page pageNumber">{{ pageNumber }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pagesAmount() {
      return Math.ceil(this.count / this.perPage);
    },
    isPrevButtonDisabled() {
      return this.page === 1;
    },
    isNextButtonDisabled() {
      return this.page === this.pagesAmount;
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    paginateNext(page) {
      if (page === this.pagesAmount) return;
      this.$emit('paginate', (page + 1));
    },
    paginatePrev(page) {
      if (page === 1) return;
      this.$emit('paginate', (page - 1));
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-link.is-current {
  background-color: #00c4a7;
  border-color: #00c4a7;
}
</style>
