import React, {Component} from 'react';

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
        1. Create a json string
        2. Add the itemList array into local storage
    */
    componentDidUpdate(){
        const json = JSON.stringify(this.state.itemList);
        localStorage.setItem('itemList', json);
    }

    /*
        1. Try - Catch for the localStorage for task & itemList array
        2. Check if the itemList is not null then set the state for the array
    */
    componentDidMount(){
        try{
            // Holding the data from the local storage
            const json = localStorage.getItem('itemList');

            // Storing back into JavaScript objects 
            const itemList = JSON.parse(json);

            // Check if itemList is null
            if(itemList){
                this.setState({itemList})
            }
        }catch(e){
            // Do nothing
        }
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