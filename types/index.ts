export interface RootState {
  layout: Layout,
  list: any[],
  offset: number,
  limit: number,
  limitList: number[],
  quantity: number,
  length: number,
  currentPage: number,
  currentPokemon: any
}

export interface Layout {
  listLayout: string,
  cardList: string
}
