
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { StudentContextProvider } from './context/StudentContext';
import { SubjectContext, SubjectContextProvider } from './context/SubjectContext';
import { TeacherContextProvider } from './context/TeacherContext';
import Courses from './routes/Courses';
import Home from './routes/Home';
import StudentDisplay from './routes/StudentDisplay';
import StudentsEnrolledList from './routes/StudentsEnrolledList';
import Teacher from './routes/Teacher';
import UpdateStudent from './routes/UpdateStudent';
import UpdateSubject from './routes/UpdateSubject';
import UpdateTeacher from './routes/UpdateTeacher';
import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Student_Login from './components/Login_Student';
import Teacher_Login from './components/Login_Teacher';
import Register from './components/Register';
import TeacherSubject from "./routes/TeacherSubject";
import StudentView from "./routes/StudentView";
import TeacherView from "./routes/TeacherView";
import Dashboard2 from './components/Dashboard_client';
toast.configure();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    }
    async function isAuth() {
        try {
            const response = await fetch("/isverify",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseRes = await response.json();
            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        } catch (error) {

        }
    }
    useEffect(() => {
        isAuth()
    })
    return (


        <StudentContextProvider>
            <div className="container">
                <Router>
                    
                <Switch>
                            <Route exact path="/login" render={props =>
                                !isAuthenticated ?
                                    (<Login {...props} setAuth={setAuth} />) :
                                    (<Redirect to="/dashboard" />)}
                            />
                            <Route exact path="/register" render={props => isAuthenticated ?
                                (<Register {...props} setAuth={setAuth} />) :
                                (<Redirect to="/login" />)} />
                            <Route exact path="/dashboard" render={props => isAuthenticated ?
                                (<Dashboard {...props} setAuth={setAuth} />) :
                                (<Redirect to="/Login" />)} />
                                <Route exact path="/dashboard2" render={props => isAuthenticated ?
                                (<Dashboard2 {...props} setAuth={setAuth} />) :
                                (<Redirect to="/Login/Students" />)} />
                            <Route exact path="/login/Students" render={props =>
                                !isAuthenticated ?
                                    (<Student_Login {...props} setAuth={setAuth} />) :
                                    (<Redirect to = "/dashboard2"/>)}
                            />
                            <Route exact path="/login/Teachers" render={props =>
                                !isAuthenticated ?
                                    (<Teacher_Login {...props} setAuth={setAuth} />) :
                                    (<Redirect to = "/dashboard2"/>)}
                            />
                        </Switch>
                    <Switch>
                        <Route exact path="/adminView" component={StudentDisplay}></Route>
                        <Route exact path="/updateStudent/:id" component={UpdateStudent}></Route>
                        <Route exact path="/studentsEnrolled/:id" component={StudentsEnrolledList}></Route>
                        <SubjectContextProvider>
                            <TeacherContextProvider>
                                <Switch>
                                    <Route exact path="/getTeachers" component={Teacher}></Route>
                                    <Route exact path="/updateTeacher/:id" component={UpdateTeacher}></Route>
                                </Switch>
                            </TeacherContextProvider>
                            <Switch>
                                <Route exact path="/getSubjects" component={Home}></Route>
                                <Route exact path="/updateSubject/:id" component={UpdateSubject}></Route>
                                <Route exact path = "/getStudentSubjects/:id" component={Courses}></Route>
                                <Route exact path = "/subjectsTeachers/:id" component = {TeacherSubject}></Route>
                                <Route exact path = "/teacherView/:id" component = {TeacherView}></Route>
                                <Route exact path = "/studentView/:id" component = {StudentView}></Route>
                            </Switch>
                        </SubjectContextProvider>
                    </Switch>
                </Router>
            </div>
        </StudentContextProvider>
    )
}

export default App;