import React from 'react'
import UpdateStudentComponents from '../components/UpdateStudentComponents'
import { useHistory} from "react-router-dom";
const UpdateStudent = () => {
    let history = useHistory();
    const logout = (e) => {
     history.push('/dashboard')
    }
    return <div>
        <button onClick={(e) => logout(e)} className="btn btn-outline-link btn-lg float-right">Go to Dashboard</button>
            <h1 className = "text-center">Update Student</h1>
            <UpdateStudentComponents />
        </div>
    
}

export default UpdateStudent
