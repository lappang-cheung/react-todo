import React from 'react';

const Signup = props => {

    const { email, 
            password, 
            onChangeEmail, 
            onChangePassword, 
            onSignup } = props;

    return(
        <div>
            <h1>Signup</h1>
            <label>Email: </label>
            <input value={email} onChange={onChangeEmail} />
            <label>Password: </label>
            <input value={password} onChange={onChangePassword} />
            <button onClick={onSignup}>Signup</button>
        </div>
    )

}

export default Signup;