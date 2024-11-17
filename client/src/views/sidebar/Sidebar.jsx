import React, { useEffect, useState } from 'react'
import logo from '../../assets/JUNTA-04-xs.png';
import { PiUserListBold, PiListMagnifyingGlassBold  } from "react-icons/pi";
import { FaRegUserCircle, FaPowerOff  } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { outUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSG = useSelector((state)=>state.user);

  const[open, setOpen]=useState(false);


  const submitSalir = () =>{
    navigate('/')
    dispatch(outUser());
  }

  useEffect(()=>{
    console.log('que tiene userSG: ', userSG);
    if(userSG.id_usuario===''){
      navigate('/');
    }
  },[userSG])

  return (
    <nav>
      {/* MENU MOVIL */}
      <div className="notranslate desktop:hidden bg-[#729DA6] h-[6vh] shadow-md">
        <div className="text-[30px] text-slate-50 flex flex-row justify-between">
            <IoMdMenu 
                className="text-slate-50 text-4xl font-bold "
                onClick={()=>{setOpen(!open)}}
                //onMouseEnter={()=>{setOpen(!open)}}
            />
            <div className="flex flex-row items-center justify-end mr-2">
                <label className="pr-2 italic text-sm">{userSG.dni}</label>
                <FaRegUserCircle className="text-2xl text-slate-50 " />
            </div>
            
        </div>
            <div 
                className={`absolute bg-[#006489] opacity-90 text-[24px] left-0 text-center z-50 w-[100vw] h-[100vh] font-['Helvetica']
                        ${(open)
                            ?` visible`
                            :` invisible`
                        }
                    `}
            >
                <ul >
                    <li className="my-8 text-slate-50"
                        //onClick={()=>cierraSesion()}
                        onClick={()=>{submitSalir(); setOpen(false)}}
                        translate='no'
                    >Salir</li>
                </ul>
            </div>
      </div>
      {/* MENU ESCRITORIO */}
      <div className="notranslate movil:hidden desktop:flex flex-col bg-[#7C8EA6] w-full h-[95vh] shadow-right-only-md ">
        {/* LOGO Y TITULO APP */}
        <div className='flex flex-col items-center'>
          <div className="flex h-[8vh] w-[30%]">
            <img src={logo} className="max-w-full max-h-full object-contain"/>
          </div>
          <div className='flex text-white'>
            <p className='text-center'>Registro Permutas Definitivas 2025</p>
          </div>


        </div>

        {/* MENU */}
        <div className='ml-2 mt-4 text-white text-base'>
          <div 
            className={` rounded p-[4px] flex flex-row justify-start items-center  text-white hover:bg-[#C9D991] `}
            //onClick={()=>submitVacantesMov()}
          >
            <PiListMagnifyingGlassBold className="text-xl font-bold mr-2"/>
            <label className="font-light desktop-xl:text-lg">Inscriptos</label>
          </div>
          <div 
            className={` rounded p-[4px] flex flex-row justify-start items-center  text-white hover:bg-[#C9D991] `}
            onClick={()=>submitSalir()}
          >
            <FaPowerOff className="text-lg  mr-2"/>
            <label className="font-light desktop-xl:text-lg">Salir</label>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar