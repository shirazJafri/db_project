import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import SubjectFinder from '../apis/SubjectFinder'
import { TeacherContext } from '../context/TeacherContext'

const TeachersList = (props) => {
    const {teachers, setTeachers} = useContext(TeacherContext)
    let history = useHistory();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SubjectFinder.get("/getTeachers")
                setTeachers(response.data.data.teachers)
            } catch(err) {}
        }

        fetchData();
    }, [])

    const handleDelete = async (id) => {
        try {
            const response = await SubjectFinder.delete(`/deleteTeacher/${id}`)
            setTeachers(teachers.filter(teacher => {
                return teacher.teacher_id !== id
            }))
        } catch(err) {}
    }

    const handleUpdate = (id) => {
        history.push(`/updateTeacher/${id}`)
    }

    const handleView = (id) => {
        history.push(`/subjectsTeachers/${id}`)
    }

    return (
        <div className = "list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className = "bg-primary">
                        <th scope = "col">Teacher ID</th>
                        <th scope = "col">Name</th>
                        <th scope = "col">Address</th>
                        <th scope = "col">Designation</th>
                        <th scope = "col">Date of Birth</th>
                        <th scope = "col">Gender</th>
                        <th scope = "col">Hours Worked</th>
                        <th scope = "col">Salary</th>
                        <th scope = "col">View Subjects</th>
                        <th scope = "col">Edit</th>
                        <th scope = "col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers && teachers.map(teacher => {
                        return (
                        <tr key = {teacher.teacher_id}>
                            <td>{teacher.teacher_id}</td>
                            <td>{teacher.name}</td>
                            <td>{teacher.address}</td>
                            <td>{teacher.designation}</td>
                            <td>{teacher.dob}</td>
                            <td>{teacher.gender}</td>
                            <td>{teacher.hours_worked}</td>
                            <td>{teacher.salary}</td>
                            <td>
                                <button onClick = {() => handleView(teacher.teacher_id)} className = "btn btn-info">View Subject</button>
                            </td>
                            <td>
                                <button onClick = {() => handleUpdate(teacher.teacher_id)} className = "btn btn-warning">Update</button>
                            </td>
                            <td>
                                <button onClick = {() => handleDelete(teacher.teacher_id)} className = "btn btn-danger">Delete</button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TeachersList
