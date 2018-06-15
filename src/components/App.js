import React, {Component} from 'react';
import axios from 'axios';

// Custom classes
import Counter from './task/Counter';
import Todo from './task/Todo';
import TodoList from './task/TodoList';

// Custom styles
import '../styles/App.css';
import Login from './login/Login';
import Signup from './login/Signup';

class App extends Component{

    // New way without writing out super and constructor
    state = {
        item: '',
        itemList:[],
        email: '',
        password: '',
        userLogin: false
    }

    refresh = () =>{
        axios.get("/todo")
        .then(res => {      
            this.setState({
                itemList: res.data
            })
        })
    }

    /*
        1. Use axios to grab the api call for all tasks
        2. Set the state of the itemList to hold all tasks items
    */
    componentDidMount(){
        this.refresh()
    }

    /*
        1. Getting the value input from the user
    */
    onChange = (event) => {
        this.setState({
            item: event.target.value
        })
    }

    onChangeEmail = (event) =>{
        this.setState({
            email: event.target.value
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    /*
        1. Grabs the id from removeItem parameter
        2. Axios calls the route to delete the from database
        3. Checks for errors and display if there is one
    */
    onDeleteInput = (removeItem) => {
        axios.delete(`/todo/${removeItem._id}`)
            .then(res => {
                console.log('Comment Deleted');
                this.refresh();
            })
            .catch(err => {
                console.log(err);
            })

        // this.setState((prevState) =>({
        //     itemList: prevState.itemList.filter((item) => {
        //         return removeItem !== item
        //     })
        // })) 
    }

    /*
        1. Axios call to the backend route to add input
        2. Called the refresh method to load the data
        3. Set the state of the item to clear the input
    */
    onAddInput = () => {
        // Create the task item with axios route
        axios.post('todo/new', {
            text: this.state.item
        })
        .then(
            res => console.log(res)
        )
        .catch(err => console.log(err));
        // Refresh the view
        this.refresh();
        // Clear the input
        this.setState({
            item: ''
        });
    }

    onSignup = () => {
        axios.post('user/signup', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));

        this.setState({
            userLogin: !this.userLogin,
            email: '',
            password: ''
        })
    }

    onLogin = () => {
        axios.post('user/login',{
            email: this.state.email,
            password: this.state.password
        })
        .then(
            res => console.log(res)
        ).catch(err => console.log(err));

        this.setState({
            userLogin: !this.userLogin,
            email: '',
            password: ''
        })
    }

    // Note: text is used instead of descrption cause of route!!!

    render()
    {
        return(
            <div>
                <Signup 
                    email={this.state.email}
                    password={this.state.password}
                    onChangeEmail={this.onChangeEmail}
                    onChangePassword={this.onChangePassword}
                    onSignup={this.onSignup}
                />
                <Login 
                    email={this.state.email}
                    password={this.state.password}
                    onChangeEmail={this.onChangeEmail}
                    onChangePassword={this.onChangePassword}
                    onLogin={this.onLogin}
                />
                {/* Todo component to add input into the array */}
                <Todo
                    item={this.state.item}
                    onChange={this.onChange}
                    onAddInput={this.onAddInput}
                />
                {/* Counter component for total task  */}
                <Counter 
                    itemList={this.state.itemList}
                />
                {/* To display the items add onto the task list */}
                <TodoList
                    itemList={this.state.itemList}
                    onDeleteInput={this.onDeleteInput}
                />
            </div>
        )
    }
}

export default App;