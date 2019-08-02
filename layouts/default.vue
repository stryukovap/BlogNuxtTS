<template>
  <v-app>
    <v-toolbar class="toolbar" color="green" :flat="true">
      <v-toolbar-title>My Pokemons</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select class="toolbar__select"
                v-model="limit"
                :items="limitList"
      ></v-select>
      <v-spacer></v-spacer>
      <v-icon v-show="listLayout" @click="toggleLayout">fas fa-list</v-icon>
      <v-icon v-show="!listLayout" @click="toggleLayout">fas fa-th-large</v-icon>
      <v-spacer></v-spacer>
      <v-icon @click="goBack">fas fa-arrow-left</v-icon>
    </v-toolbar>
    <nuxt/>
    <v-footer color="green">
      <v-layout
        align-center
        justify-center
      >
        <div>KeepSolid Summer Internship &copy; {{ new Date().getFullYear() }}</div>
      </v-layout>
    </v-footer>
  </v-app>
</template>
<style>
  .toolbar__select {
    width: 50px;
  }
</style>
<script lang="ts">
    import {Component, Vue} from "nuxt-property-decorator"
    import {State} from "vuex-class"

    @Component({
        async fetch({store, params}) {
            await store.dispatch('getList', {root: true});
        },
        computed: {
      limit: {
        get() {
          return this.$store.state.limit
        },
        set(value:number) {
          this.$store.dispatch('changeLimit', value);
        }
      }
    }
    })

    export default class extends Vue {
      listLayout:boolean= true
       toggleLayout() {
        if (this.listLayout) {
          this.$store.commit('layout', {
            listLayout: 'xs12',
            cardList: 'row'
          });
        } else {
          this.$store.commit('layout', {
            listLayout: 'xs6',
            cardList: 'column'
          });
        }
        this.listLayout = !this.listLayout;
      }
      goBack() {
        this.$router.go(-1);
      }
      @State limitList!:number
    }
</script>

