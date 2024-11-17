import React from 'react'
import Sidebar from '../sidebar/Sidebar';
import Inscriptos from '../../components/Inscriptos/Inscriptos';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <div className='h-full w-full fixed'>
            <div className='w-full h-[95vh] flex desktop:flex-row movil:flex-col'>
                {/* BARRA LATERAL DE NAVEGACION */}
                <div className='desktop:w-[15vw] desktop:h-[95vh] movil:w-full movil:h-[6vh]'>
                    {/* BARRA NAVEGACION */}
                    <Sidebar/>
                </div>
                {/* CONTENEDOR LATERAL DERECHO */}
                <div className='desktop:w-[85vw] desktop:h-[95vh] movil:w-full movil:h-[88vh]'>
                    <Inscriptos/>
                </div>
            </div>
            {/* CONTENEDOR INFERIOR */}
            <div className='w-full h-[5vh]'>
                <Footer/>
            </div>

    </div>
  )
}

export default Home;