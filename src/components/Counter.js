import React from 'react';

const Counter = props => {

    const {itemList} = props;

    return(
        <p>You have total {itemList.length} task(s)</p>
    )
}

export default Counter;