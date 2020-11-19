import React, {useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import SubjectFinder from "../apis/SubjectFinder"
import { SubjectContext } from '../context/SubjectContext'

const CourseList = (props) => {
    const {id} = useParams()
    const {subjects, setSubjects} = useContext(SubjectContext)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SubjectFinder.get(`/getStudentSubjects/${id}`)
                setSubjects(response.data.data.subjects)
            } catch(err) {}
        }

        fetchData();
    }, [])

    const handleDelete = async (id_sub) => {
        try {
            const response = await SubjectFinder.delete(`/deleteStudentSubject/${id}`, {
                data: {
                    subject_id: id_sub
                }
            })
            console.log(response)
            setSubjects(subjects.filter(subject => {
                return subject.subject_id !== id_sub
            }))
        } catch(err) {}
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

export default CourseList
