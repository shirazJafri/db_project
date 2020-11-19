import React from 'react'
import AddTeacher from '../components/AddTeacher'
import TeachersList from '../components/TeachersList'
import { useHistory} from "react-router-dom";
const Teacher = () => {
    let history = useHistory();
    const logout = (e) => {
     history.push('/dashboard2')
    }
    return <div>
        <button onClick={(e) => logout(e)} className="btn btn-outline-link btn-lg float-right">Go to Dashboard</button>
        <h1 className = "font-weight-light display-3 text-center">Teachers List</h1>
        <AddTeacher />
        <TeachersList />
    </div>
}

export default Teacher