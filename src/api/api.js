import axios from 'axios';


const URL = 'http://localhost:4000'


export const getAllZonas = async ()=>{
    const req = await axios.get(`${URL}/zonas`)
    return req.data
}

export const createZona = async (data)=> {
    try {
        const req = await axios.post(`${URL}/zonas`, data)
        console.log("post realizado correctamente",req)
        return req.data
    } catch (error) {
        console.error(error)
    }
}


export const searchZonas = async (query)=>{
    try {
        const res = await axios.get(`${URL}/zonas/buscar?nombre=${encodeURIComponent(query)}`)
        console.log("post realizado correctamente",res)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export const searchZonaById = async (id)=>{
    try {
        const res = await axios.get(`${URL}/zonas/${id}`)
        console.log("obtenido correactamente",res)
        return res.data
    } catch (error) {
        console.error(error)
    }
}