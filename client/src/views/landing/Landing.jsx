import React, { useEffect, useState } from 'react'
import logo from '../../assets/JUNTA-04-xs.png';
import {URL} from '../../../varGlobal';

import { IoMdEyeOff } from "react-icons/io";
import { conexion } from '../../utils/conexion';
import { useDispatch } from 'react-redux';
import { outUser, setUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
//import Modal from "../Modal/Modal";
import Modal from "../../components/Modal/Modal";
import {useModal} from '../../hooks/useModal';
import axios from "axios";
import { FiArrowDownCircle } from "react-icons/fi";

const Landing = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[validaUser, setValidaUser]=useState(false);
    const[mensajeLogin, setMensajeLogin]=useState('Registre sus Datos');

    const[mensajeModalInfo, setMensajeModalInfo]=useState('');
    const[isOpenModal, openModal, closeModal]=useModal(false);

    const[form,setForm]=useState({
        dni:'',
        password:'',
        apellido:'',
        nombre:'',
        cargo:'',
        escuela:'',
        modalidad:'',
        zona:'',
        email:'',
        permiso:2
    });
    const[ver,setVer]=useState(false);

    const handleVer=()=>{
        setVer(!ver);
    };

    const[dataValida, setDataValida]=useState('');

    const handleChange = (event)=>{
        const{name,value} = event.target;
        //console.log(name, value)
        if(name=='dni' || name=='password'){
            setForm({...form,[name]:value});
            //validaUsuario();
        }else{
            setForm({
                ...form,
                [name]:value.toUpperCase()
            })
        }
    };

    const submitHandler = async()=>{
        console.log('que tiene form: ', form);
        dispatch(setUser(dataValida[0]))
        navigate('/home');
    };

    const validaUsuario = async()=>{
        if(form.dni!='' && form.password!=''){
            const datavalida = await conexion(form);
            if(datavalida.length!=0){
                setValidaUser(true);
                setDataValida(datavalida);
                //dispatch(setUser(dataValida[0]));
                setMensajeLogin('Usuario Registrado, puede acceder')
            }else{
                setValidaUser(false);
                setDataValida('')
                //dispatch(outUser());
                setMensajeLogin('Registre sus Datos');
            }
        }
    }

    const submitRegister = async()=>{
        console.log('Ingresa a ValidaRegistro')
        if(form.dni=='' || form.password=='' || form.apellido=='' || form.nombre=='' || form.cargo=='' || form.escuela=='' || form.modalidad=='' || form.email==''){
            setMensajeLogin('Faltan cargar datos para registrarse')
        }else{
            await axios.post(`${URL}/api/registerusuario`,form)
                .then(async res=>{
                    setMensajeModalInfo('Docente Registrado, ingrese con su DNI y contraseña, para revisar el listado de inscriptos');
                    openModal();
                })
                .catch(error=>{
                    console.log('que trae error registerusuario: ', error);
                })
        }
    };

    const submitCloseModal = () =>{
        setForm({
            dni:'',
            password:'',
            apellido:'',
            nombre:'',
            cargo:'',
            escuela:'',
            modalidad:'',
            zona:'',
            email:'',
            telefono:'',
            permiso:2
        })
        closeModal();
    };

    useEffect(()=>{
        if(form.dni!=='' && form.password!==''){
            console.log('Ingresa a ValidaUsuario')
            validaUsuario();
        }
    },[form])

    useEffect(()=>{
        console.log('que tiene dataValida: ', dataValida)
    },[dataValida])

  return (
    <div>
        <div className="flex flex-col items-center">
            <div className="h-[15vh] flex flex-row justify-center items-center bg-[#729DA6] border border-b-slate-400 w-full shadow-md ">
                <div className="desktop:w-[90px] desktop:h-[90px] movil:w-[90px] movil:h-[80px] flex justify-center ">
                    <img className="desktop:w-[90px] desktop:h-[90px] movil:w-[80px] movil:h-[80px]" src={logo}/>
                </div>
                <div className="h-28  flex flex-col pl-4 justify-center items-center">
                    <label className="desktop:text-[38px] movil:text-xl font-bold text-white movil:text-center" translate='no'>Registro Permutas Definitivas 2025</label>
                    {/* <label className="desktop:text-[25px] movil:text-lg text-white font-semibold mt-4" translate='no'>Nivel {configSG.nivel?.descripcion}</label> */}
                </div>
            </div>

            <div className='mt-2 desktop:h-[80vh] desktop:w-[50vw] flex flex-col items-center border-2 desktop:border-sky-500 rounded-md'>
            <label className="text-[#729DA6] font-medium text-[20px] desktop:mb-4 desktop-xl:text-3xl " translate='no'>Ingreso y Registro</label>
                <div className="flex flex-col mt-2 mb-4 justify-center">
                    <div className="flex flex-col items-end">
                        <div className='flex flex-row desktop:my-2 movil:my-[4px]'>
                            <label className="text-base desktop-xl:text-xl">DNI:</label>
                            <input
                                className="mx-2 border-[1px] border-black rounded px-2 w-[250px] desktop-xl:text-xl"
                                value={form.dni}
                                onChange={handleChange}
                                name="dni"
                                type="number"
                            ></input>
                        </div>
                        <div className='flex flew-row desktop:my-2 movil:my-[4px] items-center'>
                            <label className="mt-2 text-base desktop-xl:text-xl">Contraseña:</label>
                            <div className="flex flex-row items-center border-[1px] border-black rounded mx-2 ">
                                <input
                                    className="ml-2 w-[225px] focus:outline-none desktop-xl:text-xl"
                                    value={form.password}
                                    onChange={handleChange}
                                    name="password"
                                    type={ver ? 'text' :'password'}      
                                    //onKeyPress={handleKeyPress}
                                ></input>
                                <IoMdEyeOff 
                                    className="desktop-xl:text-xl" 
                                    onClick={()=>handleVer()}
                                    />
                            </div>
                        </div>
                        <div className='flex w-full justify-center'>
                            <label 
                                className={`text-base italic desktop-xl:text-lg
                                    ${(validaUser)
                                        ?`text-sky-600 font-bold `
                                        :`text-red-500 font-bold`
                                    }
                                    
                                    `}
                            >{mensajeLogin}</label>
                            {(validaUser)
                                ?<FiArrowDownCircle className='ml-2 text-2xl text-sky-500 animate-bounce h-6 w-6' title='presione boton Acceder en la parte inferior'/>
                                :``
                            }
                            
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 items-end">
                        <div className='flex flex-row desktop:my-2 movil:my-[4px]'>
                            <label className="text-base desktop-xl:text-xl">Apellido:</label>
                            <input
                                className="mx-2 border-[1px] border-black rounded px-2 w-[250px] desktop-xl:text-xl"
                                value={form.apellido}
                                onChange={handleChange}
                                name="apellido"
                                type="text"
                            ></input>
                        </div>
                        <div className='flex flex-row desktop:my-2 movil:my-[4px]'>
                            <label className="text-base desktop-xl:text-xl">Nombre:</label>
                            <input
                                className="mx-2 border-[1px] border-black rounded px-2 w-[250px] desktop-xl:text-xl"
                                value={form.nombre}
                                onChange={handleChange}
                                name="nombre"
                                type="text"
                            ></input>
                        </div>
                        <div className='flex flex-row desktop:my-2 movil:my-[4px]'>
                            <label className="text-base desktop-xl:text-xl">Cargo:</label>
                            <input
                                className="mx-2 border-[1px] border-black rounded px-2 w-[250px] desktop-xl:text-xl"
                                value={form.cargo}
                                onChange={handleChange}
                                name="cargo"
                                type="text"
                                placeholder='Ej. MG, EF, EM, etc..'
                            ></input>
                        </div>
                        <div className='flex flex-row desktop:my-2 movil:my-[4px]'>
                            <label className="text-base desktop-xl:text-xl">Escuela:</label>
                            <input
                                className="mx-2 border-[1px] border-black rounded px-2 w-[250px] desktop-xl:text-xl"
                                value={form.escuela}
                                onChange={handleChange}
                                name="escuela"
                                type="text"
                                placeholder='Escuela donde es titular'
                            ></input>
                        </div>
                        <div className='flex flex-row desktop:my-2 movil:my-[4px]'>
                            <label className="text-base desktop-xl:text-xl">Modalidad:</label>
                            <input
                                className="mx-2 border-[1px] border-black rounded px-2 w-[250px] desktop-xl:text-xl"
                                value={form.modalidad}
                                onChange={handleChange}
                                name="modalidad"
                                type="text"
                                placeholder='Ej. JS, JC, etc...'
                            ></input>
                        </div>
                        <div className='flex flex-row desktop:my-2 movil:my-[4px]'>
                            <label className="text-base desktop-xl:text-xl">Zona:</label>
                            <input
                                className="mx-2 border-[1px] border-black rounded px-2 w-[250px] desktop-xl:text-xl"
                                value={form.zona}
                                onChange={handleChange}
                                name="zona"
                                type="number"
                            ></input>
                        </div>
                        <div className='flex flex-row desktop:my-2 movil:my-[4px]'>
                            <label className="text-base desktop-xl:text-xl">Telefono:</label>
                            <input
                                className="mx-2 border-[1px] border-black rounded px-2 w-[250px] desktop-xl:text-xl"
                                value={form.telefono}
                                onChange={handleChange}
                                name="telefono"
                                type="text"
                                placeholder='Su telefono para contacto'
                            ></input>
                        </div>
                        <div className='flex flex-row desktop:my-2 movil:my-[4px]'>
                            <label className="text-base desktop-xl:text-xl">Correo:</label>
                            <input
                                className="mx-2 border-[1px] border-black rounded px-2 w-[250px] desktop-xl:text-xl"
                                value={form.email}
                                onChange={handleChange}
                                name="email"
                                type="text"
                                placeholder='Correo Electronico...'
                            ></input>
                        </div>
                        
                    </div>

                    <div className="flex flex-col items-center mt-4">
                        {(validaUser)
                            ?<button
                            className="w-40 h-8 bg-[#729DA6] my-2 px-2 py-1 text-base font-medium text-white hover:bg-[#6A88F7] shadow-md rounded desktop-xl:h-10 desktop-xl:text-xl"
                            onClick={submitHandler}
                            translate='no'
                            id="botonEnter"
                            >Acceder</button>

                            :<button
                            className="w-40 h-8 bg-[#729DA6] my-2 px-2 py-1 text-base font-medium text-white hover:bg-[#6A88F7] shadow-md rounded desktop-xl:h-10 desktop-xl:text-xl"
                            onClick={submitRegister}
                            translate='no'
                            id="botonEnter"
                            >Registrarse</button>

                        }
                        
                        
                    </div>

                </div>
            </div>
        </div>

        {/* MODAL DE NOTIFICACION */}
        <Modal isOpen={isOpenModal} closeModal={closeModal}>
            <div className="mt-10 w-72">
                <h1 className="text-xl text-center font-bold">{mensajeModalInfo}</h1>
                <div className="flex justify-center">
                    <button
                        className="border-2 border-[#557CF2] mt-10 font-bold w-40 h-8 bg-[#557CF2] text-white hover:bg-sky-300 hover:border-sky-300"
                        onClick={()=>submitCloseModal()}
                    >OK</button>
                </div>
            </div>
        </Modal>
        
    </div>
  )
}

export default Landing