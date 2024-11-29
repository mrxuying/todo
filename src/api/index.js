import http from "./api";

export const getTaskList = (state=0) => {
  return http.get('/getTaskList', {
    params: {state}
  })
}

export const addTask = (taskObj) => {
  return http.post('/addTask', {
    ...taskObj
  })
}

export const removeTask = (id) => {
  return http.get('/removeTask',{
    params: {id}
  })
}

export const completeTask = (id) => {
  return http.get('/completeTask',{
    params: {id}
  })
}