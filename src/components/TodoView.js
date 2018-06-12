import React from 'react';

// Single task view items
const TodoView = props => {

    // Destructuring the props for certain items
    const { index, item, onDeleteInput } = props;

    return(
        // Using span to prevent only one child element issue
        <span>
            {/* Displaying the items */}
            <li key={index}>{item}</li>
            {/* Button for removing task */}
            <button onClick={(e) => {
                onDeleteInput(item)
            }}>Remove</button>
        </span>
    )
}

export default TodoView;