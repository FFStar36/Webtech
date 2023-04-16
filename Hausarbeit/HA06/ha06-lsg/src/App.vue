<template>
  <div class='container'>
    <tests v-if='testing'></tests>

    <div class='row'>
      <div class='col'>
        <nav-bar
          :tests-open='testing'
          @toggle-tests='toggleTests'>
        </nav-bar>
      </div>
    </div>
    <div class='row mt-2'>
    </div>

  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Tests from './components/Tests.vue';
import axios from 'axios';

const serverUrl = 'http://localhost:8000';

export default {
  name: 'App',
  components: {
    NavBar,
    Tests
  },
  data() {
    return {
      testing: false,
    }
  },
  methods: {
    toggleTests() {
      this.testing = !this.testing;
    },
    get(path) {
      axios
        .get(serverUrl + path)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
  }
}
</script>

<style>
body { 
  background: url('assets/bg.jpg') no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@import'~bootstrap/dist/css/bootstrap.css'
</style>
