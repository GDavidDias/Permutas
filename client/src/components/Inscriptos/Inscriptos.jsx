import React, { useEffect, useState } from 'react'
import { fetchAllInscriptos } from '../../utils/fetchAllInsciptos';
import { useSelector } from 'react-redux';

const Inscriptos = () => {

    const userSG = useSelector((state)=>state.user);

    const[listadoInscriptos, setListadoInscriptos]=useState([])

    const cargaInscriptos = async()=>{
        const data = await fetchAllInscriptos();
        if(data?.lenght!=0){
            setListadoInscriptos(data);
        }else{
            setListadoInscriptos([]);
        }
    };

    useEffect(()=>{
        cargaInscriptos();
    },[])

  return (
    <div className='h-full w-full  '>
        {/* ENCABEZADO */}
        <div className='h-[8vh] bg-[#C9D991] flex justify-center items-center'>
            <label
                className='ml-4 font-semibold desktop:text-xl movil:text-lg movil:text-center'
            >Listado de Inscriptos de Primaria para Permutas Definitivas 2025</label>
        </div>
        {/* LISTADO */}
        <div className='desktop:h-[85vh] movil:h-[75vh] overflow-y-auto '>
            <table className='border-[1px] bg-slate-50 w-full desktop:w-[100%] movil:w-[210%] table-fixed'>
                <thead>
                    <tr className='sticky top-0 text-sm border-b-[2px] border-zinc-300 bg-zinc-200'>
                        <th className='w-[150px] border-r-[1px] border-zinc-400'>Nombre</th>
                        <th className='w-[90px] border-r-[1px] border-zinc-400'>Cargo</th>
                        <th className='w-[90px] border-r-[1px] border-zinc-400'>Escuela</th>
                        <th className='w-[90px] border-r-[1px] border-zinc-400'>Modalidad</th>
                        <th className='w-[30px] border-r-[1px] border-zinc-400 text-sky-500'>Zona</th>
                        <th className='w-[90px] border-r-[1px] border-zinc-400'>Telefono</th>
                        <th className='w-[200px] border-r-[1px] border-zinc-400'>Correo Electronico</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listadoInscriptos?.map((inscripto, index)=>{
                            const colorFila = (inscripto.dni===userSG.dni) ?`bg-orange-200` :(((inscripto.id_usuario %2)===0) ?`bg-zinc-200` :``)
                            return(
                                <tr
                                    className={`text-base font-medium border-b-[1px]  border-zinc-500 h-[5vh] ${colorFila}`}
                                    key={index}
                                >
                                    <td className='w-[150px] border-r-[1px] border-zinc-400'>{inscripto.apellido}, {inscripto.nombre}</td>
                                    <td className='w-[90px] text-center border-r-[1px] border-zinc-400'>{inscripto.cargo}</td>
                                    <td className='w-[90px] text-center border-r-[1px] border-zinc-400 break-all'>{inscripto.escuela}</td>
                                    <td className='w-[90px] text-center border-r-[1px] border-zinc-400'>{inscripto.modalidad}</td>
                                    <td className='w-[30px] text-center border-r-[1px] border-zinc-400  text-sky-600'>{inscripto.zona}</td>
                                    <td className='w-[90px] text-center border-r-[1px] border-zinc-400 pl-2'>{inscripto.telefono}</td>
                                    <td className='w-[200px] border-r-[1px] border-zinc-400 text-start pl-2 break-all'>{inscripto.email}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Inscriptos;