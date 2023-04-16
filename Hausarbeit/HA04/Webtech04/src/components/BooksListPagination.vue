<style>
#pagination-next-button, #pagination-back-button {
  margin-top: 3rem;
  margin-left: 1rem;
}
</style>
<template>
  <button class="btn btn-primary shadow-none" id="pagination-next-button" @click="updateSelectedPage(currentPage++)"
          v-bind:class="{disabled :  this.page >= maxPages }">Weiter
  </button>
  <button class="btn btn-secondary shadow-none" id="pagination-back-button"
          @click="(currentPage-- <= 0) ? updateSelectedPage(0) : updateSelectedPage(currentPage)"
          v-bind:class="{disabled : this.page <= 0}">Zurück
  </button>
  <!--    <img src='@/assets/BooksListPagination.jpg' class='img-fluid rounded' alt=''>-->
</template>
<script>
export default {
  emits: ["updatePage"],
  props: {
    page: {
      type: Number,
      required: true
    },
    maxPages:{
      type:Number
    }
  },
  data() {
    return {
      currentPage: this.page
    }
  },
  name: 'BooksListPagination',
  methods: {
    updateSelectedPage() {
      this.$emit("updatePage", this.currentPage)
    }
  }
}
</script>