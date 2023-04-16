<template>
    <div>
		<table class="table" v-if="results.length > 0">
			<thead>
				<tr>
					<th scope="col">Airline</th>
					<th scope="col">Flight #</th>
					<th scope="col">From</th>
					<th scope="col">To</th>
					<th scope="col">Date</th>
					<th scope="col">Time</th>
				</tr>
				<tr v-for="flight in results" :key="flight.num">
					<td>{{flight.airline}}</td>
					<td>{{flight.num}}</td>
					<td>{{flight.dep}}</td>
					<td>{{flight.dest}}</td>
					<td>{{flight.date}}</td>
					<td>{{flight.time}}</td>
				</tr>
			</thead>
		</table>
	</div>
</template>
  
<script>
export default {
	name: 'SearchResults',

	props: {
		results: {
			type: Array,
			required: true
		}
	}
}
</script>
  