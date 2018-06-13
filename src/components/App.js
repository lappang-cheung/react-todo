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

    /*
        1. 
    */
    componentDidMount(){
        axios.get("/todo")
        .then(res => {
            
            this.setState({
                itemList: res.data
            })
            
            // if(res.data.itemList){
            //     this.setState({ itemList: res.data.itemList })
            // }
        })
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
        1. Gets the previous state of the array
        2. Filter the array for the remove item
        3. Checks if remove item
    */
    onDeleteInput = (removeItem) => {
        this.setState((prevState) =>({
            itemList: prevState.itemList.filter((item) => {
                return removeItem !== item
            })
        })) 
    }

    /*
        1. Resetting the item to empty string after click
        2. Storing the item into itemList array
    */
    onAddInput = () => {


        
        this.setState({
            item: '',
            itemList: [...this.state.itemList, this.state.item]
        })
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