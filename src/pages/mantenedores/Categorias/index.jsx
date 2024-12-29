import { useEffect, useState } from 'react';
import { getCategories , createCategory, deleteCategory, updateCategory } from '../../../services/categoriesService';
import CategoriesTable from '../../../components/tables/CategoriesTable';
import CategoryModal from '../../../components/modals/CategoryModal';
import { IoMdAddCircle } from 'react-icons/io';
import { FaSearch } from "react-icons/fa";

const Categorias = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalMode, setModalMode] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setErrorMessage('Error al cargar las categorías.');
        console.error(error);
      }
    };
    getAllCategories();
  }, []);

  const handleDelete = async (id) =>{
    if(confirm('¿Estás seguro de que deseas eliminar esta categoría?')){
        try {
            await deleteCategory(id);
            setCategories((prev) => prev.filter((category) => category.idCategory !== id));
            setErrorMessage('Categoría eliminada con éxito.');
        } catch (error) {
            setErrorMessage('Error al eliminar la categoría.');
            console.error(error);
        }
    }
  }

  const handleCreate = async (data) =>{
    try {
      await createCategory(data);
      setErrorMessage('Categoría creada con éxito.');
    } catch (error) {
        setErrorMessage('Error al crear la categoría.');
        console.error(error);
    }
  };

  const handleEdit = async (id, data) =>{
    if(confirm('¿Estás seguro de editar esta categoría?')){
        try {
            const {idCategory, ...updatedData} = data;
            await updateCategory(id,updatedData);  
            setCategories((prev) => prev.filter((category) => category.idCategory !== id));   
            setErrorMessage('Categoría editada con éxito.');
        } catch (error) {
            setErrorMessage('Error al editar la categoría.');
            console.error(error);
        }
    }
  };

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
        <div className='bg-red-500 text-white p-2 text-center'>
          {errorMessage}
        </div>
      )}

      <div className='flex items-center justify-evenly px-6 pt-6 pb-2 mx-6 mt-6 mb-2'>
        <h3 className='text-3xl font-kanit font-kanit-bold'>Categorias</h3>
        <form action="" className='flex justify-center items-center'>
          <input 
            type="text"  
            className='bg-white px-4 py-2 rounded-2xl border border-gray-300'
            placeholder='Buscar categoria por ID'/>
          <button 
              className='bg-gray-300 p-4 m-2 rounded-full transition delay-50 hover:bg-gray-700 hover:-translate-y-2 hover:scale-110 hover:text-white'>
              <FaSearch />
          </button>
        </form>
        <div className='flex items-center justify-center'>
          <button 
            onClick={() => openCreateModal()} 
            className='flex items-center justify-center text-black bg-green-500 p-2 m-2 rounded-xl transition delay-50 hover:bg-green-700 hover:-translate-y-2 hover:scale-110 hover:text-white shadow-md shadow-green-200'>
              <h1 className='mx-2 hover:text-white'>Agregar nueva categoria</h1>
              <IoMdAddCircle className='mx-2'/>
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
        onSave={(data)=>setSelectedCategory(data)}
        handleEdit={handleEdit}
        handleCreate= {handleCreate}
      />
    </div>
  );
};

export default Categorias;
