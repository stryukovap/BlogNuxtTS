import {Layout, RootState} from "../types";
import {MutationTree, ActionTree} from "vuex";

const BASE_URL: string = 'https://pokeapi.co/api/v2/';

export const state = (): RootState => ({
  layout: {
    listLayout: 'xs12',
    cardList: 'row'
  },
  list: [],
  offset: 0,
  limit: 10,
  limitList: [10, 20, 30],
  quantity: 0,
  length: 0,
  currentPage: 1,
  currentPokemon: {}
})

export const mutations: MutationTree<RootState> = {
  layout(state: RootState, payload: Layout) {
    return state.layout = payload;
  },
  quantity(state: RootState, payload: number) {
    return state.quantity = payload;
  },
  list(state: RootState, payload: any) {
    return state.list = payload;
  },
  offset(state: RootState, payload: number) {
    return state.offset = payload;
  },
  limit(state: RootState, payload: number) {
    return state.limit = payload;
  },
  length(state: RootState, payload: number) {
    return state.length = payload;
  },
  currentPage(state: RootState, payload: number) {
    return state.currentPage = payload;
  },
  currentPokemon(state: RootState, payload) {
    return state.currentPokemon = payload;
  },
  currentPokemonId(state: RootState, payload: number) {
    return state.currentPokemon.id = payload;
  },
  currentPokemonSpecies(state: RootState, payload: any) {
    return state.currentPokemon.species = payload;
  },
  currentPokemonLocation(state: RootState, payload: any) {
    return state.currentPokemon.location_area_encounters = payload;
  }
}

export const actions: ActionTree<RootState, RootState> = {}
