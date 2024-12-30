import { useState,useEffect } from 'react';
import { getService, getServices, createService, updateService, deleteService } from '../../../services/servicesService';
import ServicesTable from '../../../components/tables/ServicesTable';
import ServiceModal from '../../../components/modals/ServiceModal';

import { IoMdAddCircle } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { MdFirstPage,MdLastPage } from 'react-icons/md';

const Servicios = () =>{
    const [services, setServices] = useState([]);
    const [originalServices, setOriginalServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [modalMode, setModalMode] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [offset, setOffset] = useState(0);
    const limit=10; 

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
        } catch (error) {
            setErrorMessage('Error al cargar los servicios.');
            console.error(error);
        }
    };

    const handleFetchOne = async (id) =>{
        try {
            const result = await getService(id);
            setServices([result])
        } catch (err) {
            setError(err);
            console.error(error);
        }
    };

    const handleCreate = async (data) =>{
        try {
            const result = await createService(data);
            setErrorMessage(result);
        } catch (error) {
            setErrorMessage(error);
        }
    };

    const handleEdit = async (id, data) =>{
        if (confirm('¿Estás seguro de que deseas editar este servicio?')) {
            try {
                const { idService, ...updatedData } = data;
                console.log(id);
                await updateService(id,updatedData);
                //setErrorMessage(result);
            } catch (error) {
                setErrorMessage(error);
                console.error(error);
            }
        }
    };

    const handleDelete = async (id) =>{
        if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
            try {
                const result= await deleteService(id);
                setServices((prev) =>prev.filter((service) =>service.idService !==id));
                setOriginalServices((prev) =>prev.filter((service) =>service.idService !==id));
                setErrorMessage(result.message)
            } catch (error) {
                setErrorMessage(error);
                console.error(error);
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

    useEffect(()=>{
        handleFetchAll();
    },[offset]);

    return (
        <div className='bg-white w-full h-screen overflow-y-auto'>
            {errorMessage && (
                <div className='bg-black text-white p-2 text-center'>
                {errorMessage}
                </div>
            )}
            <div className='flex flex-col lg:flex-row items-center justify-evenly px-6 pt-6 pb-2 mx-6 mt-6 mb-2'>
                <h3 className='text-3xl font-kanit font-kanit-bold'>Servicios</h3>
                <form  
                    onSubmit={handleSubmit} 
                    className='flex justify-center items-center'>
                    <input 
                        type='text'  
                        className='bg-white px-4 py-2 rounded-2xl border border-gray-300'
                        placeholder='Buscar servicio por ID'
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
                        <h1 className='mx-2 hover:text-white'>Agregar nuevo servicio</h1>
                        <IoMdAddCircle className='mx-2' />
                    </button>
                </div>

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

            {services.length === originalServices.length && (
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

                {services.length !== originalServices.length && (
                    <div className='flex justify-center mt-4'>
                        <button 
                        onClick={handleResetServices} 
                        className='bg-blue-500 text-white px-4 py-2 rounded-lg transition delay-50 hover:bg-blue-700 hover:-translate-y-2 hover:scale-110 hover:text-zinc-300 shadow-md shadow-blue-200'>
                        Regresar a la lista completa
                        </button>
                    </div>
                )}
        </div>
    );
}

export default Servicios;