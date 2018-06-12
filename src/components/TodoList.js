import React from 'react';

import TodoView from './TodoView';

const TodoList = props => {

    const { task, itemList } = props;

    return(
        <ul>
            {
                itemList.map((item, index) => 
                    <TodoView index={index} item={item}/>
                )
            }
        </ul>
    )
}

export default TodoList;