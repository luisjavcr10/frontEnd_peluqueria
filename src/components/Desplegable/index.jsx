import { useState } from 'react';
import { GrDocumentStore } from 'react-icons/gr';
import { NavLink } from 'react-router-dom';
import { MdCategory } from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';
import { PiOfficeChairFill } from 'react-icons/pi';
import { FaUserLock } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';

const DropdownMenu = ({isOpenMantenedores, updateIsOpenMantenedores}) => {

  return (
    <>
      {/* Botón principal */}
      <div
        onClick={updateIsOpenMantenedores}
        className='flex flex-col lg:flex-row p-2 m-2 items-center rounded-xl hover:bg-gradient-to-r from-zinc-300 to-slate-400 text-white hover:text-black font-sans font-semibold cursor-pointer'
      >
        <GrDocumentStore className='m-2' />
        Mantenedores
      </div>

      {/* Menú desplegable */}
      {isOpenMantenedores && (
        <div className='absolute left-8 lg:left-12 mt-2 w-48 bg-gradient-to-r from-zinc-300 to-slate-400 font-sans font-semibold cursor-pointer shadow-lg rounded-lg z-50'>
          <ul className='flex flex-col'>
            <li className='flex flex-row items-center text-black hover:bg-zinc-200 rounded-lg'>
                <MdCategory className='mx-4'/>
                <NavLink
                    to='/categorias'
                    className='block p-2 '
                    onClick={updateIsOpenMantenedores} // Cierra el menú al seleccionar
                >
                    Categorias
                </NavLink>
            </li>
            <li className='flex flex-row items-center text-black hover:bg-zinc-200 rounded-lg'>
                <PiOfficeChairFill className='mx-4'/>
                <NavLink
                    to='/servicios'
                    className='block p-2'
                    onClick={updateIsOpenMantenedores}
                >
                    Servicios
                </NavLink>
            </li>
            <li className='flex flex-row items-center text-black hover:bg-zinc-200 rounded-lg'>
                <FaUserLock className='mx-4'/>
                <NavLink
                    to='/roles'
                    className='block p-2 '
                    onClick={updateIsOpenMantenedores}
                >
                    Roles
                </NavLink>
            </li>
            <li className='flex flex-row items-center text-black hover:bg-zinc-200 rounded-lg '>
                <FaUserGroup className='mx-4'/>
                <NavLink
                    to='/empleados'
                    className='block p-2 '
                    onClick={updateIsOpenMantenedores}
                >
                    Empleados
                </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default DropdownMenu;
