import React, { useContext, useState } from 'react'
import SubjectFinder from "../apis/SubjectFinder"
import { TeacherContext } from '../context/TeacherContext'

const AddTeacher = () => {
    const {addTeachers} = useContext(TeacherContext)
    const [teacherName, setTeachertName] = useState("")
    const [teacherAddress, setTeacherAddress] = useState("")
    const [teacherDesignation, setTeacherDesignation] = useState("")
    const [teacherDOB, setTeacherDOB] = useState("")
    const [teacherGender, setTeacherGender] = useState("")
    const [teacherHoursWorked, setTeacherHoursWorked] = useState("")
    const [teacherSalary, setTeacherSalary] = useState("")

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await SubjectFinder.post("/createTeacher", {
                name: teacherName,
                address: teacherAddress,
                designation: teacherDesignation,
                dob: teacherDOB,
                gender: teacherGender,
                hours_worked: teacherHoursWorked,
                salary: teacherSalary
            })
            addTeachers(response.data.data.teacher)
        } catch(err) {}
    }
    return (
        <div className = "mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                       <input value = {teacherName} onChange = {e => setTeachertName(e.target.value)} type = "text" className = "form-control" placeholder = "Teacher Name"/>
                    </div>
                    <div className="col">
                        <input value = {teacherAddress} onChange = {e => setTeacherAddress(e.target.value)} type = "text" className = "form-control" placeholder = "Teacher Address"/>
                    </div>
                    <div className="col">
                        <input value = {teacherDesignation} onChange = {e => setTeacherDesignation(e.target.value)} type = "text" className = "form-control" placeholder = "Teacher Designation"/>
                    </div>
                    <div className="col">
                        <input value = {teacherDOB} onChange = {e => setTeacherDOB(e.target.value)} type = "date" className = "form-control" placeholder = "Teacher Date of Birth"/>
                    </div>
                    <div className="col">
                        <input value = {teacherGender} onChange = {e => setTeacherGender(e.target.value)} type = "text" className = "form-control" placeholder = "Teacher Gender"/>
                    </div>
                    <div className="col">
                        <input value = {teacherHoursWorked} onChange = {e => setTeacherHoursWorked(e.target.value)} type = "number" className = "form-control" placeholder = "Hours Worked"/>
                    </div>
                    <div className="col">
                        <input value = {teacherSalary} onChange = {e => setTeacherSalary(e.target.value)} type = "money" className = "form-control" placeholder = "Salary"/>
                    </div>
                    <button onClick = {handlesubmit} type = "submit" className = "btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddTeacher
