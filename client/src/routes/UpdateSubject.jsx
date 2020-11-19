import React from 'react'
import UpdateComponents from '../components/UpdateComponents'
import { useHistory} from "react-router-dom";
const UpdateSubject = () => {
    let history = useHistory();
    const logout = (e) => {
     history.push('/dashboard')
    }
    return <div>
        <button onClick={(e) => logout(e)} className="btn btn-outline-link btn-lg float-right">Go to Dashboard</button>
            <h1 className = "text-center">Update Subject</h1>
            <UpdateComponents />
        </div>
    
}

export default UpdateSubject
