<template>
  <nav class='navbar navbar-dark bg-dark rounded mt-2 border border-secondary'>
    <div class='container'>
      <span class='navbar-brand mb-0 h1'>
        <i class="bi bi-cloud-drizzle-fill"></i>
        Hausaufgabe 6
      </span>

      <button class='btn btn-light' type='submit' @click='toggleTests'>
        <i class='bi bi-robot'></i>
        {{ (!testsOpen) ? "Run tests" : "Close tests" }}
      </button>      
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: ['testsOpen'],
  methods: {
    toggleTests() {
      this.$emit('toggle-tests');
    }    
  }  
}
</script>