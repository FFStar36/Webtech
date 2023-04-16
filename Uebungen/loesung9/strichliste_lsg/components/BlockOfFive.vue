<template>
    <div>
        <span v-if="index == blockCount">
            <span
                class="partial"
                v-for="n in remainder"
                :key="n">|</span>
        </span>
        <span
            class="full"
            v-if="index < blockCount">||||</span>
    </div>
</template>

<script>
    export default {
        props: {
            index: {
                type: Number,
                required: true
            },
            count: {
                type: Number,
                required: true
            },
            blockCount: {
                type: Number,
                required: true
            }
        },
        computed: {
            remainder: function() {
                return this.count % 5;
            }
        }
    }

</script>

<style scoped>
    div {
        display: inline-block;
        margin: 2px;
    }
    span {
        font-family: monospace;
    }
    .full {
        text-decoration: line-through
    }
</style>