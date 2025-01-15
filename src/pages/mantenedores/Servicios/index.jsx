import { useState,useEffect } from 'react';

import { getService, getServices, createService, updateService, deleteService } from '../../../services/servicesService';

import ServicesTable from '../../../components/tables/ServicesTable';
import ServiceModal from '../../../components/modals/ServiceModal';
import Subtitle from '../../../components/text/Subtitle';
import FormSearch from '../../../components/forms/FormSearch';
import AddButton from '../../../components/buttons/AddButton';
import PaginationButton from '../../../components/buttons/PaginationButton';
import BackButton from '../../../components/buttons/BackButton';

const Servicios = () =>{
    const [services, setServices] = useState([]);
    const [originalServices, setOriginalServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [modalMode, setModalMode] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState(null);
    const [offset, setOffset] = useState(0);
    const limit=10; 

    useEffect(()=>{
        handleFetchAll();
    },[offset]);
    
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

    const handleResetServices = () =>{
        setServices(originalServices);
        setInputValue('')
    };

    //Consumo de endpoints
    const handleFetchAll = async () =>{
        try {
            const data= await getServices(offset,limit);
            setServices(data);
            setOriginalServices(data);
        } catch (err) {
            setMessage(err);
            console.error(message);
        }
    };

    const handleFetchOne = async (id) =>{
        try {
            const result = await getService(id);
            setServices([result])
        } catch (err) {
            setMessage(err);
            console.error(message);
        }
    };

    const handleCreate = async (data) =>{
        try {
            const result = await createService(data);
            setMessage(result);
        } catch (err) {
            setMessage(err);
            console.error(message);
        }
    };

    const handleEdit = async (id, data) =>{
        if (confirm('¿Estás seguro de que deseas editar este servicio?')) {
            try {
                const { idService, ...updatedData } = data;
                console.log(id);
                await updateService(id,updatedData);
            }catch (err) {
                setMessage(err);
                console.error(message);
            }
        }
    };

    const handleDelete = async (id) =>{
        if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
            try {
                const result= await deleteService(id);
                setServices((prev) =>prev.filter((service) =>service.idService !==id));
                setOriginalServices((prev) =>prev.filter((service) =>service.idService !==id));
                setMessage(result.message)
            } catch (err) {
                setMessage(err);
                console.error(message);
            }
        }
    };

    ////Metodos para la operacion del modal
    const openShowModal = (service)=>{
        setSelectedService(service);
        setModalMode('show');
        setIsModalOpen(true);
    };

    const openEditModal = (service)=>{
        setSelectedService(service);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const openCreateModal = ()=>{
        setModalMode('create');
        setIsModalOpen(true)
    };

    const closeModal = () =>{
        setSelectedService(null);
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
                <Subtitle word={'Servicios'}/>
                <FormSearch submit={handleSubmit} input={inputValue} handleInput={handleInputValue}/>
                <AddButton onOpen={() => openCreateModal()} word={'servicio'}/>
            </div>

            <ServicesTable 
                services={services}
                onShow = {openShowModal}
                onEdit = {openEditModal}
                onDelete = {handleDelete}
            />

            <ServiceModal
                isOpen={isModalOpen}
                mode = {modalMode}
                service={selectedService}
                onClose={closeModal}
                onSave={(data) => setSelectedService(data)}
                handleEdit={handleEdit}
                handleCreate = {handleCreate}
            />

            {services.length === originalServices.length && (<PaginationButton offset={offset} previus={handlePreviousPage} next={handleNextPage}/>)}

            {services.length !== originalServices.length && (<BackButton reset={handleResetServices}/>)}

        </div>
    );
}

export default Servicios;