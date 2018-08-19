import React from 'react'

const TodoInput = (props) => {
    return <div>
        <input 
          className='my-4 form-control' 
          type='text' 
          placeholder='Add todo'
          onChange={props.titleChange}
          value={props.newTitle}>
        </input>

        <input 
          className='my-4 form-control' 
          type='text' 
          placeholder='Description'
          onChange={props.descriptionChange}
          value={props.newDescription}>
        </input>

        <input 
          className='my-4 form-control' 
          type='date' 
          placeholder='Date'
          onChange={props.dateChange}
          value={props.newDate}>
        </input>

          <button 
            className='btn-primary mb-3 form-control'
            onClick={props.editing ? props.updateTodo : props.addTodo}
            disabled={props.newTitle === ''}>
            {props.editing ? 'UPDATE TO DO NEW' : 'ADD TODO NEW'}
          </button>

        </div>
}

export default TodoInput