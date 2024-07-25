import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DateFilterSliceState = {
  min: string | null
  max: string | null
}

const initialState: DateFilterSliceState = {
  min: null,
  max: null,
}

export const dateFilterSlice = createSlice({
  name: 'dateFilterSlice',
  reducers: {
    setMinDate: (state, action: PayloadAction<string | null>) => {
      state.min = action.payload
    },
    setMaxDate: (state, action: PayloadAction<string | null>) => {
      state.max = action.payload
    },

    resetDateFilter: (state) => {
      state.max = null
      state.min = null
    },
  },
  initialState,
})

export const { setMinDate, setMaxDate, resetDateFilter } = dateFilterSlice.actions
