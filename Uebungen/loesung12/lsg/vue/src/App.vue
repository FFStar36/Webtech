<template>
	<search-form @results="onResults"></search-form>
	<search-results :results = results></search-results>
</template>

<script>
import SearchForm from './components/SearchForm.vue';
import SearchResults from './components/SearchResults.vue';

export default {
	name: 'App',
	
	components: {
		SearchForm,
		SearchResults
	},

	data: () => { 
		return {
			results: []
		}
	},

	methods: {
		onResults: function(results) {
			this.results = results
		}
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
input {
	margin-right: 1em;
}
</style>
