import React, {useContext, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SubjectFinder from '../apis/SubjectFinder'
import { StudentContext } from '../context/StudentContext'

const EnrolledStudents = (props) => {
    const {students, setStudents} = useContext(StudentContext)
    const {id} = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SubjectFinder.get(`/studentsEnrolled/${id}`)
                setStudents(response.data.data.students)
            } catch(err) {}
        }

        fetchData();
    }, [])

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
                        <th scope = "col">Father Name</th>+
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
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default EnrolledStudents
