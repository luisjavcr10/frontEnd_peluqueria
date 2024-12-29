import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Logotipo from '../Logotipo';
import { RiHome9Fill } from "react-icons/ri";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaWindowRestore } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import DropdownMenu from '../Desplegable';

import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () =>{
    const [isOpenSidebar, setIsOpenSidebar] = useState(false)
    const [isOpenMantenedores, setIsOpenMantenedores] = useState(false);
    const {logout: authLogOut} = useAuth();
    const navigate = useNavigate();

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
        } lg:translate-x-0 transition-transform duration-300`}
            onClick={() => {
                if (isOpenMantenedores) {
                updateIsOpenMantenedores(); // Solo se ejecuta si isOpen es true
                }
            }}>
            {/* Logotipo */}
            <Logotipo/>
            {/* Enlaces */}
            <nav className='flex-1 p-4 space-y-4 m-4 '>
                <div className='flex flex-row p-2 items-center rounded-xl hover:bg-gradient-to-r from-purple-500 to-rose-300 font-sans font-semibold '>
                    <RiHome9Fill className='m-2'/>
                    <NavLink
                        to='/'
                        className='m-2'
                    >
                        Inicio
                    </NavLink>
                </div>
                <div className='flex flex-row p-2 items-center rounded-xl hover:bg-gradient-to-r from-purple-500 to-rose-300 font-sans font-semibold '>
                    <FaWindowRestore className='m-2'/>
                    <NavLink
                        to='/inventario'
                        className='m-2'
                    >
                        Inventario
                    </NavLink>
                </div>

                <div className='flex flex-row p-2 items-center rounded-xl hover:bg-gradient-to-r from-purple-500 to-rose-300 font-sans font-semibold '>
                    <RiMoneyDollarCircleFill className='m-2'/>
                    <NavLink
                        to='/ventas'
                        className='m-2'
                    >
                        Ventas
                    </NavLink>  
                </div>
                {/*Mantenedores*/}
                <DropdownMenu isOpenMantenedores={isOpenMantenedores} updateIsOpenMantenedores = {updateIsOpenMantenedores}/>
                
                
                
                 
            </nav>
            {/* Footer */}
            <div className="px-4 mx-6 border-t border-x-zinc-400">
            </div>
            <nav className='flex-1 p-4 space-y-4 m-4'>
                <div className='flex flex-row p-2 items-center rounded-xl hover:bg-gradient-to-r from-purple-500 to-rose-300 font-sans font-semibold '>
                    <FaUserCircle className='m-2'/>
                    <NavLink
                        to='/cuenta-usuario'
                        className='m-2'
                    >
                        Mi cuenta
                    </NavLink> 
                </div>
                <button className='flex flex-row p-2 items-center rounded-xl hover:bg-gradient-to-r from-purple-500 to-rose-300 font-sans font-semibold'>
                    <IoLogOut className='m-2'/>
                        Cerrar Sesión
                </button>   
            </nav>
        </aside>
        </>
    );
}

export default Sidebar;