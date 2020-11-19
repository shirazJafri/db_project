import React, {useState, createContext} from 'react'

export const SubjectContext = createContext()

export const SubjectContextProvider =  props => {

    const [subjects, setSubjects] = useState([])

    const addSubjects = (subject) => {
        setSubjects([...subjects, subject])
    }

    return (
        <SubjectContext.Provider value = {{subjects, setSubjects, addSubjects}}>
            {props.children}
        </SubjectContext.Provider>
    )
}