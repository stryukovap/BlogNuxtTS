<template>
    <div class="text-xs-center">
        <!--    <v-pagination-->
        <!--      v-model="currentPage"-->
        <!--      :length="length"-->
        <!--    ></v-pagination>-->
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "nuxt-property-decorator"
    import {PropSync} from "vue-property-decorator";

    @Component({})
    export default class Pagination extends Vue {
        @PropSync('length', {type: Number}) length!: number
    }

</script>
