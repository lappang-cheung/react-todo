import React from 'react';

const Counter = props => {

    const {itemList, task} = props;

    return(
        <p>You have {task} out of {itemList.length} remaining</p>
    )
}

export default Counter;