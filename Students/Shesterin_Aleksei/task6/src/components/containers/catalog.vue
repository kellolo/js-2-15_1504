<template>
    <div class="products">
        <item v-for="item of items" :key="item.product_id" :type="'catalog '">

        </item>
    </div>
</template>

<script>
    import item from "../components/item.vue";
    export default {
        name: "catalog",
        components: {
            item: item
        },
        data() {
            return {
                items: [],
                url: ''
            }
        },
        methods: {

        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>