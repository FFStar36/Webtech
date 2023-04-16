<template>
    <div class="row p-3 justify-content-center">
        <label for="depselect" class="mr-3">Departure:</label>
        <select id="depselect" v-model="depSelected">
            <option v-for="dep in departures" :key="dep" :value="dep">{{dep}}</option>
        </select>

        <div class="mx-5">
            <input type="checkbox" id="squeezyjet" value="SqueezyJet" v-model="airSelected">
            <label for="squeezyjet" class="mr-3">SqueezyJet</label>
            <input type="checkbox" id="brianair" value="BrianAir" v-model="airSelected">
            <label for="brianair" class="mr-3">BrianAir</label>
            <input type="checkbox" id="axelairways" value="AxelAirways" v-model="airSelected">
            <label for="axelairways">AxelAirways</label>
        </div>

        <button @click="getFlights" class="col-2">Get Flights</button>
    </div>
</template>

<script>

export default {
    name: 'SearchForm',

    data: () => { 
        return {
            depSelected: 'BERLIN',
			departures: [
				'BERLIN',
				'DUBLIN',
				'LONDON'
			],
			airSelected: [
				'SqueezyJet',
				'BrianAir',
				'AxelAirways'
			],
			airlines: [
				'SqueezyJet',
				'BrianAir',
				'AxelAirways'
			]
        }
    },

    emits: ['results'],

    methods: {
        getFlights: function() {
            var params = '';
            var url = '/flights';
            
            for(let airline of this.airSelected) {
                params += (airline.toLowerCase() + '=true&');
            }
            
            params += 'dep=' + this.depSelected;
            url += '?' + params;
            
            console.log(url);

            fetch(url)
            .then(res => res.json())
            .then(res => this.$emit('results', res))
            .catch(() => this.$emit('results', []))
        }
    }
}
</script>