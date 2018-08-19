import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem'
import Axios from 'axios';

class App extends Component {
  
  constructor(){
    super()

    this.state = {
      newTitle: '',
      newDescription: '',
      newDate: '',
      editing: false,
      editingIndex: null,
      notification: null,
      todos: []
    }

    this.apiUrl = 'https://5b78e689b8599700144785c0.mockapi.io'
    this.alert = this.alert.bind(this)
    this.descriptionChange = this.descriptionChange.bind(this)
    this.dateChange = this.dateChange.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.doneTodo = this.doneTodo.bind(this)
    this.titleChange = this.titleChange.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
  }


  async componentDidMount(){
    const response = await Axios.get(`${this.apiUrl}/todos`)
    this.setState({
      todos: response.data
    })
  }

  titleChange(event){
    this.setState({
      newTitle: event.target.value
    })
  }

  descriptionChange(event){
    this.setState({
      newDescription: event.target.value
    })
  }

  dateChange(event){    
    this.setState({
      newDate: event.target.value
    })
  }

  // addTodo(){
  //   const newTodo = {
  //     name: this.state.newTodo,
  //     id: this.state.generateId,
  //   }

  //   const todos = this.state.todos
  //   todos.push(newTodo)
  //   this.setState({
  //     todos: todos
  //   })

  //   this.alert('Todo Added')
  // }

  async addTodo(){

    const response = await Axios.post(`${this.apiUrl}/todos`,{
      title: this.state.newTitle,
      description: this.state.newDescription,
      // data: this.state.newDate,
      date: Date.parse(this.state.newDate)
    })

    const todos = this.state.todos
    todos.push(response.data)
    this.setState({
      todos: todos
    })

    this.alert('Todo Added')
  }

  // deleteTodo(index){
  //   const todos = this.state.todos
  //   delete todos[index]
  //   this.setState({ todos: todos })
  //   this.alert('Todo Deleted Successfully')
  // }

  async deleteTodo(index){
    const todos = this.state.todos

    const todo = todos[index]
    const response = await Axios.delete(`${this.apiUrl}/todos/${todo.id}`)

    delete todos[index]
    this.setState({ todos: todos })
    this.alert('Todo Deleted Successfully')
  }

  // editTodo(index){
  //   const todo = this.state.todos[index]

  //   this.setState({
  //     editing: true,
  //     newTitle: todo.title,
  //     newDate: todo.date,
  //     newDescription: todo.description,
  //     editingIndex: index,
  //   })
  // }

  editTodo(index){
    const todo = this.state.todos[index]
    var date = new Date(todo.date).toJSON().slice(0,10)

    this.setState({
      editing: true,
      newTitle: todo.title,
      newDate: date,
      newDescription: todo.description,
      editingIndex: index,
    })
  }

 async  doneTodo(index){
    const todo = this.state.todos[index]
    console.log(todo.id)

    const response = await Axios.put(`${this.apiUrl}/todos/${todo.id}`,{
      status: true,
    })
    const todos = this.state.todos
    todos[index] = response.data

    this.setState({ 
      todos: todos,
      })

    this.alert('This todo is done')
  }

  // updateTodo(){
  //   const todo = this.state.todos[this.state.editingIndex]
  //   todo.title = this.state.newTodo
  //   const todos = this.state.todos
  //   todos[this.state.editingIndex] = todo
  //   this.setState({ todos: todos ,editing: false ,editingIndex: null, newTodo: ''})
  //   this.alert('Todo Updated Successfully')
  // }

  async updateTodo(){
    const todo = this.state.todos[this.state.editingIndex]
    const response = await Axios.put(`${this.apiUrl}/todos/${todo.id}`,{
      title: this.state.newTitle,
      description: this.state.newDescription,
      date: Date.parse(this.state.newDate),
    })
    const todos = this.state.todos

    todos[this.state.editingIndex] = response.data
    this.setState({ 
      todos: todos,
      editing: false,
      editingIndex: null,
      newTitle: '',
      newDate: '',
      newDescription: '',
      })

    this.alert('Todo Updated Successfully')
  }

  // generateId(){
  //   const lastTodo = this.state.todos[this.state.todos.length - 1].id+1

  //   if(lastTodo){
  //     return lastTodo.id + 1
  //   }
  //     return 1
  // }

  alert(notification){
    this.setState({
      notification: notification
    })
    setTimeout(() => {
      this.setState({
        notification: ''
      })
    },5000)
  }
 
  render() {
    return (
      <div className="container col-md-4">
        { this.state.notification &&
        <div className='alert-success'>
          <p className='text-center mt-3'>{this.state.notification}</p>
        </div>
        }
        <h2 className='text-center my-4'>ToDos List</h2>
        <input 
          className='my-4 form-control' 
          type='text' 
          placeholder='add todo'
          onChange={this.titleChange}
          value={this.state.newTitle}>
        </input>

        <input 
          className='my-4 form-control' 
          type='text' 
          placeholder='Description'
          onChange={this.descriptionChange}
          value={this.state.newDescription}>
        </input>

        <input 
          className='my-4 form-control' 
          type='date' 
          placeholder='Date'
          onChange={this.dateChange}
          value={this.state.newDate}>
        </input>

          <button 
            className='btn-primary mb-3 form-control'
            onClick={this.state.editing ? this.updateTodo : this.addTodo}
            disabled={this.state.newTitle === ''}>
            {this.state.editing ? 'UPDATE TO DO' : 'ADD TODO'}
          </button>
     { !this.state.editing &&
      <ul className='list-group'>
          {this.state.todos.map((item,index)=>{
            return <ListItem
                    key={item.id}
                    item={item}
                    editTodo={ () => { this.editTodo(index) }}
                    deleteTodo={ () => { this.deleteTodo(index) }}
                    doneTodo={ () => {this.doneTodo(index)}}
                  />
          /* return <li key={item.id} className='list-group-item'>{item.name}
                  
                  <button 
                    className='btn-sm ml-4 btn btn-info'
                    onClick={()=> this.editTodo(index)}>
                      update
                  </button>
                    
                  <button 
                    className='btn-sm ml-4 btn btn-danger'
                    onClick={()=> this.deleteTodo(index)}>
                      del
                    </button>
                </li>  */
        })}
        </ul>
     } 
      </div>
    );
  }
}

export default App;
