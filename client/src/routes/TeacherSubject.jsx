import React from 'react'
import TaughtSubjects from '../components/TaughtSubjects'
import { useHistory} from "react-router-dom";
const TeacherSubject = () => {
    let history = useHistory();
    const logout = (e) => {
     history.push('/dashboard2')
    }
    return <div>
        <button onClick={(e) => logout(e)} className="btn btn-outline-link btn-lg float-right">Go to Dashboard</button>
        <h1 className = "font-weight-light display-3 text-center">Taught Subjects</h1>
        <TaughtSubjects />
    </div>
}

export default TeacherSubject