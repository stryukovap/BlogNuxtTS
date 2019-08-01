import {Layout, RootState} from "../types";
import {ActionTree, MutationTree} from "vuex";


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
});

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
};
export const actions: ActionTree<RootState, RootState> = {
    async GET(context, {url, query}) {
        return await this.$axios.$get(url, {
            params: query || {}
        })
    },
    mathLengthPagination: function (context) {
        const count: number = Math.floor(context.state.quantity / context.state.limit);
        context.commit('length', count);
    },
    async changeCurrentPage(context, payload: number) {
        context.commit('currentPage', payload);
        const count = context.state.limit * (context.state.currentPage - 1);
        context.commit('offset', count);
        await context.dispatch('getList');
    },
    async getList(context) {
        try {
            const data: any = await context.dispatch('GET',
                {url: `${BASE_URL}pokemon?offset=${context.state.offset}&limit=${context.state.limit}`},
                {root: true});
            context.commit('quantity', data.count);
            context.dispatch('mathLengthPagination');
            if (data) {
                const result: any = await Promise.all(
                    data.results.map((item: { url: string; }) => {
                        return context.dispatch('GET',
                            {url: item.url},
                            {root: true})
                    })
                );
                return context.commit('list', result);
            }
        } catch (e) {
            console.log(e)
        }
    },
    async getPokemonById(context, payload: number) {
        try {
            const data = await context.dispatch('GET',
                {url: `${BASE_URL}pokemon/${context.state.currentPokemon.id || payload}`},
                {root: true});
            return context.commit('currentPokemon', data);
        } catch (e) {
            console.log(e)
        }
    },
    async changeLimit(context, payload: number) {
        context.commit('limit', payload);
        return await context.dispatch('getList')
    },
    async getPokemonSpecies(context) {
        try {
            const data: any = await context.dispatch('GET',
                {url: `${context.state.currentPokemon.species.url}`},
                {root: true});
            return await context.commit('currentPokemonSpecies', data);
        } catch (e) {
            console.log(e)
        }
    },
    async getPokemonLocation(context) {
        try {
            const data: any = await context.dispatch('GET',
                {url: `${context.state.currentPokemon.location_area_encounters}`},
                {root: true});
            return await context.commit('currentPokemonLocation', data);
        } catch (e) {
            console.log(e)
        }
    }
};
