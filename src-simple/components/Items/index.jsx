import React, { Component } from 'react'
import "./index.css"

export default class Items extends Component {

  state = {mouse: false}  

  handleMouseEvent = (flag) => {
    return () => {
      this.setState({mouse: flag})
    }
  }

  handleCheck = (id) => {
    return (event) => {
      this.props.updateTodo(id, event.target.checked)
    }
    
  }

  handleDelete = (id) => {
    const {deleteTodo} = this.props
    deleteTodo(id)
  }

  render() {
    const {todo} = this.props
    // const {id, title, status} = this.props
    return (
      <li style={{backgroundColor: this.state.mouse ? '#ddd' : 'white'}} onMouseEnter={this.handleMouseEvent(true)} onMouseLeave={this.handleMouseEvent(false)}>
        <label>
          <input type="checkbox" checked={todo.status} onChange={this.handleCheck(todo.id)}/>
          <span>{todo.title}</span>
        </label>
        <button onClick={() => {this.handleDelete(todo.id)}} type="button" className='btn btn-danger' style={{display: this.state.mouse ? 'block' : 'none'}}>Delete</button>
      </li>
    )
  }
}
