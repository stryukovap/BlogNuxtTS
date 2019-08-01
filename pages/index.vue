<template>
  <v-container grid-list-md>
    <v-layout wrap>
      <v-flex :class="`${layout.listLayout}`" v-for="(item,index) in list" :key="index">
        <Card :height="item.height"
              :weight="item.weight"
              :base_experience="item.base_experience"
              :id="item.id"
              :name="item.name"
              :front_default="item.sprites.front_default"
              :back_default="item.sprites.back_default"/>
      </v-flex>
    </v-layout>
    <pagination></pagination>
  </v-container>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from "nuxt-property-decorator"
    import {State} from "vuex-class"
    import {Layout} from "../types";
    import Pagination from "../components/Pagination.vue";
    import Card from "../components/Card.vue";

    @Component({
        components: {
            Card, Pagination
        },
        async fetch({store, params}) {
            await store.dispatch('getList', {root: true});
        }
    })

    export default class extends Vue {
        @State list: any;
        @State layout: Layout
    }
</script>
