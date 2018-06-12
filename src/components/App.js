import React, {Component} from 'react';

import Counter from './Counter';
import Todo from './Todo';
import TodoList from './TodoList';

class App extends Component{

    state = {
        task: 0,
        item: '',
        itemList:[]
    }

    onChange = (event) => {
        this.setState({
            item: event.target.value
        })
    }

    onAddInput = () => {
        this.setState({
            item: '',
            itemList: [...this.state.itemList, this.state.item],
            task: this.state.task + 1
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
                {/* Counter component for total task remaining */}
                <Counter 
                    task={this.state.task} 
                    itemList={this.state.itemList}
                />
                {/* To display the items add onto the task list */}
                <TodoList
                    task={this.state.task}
                    itemList={this.state.itemList}
                />
            </div>
        )
    }
}

export default App;