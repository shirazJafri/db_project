import React, { useContext, useState } from 'react'
import SubjectFinder from "../apis/SubjectFinder"
import { SubjectContext } from '../context/SubjectContext'

const AddSubject = () => {
    const {addSubjects} = useContext(SubjectContext)
    const [subjectName, setSubjectName] = useState("")
    const [noOfCredits, setNoOfCredits] = useState("")
    const [classID, setClassID] = useState("")

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await SubjectFinder.post("/createSubject", {
                subject_name: subjectName,
                credits: noOfCredits,
                class_id: classID
            })
            addSubjects(response.data.data.subject)
        } catch(err) {}
    }
    return (
        <div className = "mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                       <input value = {subjectName} onChange = {e => setSubjectName(e.target.value)} type = "text" className = "form-control" placeholder = "Subject Name"/>
                    </div>
                    <div className="col">
                        <input value = {noOfCredits} onChange = {e => setNoOfCredits(e.target.value)} type = "text" className = "form-control" placeholder = "No. Of Credits"/>
                    </div>
                    <div className="col">
                        <input value = {classID} onChange = {e => setClassID(e.target.value)} type = "text" className = "form-control" placeholder = "Class ID"/>
                    </div>
                    <button onClick = {handlesubmit} type = "submit" className = "btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddSubject
