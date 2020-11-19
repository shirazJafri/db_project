import React, { useEffect } from 'react'
import AddStudent from '../components/AddStudent'
import StudentList from '../components/StudentList'
import { toast } from 'react-toastify';
import { useHistory} from "react-router-dom";
const StudentDisplay = () => {
    let history = useHistory();
    const logout = (e) => {
     history.push('/dashboard')
    }
    return <div>
        <button onClick={(e) => logout(e)} className="btn btn-outline-link btn-lg float-right">Go to Dashboard</button>
        <h1 className="font-weight-light display-3 text-center">Students List</h1>
        <AddStudent />
        <StudentList />
    </div>
}

export default StudentDisplay