import React, { Component } from 'react'
import classnames from 'classnames'

class TaskMain extends Component{

    state = {
        errors: {}
    }

    render(){ 

        const { errors } = this.state

        return (
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Task Dashboard</h1>
							<p className="lead text-center">Welcome back and hope you complete your task</p>
							<form>
								
								<div className="form-group">
									{/* Title input */}
									<input 
										type="text" 
										className={
											classnames('form-control form-control-lg', {
												'is-invalid': errors.title
											})
										}
										placeholder="Enter Title" 
										name="title" 
										value={this.props.itemTitle}
										onChange={this.props.onChangeTitle}
									/>
									{/* Showing title is required */}
									{errors.title && (<div className="invalid-feedback">{errors.title}</div>)}
								</div>

                                <div className="form-group">
									{/* Task input */}
									<input 
										type="text" 
										className={
											classnames('form-control form-control-lg', {
												'is-invalid': errors.description
											})
										}
										placeholder="Enter Task" 
										name="task" 
										value={this.props.item}
										onChange={this.props.onChange}
									/>
									{/* Showing task is required */}
									{errors.description && (<div className="invalid-feedback">{errors.description}</div>)}
								</div>

								<button onClick={this.props.onAddInput} className="btn btn-info btn-block mt-4"> Add Task</button>
							</form>
						</div>
					</div>
				</div>

        )
    }
}

export default TaskMain