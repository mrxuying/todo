import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import "./index.css"


export default class Header extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }

  handleKeyUp = (event) => {
    // if(event.keyCode !== 13) return
    // console.log(event.target.value)
    const {keyCode, target} = event
    if(keyCode !== 13) return
    if(target.value.trim() === ""){
      alert("title can't be none")
      return
    }
    const todo = {id: nanoid(), title: event.target.value, status: false}
    this.props.addTodo(todo)
    target.value = ''
  }

  render() {
    return (
      <div className='todo-header'>
        <input type="text" onKeyUp={this.handleKeyUp} placeholder="please type your plans, enter to complete" />
      </div>
    )
  }
}
