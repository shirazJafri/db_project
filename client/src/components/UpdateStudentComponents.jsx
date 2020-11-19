import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SubjectFinder from '../apis/SubjectFinder';
import { StudentContext } from '../context/StudentContext';

const UpdateStudentComponents = () => {
    const { id } = useParams();
    let history = useHistory();
    const { students } = useContext(StudentContext)
    const [studentClass, setStudentClass] = useState("")
    const [studentName, setStudentName] = useState("")
    const [studentAddress, setStudentAddress] = useState("")
    const [studentDOB, setStudentDOB] = useState("")
    const [studentGender, setStudentGender] = useState("")
    const [studentFatherName, setStudentFatherName] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await SubjectFinder.get(`/getStudent/${id}`)
            console.log(response.data.data)
            setStudentClass(response.data.data.student.class)
            setStudentName(response.data.data.student.name)
            setStudentAddress(response.data.data.student.address)
            setStudentDOB(response.data.data.student.dob)
            setStudentGender(response.data.data.student.gender)
            setStudentFatherName(response.data.data.student.father_name)
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedStudent = await SubjectFinder.put(`/updateStudent/${id}`, {
            class: studentClass,
            name: studentName,
            address: studentAddress,
            dob: studentDOB,
            gender: studentGender,
            father_name: studentFatherName
        })
        history.push("/")
    }
    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="studentClass">Student Class</label>
                    <input value={studentClass} onChange={e => setStudentClass(e.target.value)} id="studentClass" className="form-control" type="text" />
                </div>

                <div className="form-group">
                    <label htmlFor="studentName">Student Name</label>
                    <input value={studentName} onChange={e => setStudentName(e.target.value)} id="studentName" className="form-control" type="text" />
                </div>

                <div className="form-group">
                    <label htmlFor="studentAddress">Student Address</label>
                    <input value={studentAddress} onChange={e => setStudentAddress(e.target.value)} id="studentAddress" className="form-control" type="text" />
                </div>

                <div className="form-group">
                    <label htmlFor="studentDOB">Student Date of Birth</label>
                    <input value={studentDOB} onChange={e => setStudentDOB(e.target.value)} id="studentDOB" className="form-control" type="text" />
                </div>

                <div className="form-group">
                    <label htmlFor="studentGender">Student Gender</label>
                    <input value={studentGender} onChange={e => setStudentGender(e.target.value)} id="studentGender" className="form-control" type="text" />
                </div>

                <div className="form-group">
                    <label htmlFor="studentFatherName">Student Father Name</label>
                    <input value={studentFatherName} onChange={e => setStudentFatherName(e.target.value)} id="studentFatherName" className="form-control" type="text" />
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateStudentComponents
