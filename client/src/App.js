import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Custom components
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Footer from './components/layout/Footer'

// User auth
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'

// Import CSS
import './css/App.css'
import TaskApp from './components/Tasks/TaskApp'
import setAuthToken from './components/utils/setAuthToken'
import ProtectedRoute from './components/utils/ProtectedRoute'

if(localStorage.jwtToken){
    setAuthToken(localStorage.jwtToken)
}

class App extends Component {

    state = {
        isAuth: false
    }


    render(){
        return (
                <Router> 
                    <div>
                        {/* Navigation */}
                        <Navbar />
                            {/* Landing Page */}
                            <Route exact path='/' component={Landing} />
                            {/* User auth routes */}
                            <div className="container">
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                            </div>
                            {/* TaskApp View */}
                            <ProtectedRoute exact path="/tasks" component={TaskApp} />
                        {/* Footer */}
                        <Footer />
                    </div>
                </Router>
        )
    }
}

export default App;