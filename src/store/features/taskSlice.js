/* 切片 */
import {createSlice} from '@reduxjs/toolkit'
import { getTaskList } from '../../api'

const taskSlice = createSlice({
  name: 'task',
  //初始状态
  initialState: {
    taskList: null
  },
  //公共状态修改的方法
  reducers: {
    setTaskList(state, action) {
      //state:公共状态， 基于immer库管理，不需克隆
      //action: 传递的参数都以action.payload接收
      state.taskList = action.payload
    },

    deleteTask(state, {paload}) {
      let taskList = state.taskList
      if(!Array.isArray(taskList)) return
      state.taskList = taskList.filter((item) => {
        return +item.id !== +paload
      })
    },
    
    updateTask(state, {payload}){
      let taskList = state.taskList
      if(!Array.isArray(taskList)) return
      state.taskList = taskList.map((item) => {
        if(+item.id === +payload) {
          item.state = 2
          item.completeTime = new Date().toLocaleDateString('zh-CN')
        }
        return item
      })
    }

  }

})

//这里结构的是action，并不是reducer
export let {setTaskList, deleteTask, updateTask} = taskSlice.actions

//实现异步派发action
export const getTaskListAsync = (state=0) => {
  return async dispatch => {
    let list = []
    //请求服务器，获取数据
    try {
      let result = await getTaskList(state)
      if(+result.code === 0){
        list = result.list
      }
    } catch (error) {}
    //派发action，修改公共状态
    dispatch(setTaskList(list))
  }
}

export default taskSlice.reducer