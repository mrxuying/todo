import { configureStore } from '@reduxjs/toolkit'
import reduxLogger from 'redux-logger'
import {thunk} from 'redux-thunk'
import taskSliceReducer from './features/taskSlice'

const store = configureStore({
  reducer: {
    task: taskSliceReducer,
  },
  //如果没有制定中间件则默认集成reduxLogger, reduxThunk
  middleware: () => [reduxLogger, thunk]
})
export default store