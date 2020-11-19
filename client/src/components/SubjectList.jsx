import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import SubjectFinder from "../apis/SubjectFinder"
import { SubjectContext } from '../context/SubjectContext'

const SubjectList = (props) => {
    const {subjects, setSubjects} = useContext(SubjectContext)
    let history = useHistory();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SubjectFinder.get("/getSubjects")
                setSubjects(response.data.data.subjects)
            } catch(err) {}
        }

        fetchData();
    }, [])

    const handleDelete = async (id) => {
        try {
            const response = await SubjectFinder.delete(`/deleteSubject/${id}`)
            setSubjects(subjects.filter(subject => {
                return subject.subject_id !== id
            }))
        } catch(err) {}
    }

    const handleUpdate = (id) => {
        history.push(`/updateSubject/${id}`)
    }

    const handleView = (id) => {
        history.push(`/StudentsEnrolled/${id}`)
    }

    return (
        <div className = "list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className = "bg-primary">
                        <th scope = "col">Subject ID</th>
                        <th scope = "col">Subject Name</th>
                        <th scope = "col">Amount of Credits</th>
                        <th scope = "col">Class ID</th>
                        <th scope = "col">View Students</th>
                        <th scope = "col">Edit</th>
                        <th scope = "col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects && subjects.map(subject => {
                        return (
                        <tr key = {subject.subject_id}>
                            <td>{subject.subject_id}</td>
                            <td>{subject.subject_name}</td>
                            <td>{subject.credits}</td>
                            <td>{subject.class_id}</td>
                            <td>
                                <button onClick = {() => handleView(subject.subject_id)} className = "btn btn-secondary">View Students</button>
                            </td>
                            <td>
                                <button onClick = {() => handleUpdate(subject.subject_id)} className = "btn btn-warning">Update</button>
                            </td>
                            <td>
                            <button onClick = {() => handleDelete(subject.subject_id)} className = "btn btn-danger">Delete</button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SubjectList
