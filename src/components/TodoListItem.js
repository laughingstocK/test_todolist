import React from 'react'


const TodoListItem = (props) => {
    return <div>
        <li className={
          props.item.status ? 
          'list-group-item list-group-item-success list-group-item-action flex-column align-items-start mb-2' : 
          'list-group-item list-group-item-secondary list-group-item-action flex-column align-items-start mb-2'}>
          <div className="d-flex w-100 justify-content-between">
              <h4 className="mb-1">{props.item.title}</h4>
              <small className="text-muted">{new Date(props.item.date).toJSON().slice(0,10)}</small>
            </div>
          <div>
            <p>{props.item.description}</p>
          </div>
            <div className="d-flex flex-row-reverse w-100">
              <button 
                className='btn-sm ml-2 btn btn-danger'
                onClick={() => props.deleteTodo(props.index)}>
                Delete
              </button>
              <button 
                className='btn-sm ml-2 btn btn-info'
                onClick={() => props.editTodo(props.index)}>
                  Update
              </button>
                <button 
                className='btn-sm ml-2 btn btn-success'  
                onClick={() => props.doneTodo(props.index)}
                disabled={props.status.status}>                
                Done
              </button>
            </div>
          </li>
    </div>
}

export default TodoListItem