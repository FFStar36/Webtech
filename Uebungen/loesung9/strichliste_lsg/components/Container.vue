<template>
    <div>
        <input
            type="text"
            v-model="nextTitle"
            placeholder="Create new Tally"
            @keydown.enter="addTally" />

        <tally 
            v-for="entry in tallyData"
            :key="entry.id"
            :metadata="entry" />
    </div>
</template>

<script>
    import Tally from './Tally.vue'
    
    let nextId = 0
    
    export default {
        components: {
            Tally
        },
        data () {
            return {
                nextTitle: '',
                tallyData: [
                    {
                        id: nextId++,
                        title: 'UFO Sightings',
                        count: 0
                    },
                    {
                        id: nextId++,
                        title: 'Birds killed with one stone',
                        count: 2
                    },
                    {
                        id: nextId++,
                        title: 'Days studied for WebTech exam',
                        count: 0
                    }
                ]
            }
        },
        methods: {
            addTally () {
                const trimmedTitle = this.nextTitle.trim()
                if (trimmedTitle) {
                    this.tallyData.push({
                        id: nextId++,
                        title: trimmedTitle,
                        count: 0
                    })
                    this.nextTitle = ''
                }
            }
        }
    }
</script>