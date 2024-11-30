import React, { useEffect, useState } from 'react'
import { fetchAllInscriptos } from '../../utils/fetchAllInsciptos';
import { useSelector } from 'react-redux';

const Inscriptos = () => {

    const userSG = useSelector((state)=>state.user);

    const[listadoInscriptos, setListadoInscriptos]=useState([]);

    const[filtroEspecialidad, setFiltroEspecialidad]=useState("");

    const[listadoEspecialidades, setListadoEspecialidades]=useState([
        {id:1, abreviatura:"M.G.", descripcion:"MAESTRO/A DE GRADO"},
        {id:2, abreviatura:"M.G.", descripcion:"MAESTRO/A DE GRADO DIFERENCIAL"},
        {id:3, abreviatura:"M.G.", descripcion:"ACTIVIDADES PRACTICAS"},
        {id:4, abreviatura:"M.G.", descripcion:"CERAMICA"},
        {id:5, abreviatura:"M.G.", descripcion:"DANZA"},
        {id:6, abreviatura:"M.G.", descripcion:"DANZA FOLCLORICA"},
        {id:7, abreviatura:"M.G.", descripcion:"DIRECTOR/A"},
        {id:8, abreviatura:"M.G.", descripcion:"EDUCACION FISICA"},
        {id:9, abreviatura:"M.G.", descripcion:"EDUCACION MUSICAL"},
        {id:10, abreviatura:"M.G.", descripcion:"EXPRESION PLASTICA"},
        {id:11, abreviatura:"M.G.", descripcion:"EXPRESION CORPORAL"},
        {id:12, abreviatura:"M.G.", descripcion:"FRANCES"},
        {id:13, abreviatura:"M.G.", descripcion:"INGLES"},
        {id:14, abreviatura:"M.G.", descripcion:"PORTUGUES"},
        {id:15, abreviatura:"M.G.", descripcion:"SECRETARIO/A DOCENTE"},
        {id:16, abreviatura:"M.G.", descripcion:"SUPERVISOR/A GENERAL"},
        {id:17, abreviatura:"M.G.", descripcion:"SUPERVISOR/A ZONAL"},
        {id:18, abreviatura:"M.G.", descripcion:"TECNICO/A AGROPECUARIA"},
        {id:19, abreviatura:"M.G.", descripcion:"TALLER RURAL"},
        {id:20, abreviatura:"M.G.", descripcion:"TEATRO"},
        {id:21, abreviatura:"M.G.", descripcion:"TELAR"},
        {id:22, abreviatura:"M.G.", descripcion:"VICE DIRECTOR/A"},
        {id:23, abreviatura:"M.G.", descripcion:"SECRETARIO/A DOCENTE DIFERENCIAL"},
        {id:24, abreviatura:"M.G.", descripcion:"PANADERIA"},
        {id:25, abreviatura:"M.G.", descripcion:"COCINA"},
        {id:26, abreviatura:"M.G.", descripcion:"CARPINTERIA"},
        {id:27, abreviatura:"M.G.", descripcion:"ARTESANIA"},
        {id:28, abreviatura:"M.G.", descripcion:"FILIGRANA"},
        {id:29, abreviatura:"M.G.", descripcion:"INFORMATICA"},
        {id:30, abreviatura:"M.G.", descripcion:"LENGUAJE DE SEÑAS"},
        {id:31, abreviatura:"M.G.", descripcion:"MIMBRERIA"},
        {id:32, abreviatura:"M.G.", descripcion:"TALLER RURAL"},
        {id:33, abreviatura:"M.G.", descripcion:"TECNOLOGIA"},
        {id:34, abreviatura:"M.G.", descripcion:"MAESTRA/O DE JARDIN"}
    ]);

    const handleSelectFiltroEspecialidad=(event)=>{
        const{value} = event.target;
        console.log('que tiene filtroEspecialidad: ', value);
        setFiltroEspecialidad(value);
        //setCurrentPageVac(1);
        //al seleccionar una especialidad, regrso a la primer pagina, por si no hay tantos inscriptos
        //setCurrentPage(1);
        //getInscriptosTit(idListadoInscriptosTit,currentPage,estadoInscripto,inputSearch,value);
    };

    const handleCancelFiltroEspecialidad = () =>{
        setFiltroEspecialidad("");
    };

    const cargaInscriptos = async()=>{

        const data = await fetchAllInscriptos(filtroEspecialidad);
        if(data?.lenght!=0){
            setListadoInscriptos(data);
        }else{
            setListadoInscriptos([]);
        }
    };

    useEffect(()=>{
        console.log('que guarda filtroEspecialidad: ', filtroEspecialidad);
        cargaInscriptos();
    },[filtroEspecialidad])

    useEffect(()=>{
        cargaInscriptos();
    },[])

  return (
    <div className='h-full w-full notranslate '>
        {/* ENCABEZADO */}
        <div className='h-[8vh] bg-[#C9D991] flex flex-col justify-center items-center'>
            {/* <label
                className='ml-4 font-semibold desktop:text-xl movil:text-lg movil:text-center'
            >Listado de Inscriptos de Inicial y Primaria para Permutas Definitivas 2025</label> */}
            <label
                className='ml-4 font-semibold desktop:text-xl movil:text-lg movil:text-center'
            >Inscriptos para Permutas Definitivas 2025</label>
            {/* FILTRO ESPECIALIDAD */}
            <div className="flex flex-row my-[4px]">
                {/* <label className="mx-4 text-base desktop-xl:text-lg ">Especialidad: </label> */}
                <div className="border-[1px] h-[26px] rounded border-zinc-400 bg-neutral-50">
                    <select
                        className="w-[80vw] h-[24px] border-[1px] rounded focus:outline-none focus:ring-0 focus:border-none"
                        name="filtroEspecialidad"
                        onChange={handleSelectFiltroEspecialidad}
                        value={filtroEspecialidad}
                    >
                        <option value='' selected disabled>Seleccione Especialidad...</option>
                        {
                            listadoEspecialidades?.map((especialidad,index)=>(
                                <option 
                                    key={index} 
                                    value={especialidad.id}
                                    className="text-base"
                                >{especialidad.descripcion}</option>
                            ))
                        }
                    </select>
                    {(filtroEspecialidad!="") &&
                        <label 
                            className="font-bold mx-2 cursor-pointer"
                            onClick={handleCancelFiltroEspecialidad}
                        >X</label>
                    }
                </div>
            </div>
        </div>
        {/* LISTADO */}
        <div className='desktop:h-[85vh] movil:h-[75vh] overflow-y-auto '>
            <table className='border-[1px] bg-slate-50 w-full desktop:w-[100%] movil:w-[210%] table-fixed'>
                <thead>
                    <tr className='sticky top-0 text-sm border-b-[1px] border-zinc-600 bg-purple-200'>
                        <th className='w-[150px] border-r-[1px] border-zinc-600'>Nombre</th>
                        <th className='w-[90px] border-r-[1px] border-zinc-600'>Cargo</th>
                        <th className='w-[90px] border-r-[1px] border-zinc-600'>Esc / JI / JIN</th>
                        <th className='w-[90px] border-r-[1px] border-zinc-600'>Modalidad</th>
                        <th className='w-[40px] border-r-[1px] border-zinc-600 text-sky-500'>Zona</th>
                        <th className='w-[50px] border-r-[1px] border-zinc-600 text-sky-500'>Region Actual</th>
                        <th className='w-[80px] border-r-[1px] border-zinc-600 text-sky-500'>Region/es Solicitada/s</th>
                        <th className='w-[100px] border-r-[1px] border-zinc-600'>Telefono</th>
                        <th className='w-[200px] border-r-[1px] border-zinc-600'>Correo Electronico</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listadoInscriptos?.map((inscripto, index)=>{
                            const colorFila = (inscripto.dni===userSG.dni) ?`bg-orange-200` :(((inscripto.id_usuario %2)===0) ?`bg-zinc-200` :``)
                            if(inscripto.dni===1234) return null;
                            return(
                                <tr
                                    className={`text-base font-medium border-b-[1px]  border-zinc-500 h-[5vh] ${colorFila}`}
                                    key={index}
                                >
                                    <td className='w-[150px] border-r-[1px] border-zinc-400'>{inscripto.apellido}, {inscripto.nombre}</td>
                                    <td className='w-[90px] text-center border-r-[1px] border-zinc-400'>{inscripto.cargo}</td>
                                    <td className='w-[90px] text-center border-r-[1px] border-zinc-400 break-all'>{inscripto.escuela}</td>
                                    <td className='w-[90px] text-center border-r-[1px] border-zinc-400'>{inscripto.modalidad}</td>
                                    <td className='w-[40px] text-center border-r-[1px] border-zinc-400  text-sky-600'>{inscripto.zona}</td>
                                    <td className='w-[50px] text-center border-r-[1px] border-zinc-400  text-sky-600'>{inscripto.region_actual}</td>
                                    <td className='w-[80px] text-center border-r-[1px] border-zinc-400  text-sky-600'>{inscripto.region_solicitada}</td>
                                    <td className='w-[100px] text-center border-r-[1px] border-zinc-400 pl-2 break-all'>{(inscripto.telefono) ?inscripto.telefono :``}</td>
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