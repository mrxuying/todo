import React, { Component } from 'react'
import PropTypes from 'prop-types'
import "./index.css"

export default class Footer extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    updateAllTodos: PropTypes.func.isRequired,
    clearAllDone: PropTypes.func.isRequired
  }

  handleAllDone = (event) => {
    const {updateAllTodos} = this.props
    updateAllTodos(event.target.checked)
  }

  handleClear = () => {
    const {clearAllDone} = this.props
    clearAllDone()
  }

  render() {

    // const {todos, updateAllTodos, clearAllDone} = this.props
    const {todos} = this.props
    //done count
    const doneCount = todos.reduce((pre,current) => {return pre + (current.status ? 1 : 0)}, 0)
    //total
    const total = todos.length
    return (
      <div className='todo-footer'>
        {/* <input type="checkbox" id='chooseall' 
          checked={doneCount === total && total!==0 ? true : false} 
          onChange={(event) => {updateAllTodos(event.target.checked)}}/> */}
        <input type="checkbox" id='chooseall' 
          checked={doneCount === total && total!==0 ? true : false} 
          onChange={this.handleAllDone}/>
        <label>Done{doneCount}/All{total}</label>
        <button onClick={this.handleClear} type="button" className='btn btn-danger'>Clear</button>
      </div>
    )
  }
}
