import React from 'react'

const TodoInput = (props) => {
    return <div>
        <input 
          className='my-4 form-control' 
          type='text' 
          placeholder='Title'
          onChange={props.titleChange}
          value={props.newTitle}>
        </input>

        <textarea 
          className='my-4 form-control' 
          type='text' 
          placeholder='Description'
          onChange={props.descriptionChange}
          value={props.newDescription}>
        </textarea>

        <input 
          className='my-4 form-control' 
          type='date' 
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