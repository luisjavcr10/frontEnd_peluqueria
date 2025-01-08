import { useEffect, useState } from 'react';

import { getCategories, createCategory, deleteCategory, updateCategory, getCategory } from '../../../services/categoriesService';

import BasicTable from '../../../components/tables/BasicTable';
import BasicModal from '../../../components/modals/BasicModal';
import Subtitle from '../../../components/text/Subtitle';
import FormSearch from '../../../components/forms/FormSearch';
import AddButton from '../../../components/buttons/AddButton';
import PaginationButton from '../../../components/buttons/PaginationButton';
import BackButton from '../../../components/buttons/BackButton';

const Categorias = () => {
    const [categories, setCategories] = useState([]);
    const [originalCategories, setOriginalCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [modalMode, setModalMode] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [offset, setOffset] = useState(0);
    const limit = 8;
    const tableMode = 'Categoria';

    useEffect(() => { handleFetchAll()}, [offset]);

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

    const handleResetCategories = () => {
      setCategories(originalCategories); // Restaura la lista completa
      setInputValue(''); // Limpia el input de búsqueda
    };

    //Consumo de endpoints
    const handleFetchAll = async () => {
      try {
        const data = await getCategories(offset, limit);
        setCategories(data);
        setOriginalCategories(data); // Almacena la lista completa
      } catch (error) {
        setErrorMessage('Error al cargar las categorías.');
        console.error(error);
      }
    };

    const handleFetchOne = async (id) => {
      try {
        const result = await getCategory(id);
        setCategories([result]);
      } catch (error) {
        setErrorMessage('Error al cargar la categoría.');
        console.error(error);
      }
    };

    const handleDelete = async (id) => {
      if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
        try {
          await deleteCategory(id);
          setCategories((prev) => prev.filter((category) => category.idCategory !== id));
          setOriginalCategories((prev) => prev.filter((category) => category.idCategory !== id)); // Actualiza ambas listas
          setErrorMessage('Categoría eliminada con éxito.');
        } catch (error) {
          setErrorMessage('Error al eliminar la categoría.');
          console.error(error);
        }
      }
    };

    const handleCreate = async (data) => {
      try {
        await createCategory(data);
        setErrorMessage('Categoría creada con éxito.');
      } catch (error) {
        setErrorMessage('Error al crear la categoría.');
        console.error(error);
      }
    };

    const handleEdit = async (id, data) => {
      if (confirm('¿Estás seguro de editar esta categoría?')) {
        try {
          const { idCategory, ...updatedData } = data;
          await updateCategory(id, updatedData);  
          setCategories((prev) => prev.filter((category) => category.idCategory !== id));   
          setErrorMessage('Categoría editada con éxito.');
        } catch (error) {
          setErrorMessage('Error al editar la categoría.');
          console.error(error);
        }
      }
    };

    //Metodos para la operacion del modalß
    const openShowModal = (category) => {
      setSelectedCategory(category);
      setModalMode('show');
      setIsModalOpen(true);
    };
  
    const openCreateModal = () => {
      setModalMode('create');
      setIsModalOpen(true);
    };

    const openEditModal = (category) => {
      setSelectedCategory(category);
      setModalMode('edit');
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setSelectedCategory(null);
      setModalMode('');
      setIsModalOpen(false);
    };

    return (
      <div className='bg-white w-full h-screen overflow-y-auto'>
        {errorMessage && (
          <div className='bg-black text-white p-2 text-center'>
            {errorMessage}
          </div>
        )}

        <div className='flex flex-col lg:flex-row items-center justify-evenly px-6 pt-6 pb-2 mx-6 mt-6 mb-2'>
          <Subtitle word={'Categorias'}/>
          <FormSearch handleSubmit={handleSubmit} inputValue={inputValue} handleInputValue={handleInputValue}/>
          <AddButton onOpen={() => openCreateModal()} word={'categoría'}/>
        </div>

        <BasicTable
          entities={categories}
          mode={tableMode}
          onShow={openShowModal}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />

        {/* Modal */}
        <BasicModal
          isOpen={isModalOpen}
          mode={modalMode}
          entity={selectedCategory}
          onClose={closeModal}
          onSave={(data) => setSelectedCategory(data)}
          handleEdit={handleEdit}
          handleCreate={handleCreate}
          tableMode = {tableMode}
        />

        {categories.length === originalCategories.length && (<PaginationButton offset={offset} previus={handlePreviousPage} next={handleNextPage}/>)}

        {categories.length !== originalCategories.length && (<BackButton reset={handleResetCategories}/>)}
        </div>
    );
};

export default Categorias;
