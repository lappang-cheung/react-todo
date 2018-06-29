import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'

class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        axios.post('/users/signup', newUser)
            .then(res => this.props.history.push('/login'))
            .catch(err => this.setState({
                errors: err.response.data
            }))
    }

    render() {

        const { errors } = this.state

        return (
            
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your TaskList account</p>
                            <form onSubmit={this.onSubmit}>

                                {/* Name input */}
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={
                                            classnames('form-control form-control-lg', {
                                                'is-invalid': errors.name
                                            })
                                        }
                                        placeholder="Name" 
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                    />
                                    {/* Showing name is required */}
                                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                                </div>

                                {/* Email input */}
                                <div className="form-group">
                                    <input 
                                        type="email" 
                                        className={
                                            classnames('form-control form-control-lg', {
                                                'is-invalid': errors.email
                                            })
                                        } 
                                        placeholder="Email Address" 
                                        name="email"
                                        value={this.state.email} 
                                        onChange={this.onChange}
                                    />
                                    {/* Showing email is required */}
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                </div>

                                {/* Password Input */}
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        className={
                                            classnames('form-control form-control-lg', {
                                                'is-invalid': errors.password
                                            })
                                        } 
                                        placeholder="Password" 
                                        name="password" 
                                        value={this.state.password}
                                        onChange={this.onChange}    
                                    />
                                    {/* Showing password is required */}
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                

                                {/* Confirm Password Input */}
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        className={
                                            classnames('form-control form-control-lg', {
                                                'is-invalid': errors.password2
                                            })
                                        } 
                                        placeholder="Confirm Password" 
                                        name="password2" 
                                        value={this.state.password2}
                                        onChange={this.onChange}    
                                    />
                                    {/* Showing confirm password is required */}
                                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                                </div>

                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default (withRouter(Register))
