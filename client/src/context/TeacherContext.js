import React, {useState, createContext} from 'react'

export const TeacherContext = createContext()

export const TeacherContextProvider =  props => {

    const [teachers, setTeachers] = useState([])

    const addTeachers = (teacher) => {
        setTeachers([...teachers, teacher])
    }

    return (
        <TeacherContext.Provider value = {{teachers, setTeachers, addTeachers}}>
            {props.children}
        </TeacherContext.Provider>
    )
}