import React, {useState, createContext} from 'react'

export const StudentContext = createContext()

export const StudentContextProvider =  props => {

    const [students, setStudents] = useState([])

    const addStudents = (student) => {
        setStudents([...students, student])
    }

    return (
        <StudentContext.Provider value = {{students, setStudents, addStudents}}>
            {props.children}
        </StudentContext.Provider>
    )
}