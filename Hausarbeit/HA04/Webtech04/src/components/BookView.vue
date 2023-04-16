<template>
  <!--  <img src='@/assets/BookView.jpg' class='img-fluid rounded' alt=''>-->
  <div class="card">
    <div class="card-body">
      <img :src=book.thumbnail class='card-img-top rounded mx-auto d-block' id="book-image" alt='Thumbnail'
           style="width: 10rem;">
      <div v-if="book.subtitle.length == 0" id="book-title"> {{ book.title }}</div>
      <div v-else id="book-title"> {{ book.title }} - {{ book.subtitle }}</div>
    </div>
    <div id="book">
      <div v-for="(value, key) in Object.keys(book)
  .filter(key => key != 'thumbnail' && key != 'title' && key != 'subtitle' )
  .sort().reduce(
  (obj, key) => {
    obj[key] = book[key];
    return obj;
  },
  {}
)" :key="key">
        <div class="card">
          <div class="card-text">
          <span class="fw-bold">
            {{ key }} :
          </span>
            <span class="book-property">{{ value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookVue',
  props: {
    book: {
      type: Object
    }
  }
}
</script>