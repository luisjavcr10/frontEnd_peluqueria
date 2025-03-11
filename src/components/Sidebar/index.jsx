import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Logotipo from '../Logotipo';
import SidebarElement from '../SIdebarElement';
import LogOutButton from '../buttons/LogOutButton'

import { RiHome9Fill,RiMoneyDollarCircleFill } from 'react-icons/ri';
import { FaWindowRestore } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';
import { IoLogOut,IoMenu } from 'react-icons/io5';
import { GrDocumentStore } from 'react-icons/gr';

const Sidebar = () =>{
    const [isOpenSidebar, setIsOpenSidebar] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false);

    const { logout } = useAuth();
    const navigate = useNavigate(); 

    const handleModalLogOut = () =>{
        setIsOpenModal(!isOpenModal);
    }

    const handleLogout = () => {
        logout(); 
        navigate('/login'); 
    };

    const elements = [
        { name: 'Inicio', path: '/', icon: (className) => <RiHome9Fill className={className}/> },
        { name: 'Inventario', path: '/inventario', icon: (className) => <FaWindowRestore className={className} /> },
        { name: 'Ventas', path: '/ventas', icon: (className) => <RiMoneyDollarCircleFill className={className} /> },
        { name: 'Mantenedores', path: '/mantenedores', icon: (className) => <GrDocumentStore className={className} /> },
        { name: 'Mi cuenta', path: '/cuenta-usuario', icon: (className) => <FaUserCircle className={className} /> },
    ];
    
    return (
        <>
        {/* Botón para abrir/cerrar el Sidebar */}
        <button
            className='lg:hidden p-3 bg-gray-700 text-white absolute bottom-0 left-0 z-50 rounded-xl '
            onClick={() => setIsOpenSidebar(!isOpenSidebar)}
        >
            {isOpenSidebar ? 'Cerrar' : <IoMenu className='text-xl text-white' />}
        </button>

        <aside
            className={`fixed lg:static top-0 left-0 h-screen w-80 lg:w-72 bg-black text-white z-50 transform 
                ${
                    isOpenSidebar ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 transition-transform duration-300 overflow-y-auto`}
        >

            <Logotipo/>

            <nav className='flex flex-col justify-items-center justify-center p-4 space-y-4 m-4 '>
                {elements.map((element, index) => (
                    <SidebarElement key={index} name={element.name} path={element.path}>
                        {element.icon('m-2')}
                    </SidebarElement>
                ))}

                <div className='flex justify-start bg-gradient-to-r from-zinc-900 to-slate-700 rounded-xl'>
                    <button 
                        onClick={handleModalLogOut} // Llamar a handleLogout al hacer clic
                        className='flex flex-col lg:flex-row p-2 m-2 w-full items-center rounded-xl text-white hover:bg-gradient-to-r from-zinc-300 to-slate-400 hover:text-black font-sans font-semibold'>
                        <IoLogOut className='m-2' />
                        Cerrar Sesión
                    </button>
                </div> 
            </nav>
        </aside>

        {isOpenModal && 
            <div className='fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50'>
                
                <div className='flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                    <h1 className='text-xl font-kanit font-kanit-bold text-gray-800'>¿Estas seguro de cerrar sesión?</h1>
                    <div className='flex flex-row text-white font-semibold'>
                        <LogOutButton handleClick={handleModalLogOut} message={'Regresar'} background={'bg-gradient-to-r  from-gray-300 to-gray-600'}/>
                        <LogOutButton handleClick={handleLogout} message={'Cerrar Sesión'} background={'bg-gradient-to-r from-red-900 to-red-400'}/>
                    </div>
                    
                </div>
            </div>
        }

        </>
    );
}

export default Sidebar;

// onClick - message - color
