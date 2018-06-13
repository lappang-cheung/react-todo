import React, {Component} from 'react';
import axios from 'axios';

// Custom classes
import Counter from './Counter';
import Todo from './Todo';
import TodoList from './TodoList';

// Custom styles
import '../styles/App.css';

class App extends Component{

    // New way without writing out super and constructor
    state = {
        item: '',
        itemList:[]
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
        1. Resetting the item to empty string after click
        2. Storing the item into itemList array
    */
    onAddInput = () => {

        // console.log('Pressed')
        // console.log(this.state.item)
        // this.setState({
        //     item: ''
        // })

        axios.post('todo/new', {
            text: 'Test me'
        }).then(res => console.log(res)).catch(err => console.log(err))
        this.refresh();

        // this.setState({
        //     item: '',
        //     itemList: [...this.state.itemList, this.state.item]
        // })

    }

    render()
    {
        return(
            <div>
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