import React from 'react'
import TodoListItem from './TodoListItem'

const TodoList = (props) => {
    return <div>
        <ul className='list-group'>
          {props.todos.map((item,index)=>{
            return <TodoListItem
                    key={item.id}
                    item={item}
                    index={index}
                    editTodo={props.editTodo}
                    deleteTodo={props.deleteTodo}
                    doneTodo={props.doneTodo}
                    test = {props.test}
                  />
        })}
        </ul>
    </div>
}

export default TodoList