import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logotipo from '../Logotipo';
import { RiHome9Fill } from "react-icons/ri";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaWindowRestore } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import DropdownMenu from '../Desplegable';

import { useAuth } from '../../context/AuthContext';


const Sidebar = () =>{
    const [isOpenSidebar, setIsOpenSidebar] = useState(false)
    const [isOpenMantenedores, setIsOpenMantenedores] = useState(false);

    const { logout } = useAuth(); // Obtener la función logout del contexto
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout(); // Ejecutar el logout
        navigate('/login'); // Redirigir a /login
    };

    const updateIsOpenMantenedores = () =>{
        setIsOpenMantenedores(!isOpenMantenedores)
    }

    return (
        <>
        {/* Botón para abrir/cerrar el Sidebar */}
        <button
            className="lg:hidden p-4 bg-stone-900 text-white absolute bottom-0 left-0 z-50 rounded-full "
            onClick={() => setIsOpenSidebar(!isOpenSidebar)}
        >
            {isOpenSidebar ? 'Cerrar' : 'Menú'}
        </button>
        <aside className={`fixed lg:static top-0 left-0 h-screen w-64 lg:w-1/6 bg-black text-white transform 
        ${
            isOpenSidebar ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 overflow-y-auto`}

            onClick={() => {
                if (isOpenMantenedores) {
                updateIsOpenMantenedores(); 
                }
            }}>
            {/* Logotipo */}
            <Logotipo/>
            {/* Enlaces */}
            <nav className='flex flex-col justify-items-center justify-center p-4 space-y-4 m-4 '>
                <div>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            `flex flex-col lg:flex-row p-2 items-center rounded-xl font-sans font-semibold m-2 ${
                                isActive
                                    ? 'bg-gradient-to-r from-purple-500 to-rose-300'
                                    : 'hover:bg-gradient-to-r from-purple-500 to-rose-300'
                            }`
                        }
                    >
                        <RiHome9Fill className='m-2'/>
                        Inicio
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        to='/inventario'
                        className={({ isActive }) =>
                            `flex flex-col lg:flex-row p-2 items-center rounded-xl font-sans font-semibold m-2 ${
                                isActive
                                    ? 'bg-gradient-to-r from-purple-500 to-rose-300'
                                    : 'hover:bg-gradient-to-r from-purple-500 to-rose-300'
                            }`
                        }
                    >
                        <FaWindowRestore className='m-2'/>
                        Inventario
                    </NavLink>
                </div>

                <div>
                    <NavLink
                        to='/ventas'
                        className={({ isActive }) =>
                            `flex flex-col lg:flex-row p-2 items-center rounded-xl font-sans font-semibold m-2 ${
                                isActive
                                    ? 'bg-gradient-to-r from-purple-500 to-rose-300'
                                    : 'hover:bg-gradient-to-r from-purple-500 to-rose-300'
                            }`
                        }
                    >
                        <RiMoneyDollarCircleFill className='m-2'/>
                        Ventas
                    </NavLink>  
                </div>
                {/*Mantenedores*/}
                <DropdownMenu isOpenMantenedores={isOpenMantenedores} updateIsOpenMantenedores = {updateIsOpenMantenedores}/>
                 
            </nav>
            {/* Footer */}
            <div className="px-4 mx-6 border-t border-x-zinc-400">
            </div>
            <nav className='flex flex-col justify-center justify-items-center p-4 space-y-4 m-4 '>
                <div>
                    <NavLink
                        to='/cuenta-usuario'
                        className={({ isActive }) =>
                            `flex flex-col lg:flex-row p-2 items-center rounded-xl font-sans font-semibold m-2 ${
                                isActive
                                    ? 'bg-gradient-to-r from-purple-500 to-rose-300'
                                    : 'hover:bg-gradient-to-r from-purple-500 to-rose-300'
                            }`
                        }
                    >
                        <FaUserCircle className='m-2'/>
                        Mi cuenta
                    </NavLink> 
                </div>
                <div className='flex justify-center'>
                    <button 
                        onClick={handleLogout} // Llamar a handleLogout al hacer clic
                        className='flex flex-col lg:flex-row p-2 m-2 items-center rounded-xl hover:bg-gradient-to-r from-purple-500 to-rose-300 font-sans font-semibold'>
                        <IoLogOut className='m-2' />
                        Cerrar Sesión
                    </button>
                </div>
            </nav>
        </aside>
        </>
    );
}

export default Sidebar;
