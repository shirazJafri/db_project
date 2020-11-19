import React from 'react'
import AddStudentSubject from '../components/AddStudentSubject';
import CourseList from '../components/CourseList'

const Courses = () => {
    return <div>
        <h1 className = "font-weight-light display-3 text-center">Courses List</h1>
        <AddStudentSubject />
        <CourseList />
    </div>
}

export default Courses;