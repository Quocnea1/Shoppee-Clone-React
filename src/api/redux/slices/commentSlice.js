import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  itemNumber: null,
}

const comments= createSlice({
  name: 'comments',
  initialState,
  reducers: {
    updateList: (state, actions) => {
      state.list = actions.payload.list;
      state.itemNumber = actions.payload.itemNumber;
    },
    resetList: () => initialState
  }
})

const {reducer, actions} = comments
export const commentActions = actions
export default reducer