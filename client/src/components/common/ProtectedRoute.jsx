import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import auth from '../../services/authService';
import LoginForm from "../LoginForm";
const ProtectedRoute = ({path, element : Element,...rest}) => {
    if(auth.getCurrentUser()){
        return (
                <Route {...rest} element={<Element/>} />
            );
    }
    return (
        <Route path="/login" element={<LoginForm/>} />
    );
    
}
 
export default ProtectedRoute;