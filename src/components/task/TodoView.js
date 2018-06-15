import React, { Component } from 'react';

// Single task view items
class TodoView extends Component {

    // Create state for strike through
    state = {
        active: false
    }

    // Strike through when task is completed
    onStrikeThrough = () => {
        this.setState({ active: !this.state.active })
    }

    render(){
        return(
            // Using span to prevent only one child element issue
            <span>
                {/* Displaying the items and add css class for strike through*/}
                <li 
                    key={this.props.index}
                    className={this.state.active ? 'active' : 'notActive'}
                    onClick={this.onStrikeThrough}
                >
                {/* Note: item.description is getting the value of the string */}
                    {this.props.item.description}
                </li>
                {/* Button for removing task */}
                <button onClick={(e) => {
                    this.props.onDeleteInput(this.props.item)
                }}>Remove</button>
            </span>
        )
    }
}

// // Single task view items
// const TodoView = props => {

//     // Destructuring the props for certain items
//     const { index, item, onDeleteInput } = props;

//     return(
//         // Using span to prevent only one child element issue
//         <span>
//             {/* Displaying the items */}
//             <li key={index}>{item}</li>
//             {/* Button for removing task */}
//             <button onClick={(e) => {
//                 onDeleteInput(item)
//             }}>Remove</button>
//         </span>
//     )
// }

export default TodoView;