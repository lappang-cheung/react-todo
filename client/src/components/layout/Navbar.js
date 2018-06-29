import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import setAuthToken from '../utils/setAuthToken'

class Navbar extends Component {

    logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('jwtToken')
        setAuthToken(false)
        this.props.history.push('/')

    }

    render() {

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/tasks">Task Board</Link>
                </li>
                
                <li className="nav-item">
                    <a href="" onClick={this.logout} className="nav-link">Log out</a>
                </li>
            </ul>
        )

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">TaskListApp</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        { localStorage.jwtToken !== undefined ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        )
    }
}

export default (withRouter(Navbar))
