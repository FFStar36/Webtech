<template>
  <p style="text-align: left" class="mb-0">Search books of author:</p>
  <input type="text" class="form-control mb-3" v-model="searchInput" @keydown="this.testSearch(searchInput)"/>
  <!--  <img src='@/assets/AuthorSearch.jpg' class='img-fluid rounded' alt=''>-->
</template>

<script>
export default {
  name: 'AuthorSearch',
  methods: {
    testSearch(author) {
      this.$emit('select-author', author);
    }
  }, data() {
    return {
      searchInput: ""
    }
  },
  props: ['authorsList']
}
</script>