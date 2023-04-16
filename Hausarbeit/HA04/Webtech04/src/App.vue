<template>
  <div class='container'>
    <tests v-if='testing'></tests>
    <div class='row mb-3'>
      <div class='col'>
        <nav-bar
            ref='navBar'
            :tests-open='testing'
            @toggle-tests='toggleTests'
            @updateTheme='updateTheme'>
        </nav-bar>
      </div>
    </div>

    <div class='row'>
      <div class='col text-center'>
        <author-search ref='authorSearch' v-bind:authorsList="authorsList"
                       @select-author="updateActiveAuthor"></author-search>
        <books-list ref='booksListView' @updateSelectItem="updateSelectedIndex" v-bind:activeAuthor="activeAuthor"
                    v-bind:books="this.filteredBooks.slice(this.page * this.windowSize, (this.page + 1) * this.windowSize)"></books-list>
        <books-list-pagination ref='booksListPagination' @updatePage="updateActivePage"
                               v-bind:page="page" v-bind:maxPages="Math.ceil(this.filteredBooks.length / this.windowSize) - 1"></books-list-pagination>
      </div>
      <div class='col'>
        <book-view v-bind:book="this.filteredBooks.at(this.selectedIndex)"></book-view>
      </div>
    </div>
  </div>
</template>

<script>

import AuthorSearch from './components/AuthorSearch.vue';
import BooksList from './components/BooksList.vue';
import BooksListPagination from './components/BooksListPagination.vue';
import BookView from './components/BookView.vue';
import NavBar from './components/NavBar.vue';
import Tests from './components/Tests.vue';
import books from './assets/books.json'

export default {
  name: 'App',
  components: {
    AuthorSearch,
    BooksList,
    BooksListPagination,
    BookView,
    NavBar,
    Tests
  },
  data() {
    return {
      page: 0,
      windowSize: 5,
      selectedIndex: 0,
      lightThemeUrl: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
      darkThemeUrl: 'https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.3/dist/css/bootstrap-night.min.css',
      testing: false,
      activeAuthor: ""
    };
  },
  computed: {
    booksList() {
      return books
          .map(obj => Object.assign({}, obj)) // copy without references
          .sort((b1, b2) => b1.title.localeCompare(b2.title))
          .map(book => {
            book.authors = book.authors.replaceAll(";", ", ")
            return book
          })
    },
    authorsList() {
      return books
          .map(obj => Object.assign({}, obj)) // copy without references
          .map(bookA => {
            bookA.authors = bookA.authors.split(";")
            return bookA.authors
          })
          .flat() // 2d to 1d
          .map(book => book.trim())
          .sort()
          .filter((item, index, self) => self.indexOf(item) === index)
    },
    filteredBooks() {
      return this.booksList
          .filter((book) => book.authors.toLocaleLowerCase().includes(
              this.activeAuthor.toLocaleLowerCase()
          ));
    }
  },
  methods: {
    toggleTests() {
      this.testing = !this.testing;
    },
    filterFn(book) {
      return book.authors === this.activeAuthor;
    },
    updateTheme() {
      let link = document.getElementById("bootstrap-theme");
      if (link.href == this.darkThemeUrl) {
        link.href = this.lightThemeUrl;
      } else {
        link.href = this.darkThemeUrl;
      }
    },
    updateSelectedIndex(value) {
      this.selectedIndex = value + (this.page * this.windowSize)
    },
    updateActivePage(value) {
      this.page = value
    },
    updateActiveAuthor(value) {
      this.activeAuthor = value
      this.selectedIndex = 0
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
