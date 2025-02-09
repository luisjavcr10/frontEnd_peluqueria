import { useState, useEffect } from 'react';

import { getEmployee, getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../../../services/employeesServices';

import EmployeesTable from '../../../components/tables/EmployeesTable';
import EmployeeModal from '../../../components/modals/EmployeeModal';
import FormSearch from '../../../components/forms/FormSearch';
import AddButton from '../../../components/buttons/AddButton';
import PaginationButton from '../../../components/buttons/PaginationButton';
import BackButton from '../../../components/buttons/BackButton';
import MantenedorSelect from '../../../components/selects/MantenedorSelect';
import BackToMenuButton from '../../../components/buttons/BackToMenuButton';

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
                <MantenedorSelect titulo={'Empleados'}/>
                <FormSearch submit={handleSubmit} input={inputValue} handleInput={handleInputValue}/>
                <AddButton onOpen={() => openCreateModal()} word={'empleado'}/>
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

            {employees.length === originalEmployees.length && (<PaginationButton offset={offset} previus={handlePreviousPage} next={handleNextPage}/>)}

            {employees.length !== originalEmployees.length && (<BackButton reset={handleResetEmployees}/>)}

            <div className='flex justify-start ml-32'>
                <BackToMenuButton/>
            </div>

        </div>
    );
}

export default Empleados;