import React from 'react'
import EnrolledStudents from '../components/EnrolledStudents'
import { useHistory} from "react-router-dom";
const StudentsEnrolledList = () => {
    let history = useHistory();
    const logout = (e) => {
     history.push('/dashboard')
    }
    return <div>
        <button onClick={(e) => logout(e)} className="btn btn-outline-link btn-lg float-right">Go to Dashboard</button>
        <h1 className="font-weight-light display-3 text-center">Students List</h1>
        <h1 className = "font-weight-light display-3 text-center">Enrolled Students</h1>
        <EnrolledStudents />
    </div>
}

export default StudentsEnrolledList