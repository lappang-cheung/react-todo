import React from 'react';

import TodoView from './TodoView';
// Multiple task view items
const TodoList = props => {

    // Destructuring the props for certain items
    const { itemList, onDeleteInput } = props;

    return(
        <ul>
            {   
                // Mapping the array of task
                itemList.map((item, index) => 
                    <TodoView 
                        key={index}
                        index={index} 
                        item={item} 
                        onDeleteInput={onDeleteInput}
                    />
                )
            }
        </ul>
    )
}

export default TodoList;