<template>
    <div>
        <template v-if="type='catalog'">

        </template>
        <template  v-if="type='basket'">

        </template>
    </div>
    
</template>

<script>
    export default {
        name: "item",
        props: ['type']
    }
</script>

<style scoped>

</style>