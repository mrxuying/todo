// import { useState } from 'react';
// import PropTypes from 'prop-types'
import './App.css';
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';
import React, { Component } from 'react'

export default class App extends Component {

  state = {todos: [
    {id: 1, title: 'coding', status: false},
    {id: 2, title: 'sleep', status: false},
    {id: 3, title: 'breakfast', status: false},
    {id: 4, title: 'dinner', status: true},
  ]}

  addTodo = (todo) => {
    // this.setState({todos: [todo, ...this.state.todos]})
    const {todos} = this.state
    const newTodos = [todo, ...todos]
    this.setState({todos: newTodos})
    
  }

  updateTodo = (id, checked) => {
    //解构赋值
    const {todos} = this.state
    //使用map遍历todos列表
    const newTodos = todos.map((todo) => {
      //通过id找到原来的数据，找到则更新status
      if(todo.id === id){
        //解构todo对象，更新status为checked
        return {...todo, status: checked}
      }else{
        //没找到则返回原todo对象
        return todo
      }
    })
    //将修改后的todos数组状态更新为新的数组newTodos，驱动页面更新
    this.setState({todos: newTodos})
  }

  deleteTodo = (id) => {
    const {todos} = this.state
    const newTodos = todos.filter((todo) => {
      return todo.id !== id
    })
    this.setState({todos: newTodos})
  }

  updateAllTodos = (checked) => {
    const {todos} = this.state
    const newTodos = todos.map((todo) => {
      return {...todo, status: checked}
    })
    this.setState({todos: newTodos})
  }

  clearAllDone = () => {
    const {todos} = this.state
    const newTodos = todos.filter((todo) => {
      return !todo.status
    })
    this.setState({todos: newTodos})
  }

  render() {
    return (
      <div className="todo-container">
        <div className='todo-wrap'>
          <Header addTodo={this.addTodo}/>
          <List todos = {this.state.todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
          <Footer updateAllTodos={this.updateAllTodos} todos={this.state.todos} clearAllDone={this.clearAllDone}/>
        </div>
      </div>
    )
  }
}


// function App() {
//   const {todos, setTodos} = useState([])
//   setTodos([
//     {id: 1, title: 'coding', status: false},
//     {id: 2, title: 'sleep', status: false},
//   ])

//   const addTodo = (todo) => {
//     setTodos([todo, ...todos])
//   }

//   return (
//     <div className="todo-container">
//       <div className="todo-container">
//         <div className='todo-wrap'>
//           <Header addTodo={addTodo}/>
//           <List todos = {todos}/>
//           <Footer/>
//         </div>
//        </div>
      
//     </div>
//   );
// }

// export default App;
