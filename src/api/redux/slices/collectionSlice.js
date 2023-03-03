import { createSlice } from '@reduxjs/toolkit'

const collection= createSlice({
  name: 'collection',
  initialState: {
    itemCount: 0,
    list: [],
    currentProductType: [],
    currentPage: null,
    limit: 12,
  },
  reducers: {
    updateList: (state, action) => {
      state.list = action.payload.list
      state.currentPage = action.payload.currentPage
      state.itemCount = action.payload.itemCount
      state.limit = action.payload.limit
    },
    updateCurrentType: (state, action) => {
      state.currentProductType = action.payload
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  }
})

const {reducer, actions} = collection
export const collectionActions = actions
export default reducer