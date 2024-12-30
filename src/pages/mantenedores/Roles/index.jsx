import { useState, useEffect } from 'react';
import RoleModal from '../../../components/modals/RoleModal';
import RolesTable from '../../../components/tables/RolesTable';
import { getRole, getRoles, createRole, updateRole, deleteRole } from '../../../services/rolesService';

import { IoMdAddCircle } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { MdFirstPage,MdLastPage } from 'react-icons/md';

const Roles = () =>{
    const [roles, setRoles] = useState([]);
    const [originalRoles, setOriginalRoles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [modalMode, setModalMode] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [error, setError] = useState(null);
    const limit = 10;

    useEffect(()=>{handleFetchAll()},[offset]);

    //Metodos para la paginacion
    const handleNextPage = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };
  
    const handlePreviousPage = () => {
        setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
    };

    //Metodos para el buscador
    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputValue.trim() !== ''){
            handleFetchOne(inputValue);
        }
    };

    const handleResetRoles = () =>{
        setRoles(originalRoles);
        setInputValue('')
    };

    //Consumo de endpoints
    const handleFetchAll = async () =>{
        try {
            const data = await getRoles(offset, limit);
            setRoles(data);
            setOriginalRoles(data);
        } catch (err) {
            setError(err);
            console.error(error);
        }
    }

    const handleFetchOne = async (id) =>{
        try {
            const result = await getRole(id);
            setRoles([result]);
        } catch (err) {
            setError(err);
            console.error(error);
        }
    }

    const handleCreate = async (data) =>{
        try {
            const result = await createRole(data);
            console.log(result);
        } catch (err) {
            setError(err);
            console.error(error);
        }
    }

    const handleEdit = async (id, data) =>{
        if(confirm('¿Estás seguro de que deseas editar este role?')){
            try {
                const {idRole, ...updatedData} = data;
                console.log(updatedData);
                await updateRole(id, updatedData); 
            } catch (err) {
                setError(err);
                console.error(error);
            }
        }
    }

    const handleDelete = async (id) =>{
        if(confirm('¿Estás seguro de que deseas editar este role?')){
            try {
                const result = await deleteRole(id);
                setRoles((prev)=> prev.filter((role)=>role.idRole !==id));
                setOriginalRoles((prev)=> prev.filter((role)=>role.idRole !==id));
                setError(result.message);
            } catch (err) {
                setError(err);
                console.error(error);
            }
        }
        
    }

    //MEtodo para la operacion del modal
    const openShowModal = (role)=>{
        setSelectedRole(role);
        setModalMode('show');
        setIsModalOpen(true);
    };

    const openEditModal = (role)=>{
        setSelectedRole(role);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const openCreateModal = ()=>{
        setModalMode('create');
        setIsModalOpen(true)
    };

    const closeModal = () =>{
        setSelectedRole(null);
        setModalMode('');
        setIsModalOpen(false);
    };


    return (
        <div className='bg-white w-full h-screen overflow-y-auto'>
            {error && (
                <div className='bg-black text-white p-2 text-center'>
                {error}
                </div>
            )}

            <div className='flex flex-col lg:flex-row items-center justify-evenly px-6 pt-6 pb-2 mx-6 mt-6 mb-2'>
                <h3 className='text-3xl font-kanit font-kanit-bold'>Roles</h3>
                <form  
                    onSubmit={handleSubmit} 
                    className='flex justify-center items-center'>
                    <input 
                        type='text'  
                        className='bg-white px-4 py-2 rounded-2xl border border-gray-300'
                        placeholder='Buscar rol por ID'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        type='submit'
                        className='bg-gray-300 p-4 m-2 rounded-full transition delay-50 hover:bg-gray-700 hover:-translate-y-2 hover:scale-110 hover:text-white'
                    >
                        <FaSearch />
                    </button>
                </form>
                <div className='flex items-center justify-center'>
                    <button 
                        onClick={() => openCreateModal()} 
                        className='flex items-center justify-center text-black bg-green-500 p-2 m-2 rounded-xl transition delay-50 hover:bg-green-700 hover:-translate-y-2 hover:scale-110 hover:text-white shadow-md shadow-green-200'>
                        <h1 className='mx-2 hover:text-white'>Agregar nuevo rol</h1>
                        <IoMdAddCircle className='mx-2' />
                    </button>
                </div>

            </div>

            <RolesTable
                roles = {roles}
                onEdit = {openEditModal}
                onShow= {openShowModal}
                onDelete = {handleDelete}
            />

            <RoleModal
                isOpen= {isModalOpen}
                mode=  {modalMode}
                role=  {selectedRole}
                onClose=  {closeModal}
                onSave= {(data) => setSelectedRole(data)}
                handleEdit= {handleEdit}
                handleCreate= {handleCreate}
            />

            {roles.length === originalRoles.length && (
                <div className='flex items-center justify-center my-4'>
                    <button 
                        onClick={handlePreviousPage} 
                        disabled={offset === 0}
                        className='text-black border-slate-800 rounded-s-full mr-4 transition delay-50 hover:text-white hover:bg-black border hover:-translate-y-2 hover:scale-110 shadow-sm shadow-black'>
                        <MdFirstPage className='w-6 h-6'/>
                    </button>
                    <button 
                        onClick={handleNextPage}
                        className='text-black border border-slate-800 rounded-e-full ml-4 transition delay-50 hover:text-white hover:bg-black hover:-translate-y-2 hover:scale-110 shadow-sm shadow-black'>
                        <MdLastPage className='w-6 h-6'/>
                    </button>
                </div>)}

                {roles.length !== originalRoles.length && (
                    <div className='flex justify-center mt-4'>
                        <button 
                        onClick={handleResetRoles} 
                        className='bg-blue-500 text-white px-4 py-2 rounded-lg transition delay-50 hover:bg-blue-700 hover:-translate-y-2 hover:scale-110 hover:text-zinc-300 shadow-md shadow-blue-200'>
                        Regresar a la lista completa
                        </button>
                    </div>
                )}
        </div>
    );
}

export default Roles;