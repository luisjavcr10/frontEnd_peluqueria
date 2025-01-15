import { useState, useEffect } from 'react';

import { getRole, getRoles, createRole, updateRole, deleteRole } from '../../../services/rolesService';

import BasicModal from '../../../components/modals/BasicModal';
import BasicTable from '../../../components/tables/BasicTable';
import Subtitle from '../../../components/text/Subtitle';
import FormSearch from '../../../components/forms/FormSearch';
import AddButton from '../../../components/buttons/AddButton';
import PaginationButton from '../../../components/buttons/PaginationButton';
import BackButton from '../../../components/buttons/BackButton';

const Roles = () =>{
    const [roles, setRoles] = useState([]);
    const [originalRoles, setOriginalRoles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [modalMode, setModalMode] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [message, setMessage] = useState(null);
    const limit = 10;
    const tableMode = 'Rol'

    useEffect(()=>{handleFetchAll()},[offset]);

    const handleInputValue = (e) =>{
        setInputValue(e.target.value);
      }

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
            setMessage(err);
            console.error(message);
        }
    }

    const handleFetchOne = async (id) =>{
        try {
            const result = await getRole(id);
            setRoles([result]);
        } catch (err) {
            setMessage(err);
            console.error(message);
        }
    }

    const handleCreate = async (data) =>{
        try {
            const result = await createRole(data);
            console.log(result);
        } catch (err) {
            setMessage(err);
            console.error(message);
        }
    }

    const handleEdit = async (id, data) =>{
        if(confirm('¿Estás seguro de que deseas editar este role?')){
            try {
                const {idRole, ...updatedData} = data;
                console.log(updatedData);
                await updateRole(id, updatedData); 
            } catch (err) {
                setMessage(err);
                console.error(message);
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
                setMessage(err);
                console.error(message);
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
            {message && (
                <div className='bg-black text-white p-2 text-center'>
                {message}
                </div>
            )}

            <div className='flex flex-col lg:flex-row items-center justify-evenly px-6 pt-6 pb-2 mx-6 mt-6 mb-2'>
                <Subtitle word={'Roles'}/>
                <FormSearch submit={handleSubmit} input={inputValue} handleInput={handleInputValue}/>
                <AddButton onOpen={() => openCreateModal()} word={'rol'}/>
            </div>

            <BasicTable
                entities = {roles}
                mode={tableMode}
                onEdit = {openEditModal}
                onShow= {openShowModal}
                onDelete = {handleDelete}
            />

            <BasicModal
                isOpen= {isModalOpen}
                mode=  {modalMode}
                entity=  {selectedRole}
                onClose=  {closeModal}
                onSave= {(data) => setSelectedRole(data)}
                handleEdit= {handleEdit}
                handleCreate= {handleCreate}
                tableMode={tableMode}
            />
            
            {roles.length === originalRoles.length && (<PaginationButton offset={offset} previus={handlePreviousPage} next={handleNextPage}/>)}

            {roles.length !== originalRoles.length && (<BackButton reset={handleResetRoles}/>)}
        </div>
    );
}

export default Roles;