import { useEffect, useState } from 'react';
import { getCategories, createCategory, deleteCategory, updateCategory, getCategory } from '../../../services/categoriesService';
import CategoriesTable from '../../../components/tables/CategoriesTable';
import CategoryModal from '../../../components/modals/CategoryModal';
import { IoMdAddCircle } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { MdFirstPage,MdLastPage } from 'react-icons/md';

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

    useEffect(() => { handleFetchAll()}, [offset]);

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
        <h3 className='text-3xl font-kanit font-kanit-bold'>Categorías</h3>
        <form onSubmit={handleSubmit} className='flex justify-center items-center'>
          <input 
            type='text'  
            className='bg-white px-4 py-2 rounded-2xl border border-gray-300'
            placeholder='Buscar categoría por ID'
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
              <h1 className='mx-2 hover:text-white'>Agregar nueva categoría</h1>
              <IoMdAddCircle className='mx-2' />
          </button>
        </div>
      </div>

      <CategoriesTable
        categories={categories}
        onShow={openShowModal}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        mode={modalMode}
        category={selectedCategory}
        onClose={closeModal}
        onSave={(data) => setSelectedCategory(data)}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
      />

    {categories.length === originalCategories.length && (
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

    {categories.length !== originalCategories.length && (
          <div className='flex justify-center mt-4'>
            <button 
              onClick={handleResetCategories} 
              className='bg-blue-500 text-white px-4 py-2 rounded-lg transition delay-50 hover:bg-blue-700 hover:-translate-y-2 hover:scale-110 hover:text-zinc-300 shadow-md shadow-blue-200'>
              Regresar a la lista completa
            </button>
          </div>
    )}
    </div>
  );
};

export default Categorias;
