import { useState, useEffect } from 'react';
import EmployeesTable from '../../../components/tables/EmployeesTable';
import EmployeeModal from '../../../components/modals/EmployeeModal';
import { getEmployee, getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../../../services/employeesServices';
import { IoMdAddCircle } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { MdFirstPage,MdLastPage } from 'react-icons/md';

const Empleados = () =>{
    const [employees, setEmployees] = useState([]);
    const [originalEmployees, setOriginalEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState(null);
    const [offset, setOffset] = useState(0);
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
      if (inputValue.trim() !== '') {
        handleFetchOne(inputValue);
      }
    };

    const handleResetEmployees = () => {
      setEmployees(originalEmployees); // Restaura la lista completa
      setInputValue(''); // Limpia el input de búsqueda
    };

    //Consumo de endpoints
    const handleFetchAll = async () =>{
        try {
            const data = await getEmployees(offset,limit);
            setEmployees(data);
            setOriginalEmployees(data);
        } catch (err) {
            setMessage(err)
            console.error(message);
        }
    };

    const handleFetchOne = async (id) =>{
        try {
            const result = await getEmployee(id);
            setEmployees([result]);
        } catch (err) {
            setMessage(err)
            console.error(message);
        }
    };

    const handleCreate = async (data) =>{
        try {
            await createEmployee(data);
            setMessage('Empleado creado con exito');
        } catch (err) {
            setMessage(err)
            console.error(message);
        }
    };

    const handleEdit = async (id, data) =>{
        if (confirm('¿Estás seguro de editar esta categoría?')) {
            try {
                //const {idEmployee,idUser,user, ...updatedData} = data;
                await updateEmployee(id,data);
                setMessage('Empleado actualizado con exito.')
            } catch (err) {
                setMessage(err)
                console.error(message);
            }
        }  
    };

    const handleDelete = async (id) =>{
        if(confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
            try {
                await deleteEmployee(id);
                setEmployees((prev) => prev.filter((employee) => employee.idEmployee !== id));
                setOriginalEmployees((prev) => prev.filter((employee) => employee.idEmployee !== id));
                setMessage('Empleado eliminado con exito.')
            } catch (err) {
                setMessage(err)
                console.error(message);
            }
        } 
    };

    //Metodos para la operación del modal
    const openShowModal = (employee) => {
        setSelectedEmployee(employee);
        setModalMode('show');
        setIsModalOpen(true);
    };
    
    const openCreateModal = () => {
        setModalMode('create');
        setIsModalOpen(true);
    };
  
    const openEditModal = (employee) => {
        setSelectedEmployee(employee);
        setModalMode('edit');
        setIsModalOpen(true);
    };
  
    const closeModal = () => {
        setSelectedEmployee(null);
        setModalMode('');
        setIsModalOpen(false);
    };


    return(
        <div className='bg-white w-full h-screen overflow-y-auto'>
            {message && (
                <div className='bg-black text-white p-2 text-center'>
                {message}
                </div>
            )}

            <div className='flex flex-col lg:flex-row items-center justify-evenly px-6 pt-6 pb-2 mx-6 mt-6 mb-2'>
                <h3 className='text-3xl font-kanit font-kanit-bold'>Empleados</h3>
                <form onSubmit={handleSubmit} className='flex justify-center items-center'>
                    <input 
                        type='text'  
                        className='bg-white px-4 py-2 rounded-2xl border border-gray-300'
                        placeholder='Buscar empleado por ID'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} 
                    />
                    <button 
                        type='submit'
                        className='bg-gray-300 p-4 m-2 rounded-full transition delay-50 hover:bg-gray-700 hover:-translate-y-2 hover:scale-110 hover:text-white'>
                        <FaSearch />
                    </button>
                </form>
                <div className='flex items-center justify-center'>
                <button 
                    onClick={() => openCreateModal()} 
                    className='flex items-center justify-center text-black bg-green-500 p-2 m-2 rounded-xl transition delay-50 hover:bg-green-700 hover:-translate-y-2 hover:scale-110 hover:text-white shadow-md shadow-green-200'>
                    <h1 className='mx-2 hover:text-white'>Agregar nuevo empleado</h1>
                    <IoMdAddCircle className='mx-2' />
                </button>
                </div>
            </div>

            <EmployeesTable
                employees= {employees}
                onShow = {openShowModal}
                onEdit = {openEditModal}
                onDelete = {handleDelete}
            />
            <EmployeeModal
                isOpen = {isModalOpen}
                employee = {selectedEmployee}
                mode = {modalMode}
                onClose = {closeModal}
                onSave = {(data)=> setSelectedEmployee(data)}
                handleEdit = {handleEdit}
                handleCreate = {handleCreate}
            />

            {employees.length === originalEmployees.length && (
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

            {employees.length !== originalEmployees.length && (
                <div className='flex justify-center mt-4'>
                    <button 
                    onClick={handleResetEmployees} 
                    className='bg-blue-500 text-white px-4 py-2 rounded-lg transition delay-50 hover:bg-blue-700 hover:-translate-y-2 hover:scale-110 hover:text-zinc-300 shadow-md shadow-blue-200'>
                    Regresar a la lista completa
                    </button>
                </div>
            )}
        </div>
    );
}

export default Empleados;