import React, { useEffect } from 'react'
import AddSubject from '../components/AddSubject'
import Header from '../components/Header'
import SubjectList from '../components/SubjectList'
import { useHistory} from "react-router-dom";
const Home = () => {
    let history = useHistory();
    const logout = (e) => {
     history.push('/dashboard')
    }
    return <div>
        <button onClick={(e) => logout(e)} className="btn btn-outline-link btn-lg float-right">Go to Dashboard</button>
        <Header/>
        <AddSubject/>
        <SubjectList/>
    </div>
}

export default Home;