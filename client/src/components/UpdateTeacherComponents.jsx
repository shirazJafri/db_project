import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SubjectFinder from '../apis/SubjectFinder';
import { TeacherContext } from '../context/TeacherContext';

const UpdateTeacherComponents = () => {
    const { id } = useParams();
    let history = useHistory();
    const { teachers } = useContext(TeacherContext)
    const [teacherName, setTeachertName] = useState("")
    const [teacherAddress, setTeacherAddress] = useState("")
    const [teacherDesignation, setTeacherDesignation] = useState("")
    const [teacherDOB, setTeacherDOB] = useState("")
    const [teacherGender, setTeacherGender] = useState("")
    const [teacherHoursWorked, setTeacherHoursWorked] = useState("")
    const [teacherSalary, setTeacherSalary] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await SubjectFinder.get(`/getTeacher/${id}`)
            setTeachertName(response.data.data.teacher.name)
            setTeacherAddress(response.data.data.teacher.address)
            setTeacherDesignation(response.data.data.teacher.designation)
            setTeacherDOB(response.data.data.teacher.dob)
            setTeacherGender(response.data.data.teacher.gender)
            setTeacherHoursWorked(response.data.data.teacher.hours_worked)
            setTeacherSalary(response.data.data.teacher.salary)
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedTeacher = await SubjectFinder.put(`/updateTeacher/${id}`, {
            name: teacherName,
            address: teacherAddress,
            designation: teacherDesignation,
            dob: teacherDOB,
            gender: teacherGender,
            hours_worked: teacherHoursWorked,
            salary: teacherSalary
        })
        history.push("/getTeachers")
    }
    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="teacherName">Teacher Name</label>
                    <input value = {teacherName} onChange = {e => setTeachertName(e.target.value)} type = "text" className = "form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="teacherAddress">Teacher Address</label>
                    <input value = {teacherAddress} onChange = {e => setTeacherAddress(e.target.value)} type = "text" className = "form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="teacherDesignation">Teacher Designation</label>
                    <input value = {teacherDesignation} onChange = {e => setTeacherDesignation(e.target.value)} type = "text" className = "form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="teacherDOB">Teacher Date of Birth</label>
                    <input value = {teacherDOB} onChange = {e => setTeacherDOB(e.target.value)} type = "date" className = "form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="teacherGender">Teacher Gender</label>
                    <input value = {teacherGender} onChange = {e => setTeacherGender(e.target.value)} type = "text" className = "form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="teacherHoursWorked">Hours Worked</label>
                    <input value = {teacherHoursWorked} onChange = {e => setTeacherHoursWorked(e.target.value)} type = "number" className = "form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="teacherSalary">Salary</label>
                    <input value = {teacherSalary} onChange = {e => setTeacherSalary(e.target.value)} type = "money" className = "form-control"/>
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateTeacherComponents
