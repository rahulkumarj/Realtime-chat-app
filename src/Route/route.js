import React from 'react'
import {Navigate} from "react-router-dom"
import { auth } from '../Firebase/firebase';  


const ProtectedRoute = ({children}) => {
    if(!auth?.currentUser?.email) {
        return <Navigate to="/" />
    }
 return children
};

export default ProtectedRoute;