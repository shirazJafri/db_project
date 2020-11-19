import React from 'react'
import UpdateTeacherComponents from '../components/UpdateTeacherComponents'
import { useHistory} from "react-router-dom";
const UpdateTeacher = () => {
    let history = useHistory();
    const logout = (e) => {
     history.push('/dashboard')
    }
    return <div>
        <button onClick={(e) => logout(e)} className="btn btn-outline-link btn-lg float-right">Go to Dashboard</button>
            <h1 className = "text-center">Update Teacher</h1>
            <UpdateTeacherComponents />
        </div>
    
}

export default UpdateTeacher
