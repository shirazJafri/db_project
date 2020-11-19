import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import SubjectFinder from '../apis/SubjectFinder'
import { StudentContext } from '../context/StudentContext'

const StudentList = (props) => {
    const {students, setStudents} = useContext(StudentContext)
    let history = useHistory();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SubjectFinder.get("/getStudents")
                console.log(response)
                setStudents(response.data.data.students)
            } catch(err) {}
        }

        fetchData();
    }, [])

    const handleDelete = async (id) => {
        try {
            const response = await SubjectFinder.delete(`/deleteStudent/${id}`)
            setStudents(students.filter(student => {
                return student.student_id !== id
            }))
        } catch(err) {}
    }

    const handleUpdate = (id) => {
        history.push(`/updateStudent/${id}`)
    }

    const handleView = (id) => {
        history.push(`/getStudentSubjects/${id}`)
    }

    const handleSubjects = () => {
        history.push('/getSubjects')
    }

    const handleTeachers = () => {
        history.push('/getTeachers')
    }

    return (
        <div className = "list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className = "bg-primary">
                        <th scope = "col">Student ID</th>
                        <th scope = "col">Class</th>
                        <th scope = "col">Name</th>
                        <th scope = "col">Address</th>
                        <th scope = "col">Date of Birth</th>
                        <th scope = "col">Gender</th>
                        <th scope = "col">Father Name</th>
                        <th scope = "co">Add/View Courses</th>
                        <th scope = "col">Edit</th>
                        <th scope = "col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {students && students.map(student => {
                        return (
                        <tr key = {student.student_id}>
                            <td>{student.student_id}</td>
                            <td>{student.class}</td>
                            <td>{student.name}</td>
                            <td>{student.address}</td>
                            <td>{student.dob}</td>
                            <td>{student.gender}</td>
                            <td>{student.father_name}</td>
                            <td>
                                <button type = "button" onClick = {() => handleView(student.student_id)} className = "btn btn-info">Add/View Courses</button>
                            </td>
                            <td>
                                <button onClick = {() => handleUpdate(student.student_id)} className = "btn btn-warning">Update</button>
                            </td>
                            <td>
                            <button onClick = {() => handleDelete(student.student_id)} className = "btn btn-danger">Delete</button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            <div class="btn-group btn-group-lg" role="group" aria-label="...">
                <button type="button" onClick = {() => handleSubjects()} class="btn btn-outline-primary">Subjects</button>
                <button type="button" onClick = {() => handleTeachers()} class="btn btn-outline-primary">Teachers</button>
            </div>
        </div>
    )
}

export default StudentList
