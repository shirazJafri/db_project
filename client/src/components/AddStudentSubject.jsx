import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import SubjectFinder from "../apis/SubjectFinder"
import { SubjectContext } from '../context/SubjectContext'

const AddStudentSubject = () => {
    const {addSubjects} = useContext(SubjectContext)
    const {id} = useParams()
    const [subjectID, setSubjectID] = useState("")

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await SubjectFinder.put(`/addStudentSubject/${id}`, {
                subject_id: subjectID
            })
            addSubjects(response.data.data.subject)
        } catch(err) {}
    }
    return (
        <div className = "mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                       <input value = {subjectID} onChange = {e => setSubjectID(e.target.value)} type = "number" className = "form-control" placeholder = "Subject ID"/>
                    </div>
                    <button onClick = {handlesubmit} type = "submit" className = "btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddStudentSubject
