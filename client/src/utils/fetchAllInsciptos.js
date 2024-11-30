import axios from 'axios';
import { URL } from '../../varGlobal';

export const fetchAllInscriptos = async(filtroEspecialidad) => {
    const body={
        filtroEspecialidad:filtroEspecialidad
    }

    console.log('como pasa body a getinscriptos: ', body);

    try{
        const {data} = await axios.post(`${URL}/api/getinscriptos`,body);

        return data;
    }catch(error){
        console.log('error en fechAllInscriptos: ', error.message);
    }
}