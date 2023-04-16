<template>
  <nav class='navbar navbar-light bg-light border rounded mt-2'>
    <div class='container-fluid'>

      <a class='navbar-brand' href='#'>
        <i class='bi bi-book-half'></i>
        HAUSAUFGABE 4
      </a>

      <div>
        <button id="btn-dark-mode" class="btn btn-dark me-3" @click="toggleDarkMode()">{{ buttonText }}</button>
        <!--        <img src='@/assets/ButtonDarkMode.jpg' width='114' class='rounded float-end' alt=''>-->
        <button class='btn btn-primary me-3' type='submit' @click='toggleTests'>
          <i class='bi bi-robot'></i>
          {{ (!testsOpen) ? "Run tests" : "Close tests" }}
        </button>
      </div>

    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: ['testsOpen'],
  methods: {
    toggleDarkMode() {
      if (this.buttonText == "Lights off") {
        this.buttonText = "Lights on"
      } else this.buttonText = "Lights off"
      this.$emit("updateTheme");
    },
    toggleTests() {
      this.$emit('toggle-tests');
    }
  },
  data() {
    return {
      buttonText: "Lights off"
    }
  }
}
</script>