<template>
    <div>
        <h2>{{metadata.title}}</h2>
        <div id="tally-body">
            <button @click="metadata.count += 1">+</button>
            {{metadata.count}}
            <button @click="metadata.count > 0 ? metadata.count -= 1 : metadata.count -= 0">-</button>

            <block-of-five
                v-for="n in blockCount"
                :key="n" 
                :index="n"
                :blockCount="blockCount"
                :count="metadata.count" />
        </div>
    </div>
</template>

<script>
    import BlockOfFive from './BlockOfFive.vue'
        
    export default {
        components: {
            BlockOfFive
        },
        props: {
            metadata: {
                type: Object,
                required: true
            }
        },
        computed: {
            blockCount: function() {
                return Math.floor(this.metadata.count / 5) + 1
            }
        }
    }
</script>