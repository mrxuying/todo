import React, { Component } from 'react'
import PropTypes from 'prop-types'
import "./index.css"
import Items from '../Items'

export default class List extends Component {

  static propTypes = {
    updateTodo: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
    deleteTodo: PropTypes.func.isRequired
  }
  
  render() {
    const {todos, updateTodo, deleteTodo} = this.props
    return (
        <ul className='todo-main'>
          {
            todos.map((todo, index) => {
              return <Items todo={todo} key={todo.id} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
              // return <Items {...todo} key={todo.id}/>
            })
          }
          
        </ul>
    )
  }
}
