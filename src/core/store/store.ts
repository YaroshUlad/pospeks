import { configureStore } from '@reduxjs/toolkit'

import { reducer } from '@/core/store/reducer'
import { middleware } from '@/core/store/middleware'

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
})

export type AppStore = typeof store
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
