import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SubjectFinder from '../apis/SubjectFinder';
import { SubjectContext } from '../context/SubjectContext';

const UpdateComponents = () => {
    const {id} = useParams();
    let history = useHistory();
    const {subjects} = useContext(SubjectContext)
    const [subjectName, setSubjectName] = useState("")
    const [noOfCredits, setNoOfCredits] = useState("")
    const [classID, setClassID] = useState("")
    
    useEffect(() => {
        const fetchData = async(id) => {
            const response = await SubjectFinder.get(`/getSubject/${id}`)
            console.log(response.data.data)
            setSubjectName(response.data.data.subjects.subject_name)
            setNoOfCredits(response.data.data.subjects.credits)
            setClassID(response.data.data.subjects.class_id)
        }
        fetchData(id)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedSubject = await SubjectFinder.put(`/updateSubject/${id}`, {
            subject_name: subjectName,
            credits: noOfCredits,
            class_id: classID
        })
        history.push("/getSubjects")
    }
    return (
        <div>
            <form action = "">
                <div className="form-group">
                    <label htmlFor="subjectName">Name</label>
                    <input value = {subjectName} onChange = {e => setSubjectName(e.target.value)} id = "subjectName" className = "form-control" type = "text" />
                </div>

                <div className="form-group">
                    <label htmlFor="noOfCredits">Credits</label>
                    <input value = {noOfCredits} onChange = {e => setNoOfCredits(e.target.value)} id = "noOfCredits" className = "form-control" type = "number" />
                </div>

                <div className="form-group">
                    <label htmlFor="classID">Class ID</label>
                    <input value = {classID} onChange = {e => setClassID(e.target.value)} id = "classID" className = "form-control" type = "number" />
                </div>
                <button type = "submit" onClick = {handleSubmit} className = "btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateComponents
