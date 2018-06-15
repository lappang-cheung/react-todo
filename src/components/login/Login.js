import React from 'react';

const Login = props => {

    const { email, 
            password, 
            onChangeEmail, 
            onChangePassword, 
            onLogin } = props;

    return(
        <div>
            <h1>Login</h1>
            <label>Email: </label>
            <input value={email} onChange={onChangeEmail} />
            <label>Password: </label>
            <input value={password} onChange={onChangePassword} />
            <button onClick={onLogin}>Login</button>
        </div>
    )

}

export default Login;