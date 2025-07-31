import axios from 'axios'

const user = JSON.parse(localStorage.getItem('userdata'))




axios.defaults.headers.common['Authorization'] = `Bearer ${user?.accestoken}`


const registerUser = (data) => {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`,data)
}


const loginUser = (data) => {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`,data)
}

const creatNewNote = (data) => {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notes/create`,data)
}

const getNotes = (data)=>{
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notes/get/${user.id}`,data)
}
const updateNotes = (id,data)=>{
    return axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/notes/update/${id}`,data)
}
const deleteNotes = (id)=>{
    return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/notes/delete/${id}`)
}








export{registerUser,
    loginUser,
    creatNewNote,
    getNotes,
    deleteNotes,
    updateNotes
}