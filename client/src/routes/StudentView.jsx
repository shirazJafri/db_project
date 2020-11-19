import React from 'react'
import StudentCourseList from '../components/StudentCourseList'
import { useHistory} from "react-router-dom";
const StudentView = () => {
    let history = useHistory();
    const logout = (e) => {
     history.push('/dashboard2')
    }
    return <div>
        <button onClick={(e) => logout(e)} className="btn btn-outline-link btn-lg float-right">Go to Dashboard</button>
        <h1 className = "font-weight-light display-3 text-center">Course List</h1>
        <StudentCourseList />
    </div>
}

export default StudentView