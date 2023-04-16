<style>
.card-text {
  text-align: left;
  font-size: 15px;
}

.book-title {
  font-weight: bold;
}

</style>

<template>
  <div id="books">
    <div class="book" v-for="(book,index) in books" :key="index">
      <div class="card" style="width: 100%">
        <div class="card-body" @click="selectItem(index)">
          <div class="card-text">
            <div class="book-title">{{ book.title }}</div>
            <div class="book-authors">{{ book.authors }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  <img src='@/assets/BooksList.jpg' class='img-fluid rounded' alt=''>-->
</template>

<script>
export default {
  data() {
    return {
      childSelectedIndex: this.value
    }
  },
  name: 'BooksList',
  props: {
    books: {
      type: Array,
    },
    value: {
      type: Number,
    },
    activeAuthor: {
      type: String,
    }
  },
  methods: {
    selectItem(position) {
      this.$emit("updateSelectItem", position);
    }
  }
}
</script>
