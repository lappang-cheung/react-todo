import React from 'react';

const TodoView = props => {

    const { index, item } = props;

    return(
        <li key={index}>{item}</li>
    )
}

export default TodoView;