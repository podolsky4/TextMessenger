import React, { Component } from 'react';
import ReactSignupLoginComponent from 'react-signup-login-component';
import css from '../styles/main.css';





 
const LoginPage = (props) => {
        
        
        const signupWasClickedCallback = (data) => {
        console.log(data);
        alert('Signup callback, see log on the console to see the data.');
        };
        const loginWasClickedCallback = (data) => {
        console.log(data);
        alert('Login callback, see log on the console to see the data.');
        };
        const recoverPasswordWasClickedCallback = (data) => {
        console.log(data);
        alert('Recover password callback, see log on the console to see the data.');
        };
        
        return (
            <ReactSignupLoginComponent
                title="My awesome company"
                handleSignup={signupWasClickedCallback}
                handleLogin={loginWasClickedCallback}
                handleRecoverPassword={recoverPasswordWasClickedCallback}
            />
            
        );
    
};
 
export default LoginPage;