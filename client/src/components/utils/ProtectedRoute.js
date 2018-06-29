import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.jwtToken !== undefined
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} 
    />
)

export default ProtectedRoute;