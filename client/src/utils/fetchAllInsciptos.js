import axios from 'axios';
import { URL } from '../../varGlobal';

export const fetchAllInscriptos = async() => {
    try{
        const {data} = await axios.get(`${URL}/api/getinscriptos`);

        return data;
    }catch(error){
        console.log('error en fechAllInscriptos: ', error.message);
    }
}