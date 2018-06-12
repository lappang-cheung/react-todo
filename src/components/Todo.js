import React from 'react';

const Todo = props => {

    const { item, onChange, onAddInput } = props;

    return(
        <div>
            <input value={item} onChange={onChange} />
            <button onClick={onAddInput}>Add</button>
        </div>
    )

}

export default Todo;