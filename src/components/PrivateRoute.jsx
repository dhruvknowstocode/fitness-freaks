// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isLoggedIn = !!localStorage.getItem('token');

  if (!isLoggedIn) {
    console.log("Alert triggered: User not logged in");
    alert("You must be logged in to access this feature.");
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
