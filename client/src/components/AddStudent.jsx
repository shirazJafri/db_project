import React, { useContext, useState } from 'react'
import SubjectFinder from "../apis/SubjectFinder"
import { StudentContext } from '../context/StudentContext'

const AddStudent = () => {
    const {addStudents} = useContext(StudentContext)
    const [studentClass, setStudentClass] = useState("")
    const [studentName, setStudentName] = useState("")
    const [studentAddress, setStudentAddress] = useState("")
    const [studentDOB, setStudentDOB] = useState("")
    const [studentGender, setStudentGender] = useState("")
    const [studentFatherName, setStudentFatherName] = useState("")

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await SubjectFinder.post("/createStudent", {
                class: studentClass,
                name: studentName,
                address: studentAddress,
                dob: studentDOB,
                gender: studentGender,
                father_name: studentFatherName
            })
            addStudents(response.data.data.student)
        } catch(err) {}
    }
    return (
        <div className = "mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                       <input value = {studentClass} onChange = {e => setStudentClass(e.target.value)} type = "text" className = "form-control" placeholder = "Student Class"/>
                    </div>
                    <div className="col">
                        <input value = {studentName} onChange = {e => setStudentName(e.target.value)} type = "text" className = "form-control" placeholder = "Student Name"/>
                    </div>
                    <div className="col">
                        <input value = {studentAddress} onChange = {e => setStudentAddress(e.target.value)} type = "text" className = "form-control" placeholder = "Student Address"/>
                    </div>
                    <div className="col">
                        <input value = {studentDOB} onChange = {e => setStudentDOB(e.target.value)} type = "date" className = "form-control" placeholder = "Student Date of Birth"/>
                    </div>
                    <div className="col">
                        <input value = {studentGender} onChange = {e => setStudentGender(e.target.value)} type = "text" className = "form-control" placeholder = "Student Gender"/>
                    </div>
                    <div className="col">
                        <input value = {studentFatherName} onChange = {e => setStudentFatherName(e.target.value)} type = "text" className = "form-control" placeholder = "Student Father Name"/>
                    </div>
                    <button onClick = {handlesubmit} type = "submit" className = "btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddStudent
