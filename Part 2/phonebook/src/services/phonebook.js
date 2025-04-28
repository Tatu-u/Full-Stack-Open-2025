import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>{
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const createNew = person =>{
    const req = axios.post(baseUrl, person)
    return req.then(res => res.data)
}

const updatePerson = (id, newPerson) => {
    const req = axios.put(`${baseUrl}/${id}`, newPerson)
    return req.then(res => res.data)
} 

const deletePerson = (id) =>{
    const req = axios.delete(`${baseUrl}/${id}`)
    return req
}

export default {getAll, createNew, deletePerson, updatePerson}