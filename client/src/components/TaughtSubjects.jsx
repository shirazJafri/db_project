import React, {useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import SubjectFinder from "../apis/SubjectFinder"
import { SubjectContext } from '../context/SubjectContext'

const TaughtSubjects = (props) => {
    const {id} = useParams()
    const {subjects, setSubjects} = useContext(SubjectContext)
    useEffect(() => {
        const fetchData = async (teacherID) => {
            try {
                const response = await SubjectFinder.get(`/subjectsTeachers/${teacherID}`)
                setSubjects(response.data.data.subjects)
            } catch(err) {}
        }

        fetchData(id);
    }, [])

    return (
        <div className = "list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className = "bg-primary">
                        <th scope = "col">Subject ID</th>
                        <th scope = "col">Subject Name</th>
                        <th scope = "col">Amount of Credits</th>
                        <th scope = "col">Class ID</th>
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
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TaughtSubjects
