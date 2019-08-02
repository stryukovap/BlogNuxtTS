<template>
    <div class="text-xs-center">
                   <v-pagination
                     v-model="currentPage"
                     :length="length"
        ></v-pagination>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "nuxt-property-decorator"
    import {State} from "vuex-class"

    @Component({
        computed: {
            length: {
                get() {
                    return this.$store.state.length
                },
                set() {
                    this.$store.dispatch('mathLengthPagination')
                }
            },
            currentPage: {
                get() {
                    return this.$store.state.currentPage
                },
                set(value) {
                    this.$store.dispatch('changeCurrentPage', value);
                }
            }
        }
    })
    export default class Pagination extends Vue {

    }

</script>
