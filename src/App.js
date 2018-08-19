import React, { Component } from 'react';
import './App.css';
import ListItem from './components/ListItem'
import Axios from 'axios';
import TodoInput from './components/TodoInput'

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
    // console.log(event.target.value)
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

  async addTodo(){

    const response = await Axios.post(`${this.apiUrl}/todos`,{
      title: this.state.newTitle,
      description: this.state.newDescription,
      date: Date.parse(this.state.newDate)
    })

    const todos = this.state.todos
    todos.push(response.data)
    this.setState({
      todos: todos
    })

    this.alert('Todo Added')
  }

  async deleteTodo(index){
    const todos = this.state.todos

    const todo = todos[index]
    await Axios.delete(`${this.apiUrl}/todos/${todo.id}`)

    delete todos[index]
    this.setState({ todos: todos })
    this.alert('Todo Deleted Successfully')
  }

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

          <TodoInput 
            titleChange={this.titleChange}
            dateChange={this.dateChange}
            descriptionChange={this.descriptionChange}
            editing={this.state.editing}
            newTitle = {this.state.newTitle}
            newDate = {this.state.newDate}
            newDescription = {this.state.newDescription}
            updateTodo = {this.updateTodo}
            addTodo = {this.addTodo}
          />

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
        })}
        </ul>
     } 
      </div>
    );
  }
}

export default App;
