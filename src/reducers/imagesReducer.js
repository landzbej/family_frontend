import { createSlice } from '@reduxjs/toolkit'

const initialState = []
const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImages(state, action) {
      return action.payload
    }
  }
})

export const { setImages } = imageSlice.actions

export default imageSlice.reducer