import { useEffect, useState } from 'react';
import { getProducts, getProduct, getProductByCategory, createProducts, updateProduct, deleteProducts } from '../../../services/productService';
import ProductsTable from '../../../components/tables/ProductsTable';
import ProductModal from '../../../components/modals/ProductModal';
import MantenedorSelect from '../../../components/selects/MantenedorSelect';
import FormSearch from '../../../components/forms/FormSearch';
import AddButton from '../../../components/buttons/AddButton';
import PaginationButton from '../../../components/buttons/PaginationButton';
import BackButton from '../../../components/buttons/BackButton';
import BackToMenuButton from '../../../components/buttons/BackToMenuButton';
import { MdCancel } from 'react-icons/md';

const Productos = () =>{
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState(null);
    const [offset, setOffset] = useState(0);
    const limit = 8;

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
  
    const handleResetProducts = () => {
        setProducts(originalProducts); // Restaura la lista completa
        setInputValue(''); // Limpia el input de búsqueda
    };

    const handleInputValue = (e) =>{
        setInputValue(e.target.value);
    }

    //Consumo de endpoints
    const handleFetchAll = async () =>{
        try {
            const data = await getProducts(offset,limit);
            setProducts(data);
            setOriginalProducts(data);
            console.log(data);
        } catch (error) {
            console.error(error);
            setMessage(error);
        }
    };

    const handleFetchOne = async (id) => {
        try {
            const result = await getProduct(id);
            setProducts([result]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (id, data) =>{
        if (confirm('¿Estás seguro de que deseas actualizar este producto?')) {
            try {
                await updateProduct(id,data);
                setProducts((prev) => prev.filter((product) => product.idProduct !== id));  
            } catch (error) {
                console.error(error)
                setMessage(error)
            }
        }
    };

    const handleCreate = async (data) =>{
        try {
            await createProducts(data);
            setMessage('Producto creado con exito')
        } catch (error) {
            console.error(error)
            setMessage(error)
        }
    };

    const handleDelete = async (id) =>{
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                const res= await deleteProducts(id);
                setProducts((prev) => prev.filter((product) => product.idProduct !== id)); 
                setMessage(res.message);
            } catch (error) {
                console.error(error)
                setMessage(error)
            }
        }
    };

    //Metodos para la operación del modal
    const openShowModal = (product) => {
        setSelectedProduct(product);
        setModalMode('show');
        setIsModalOpen(true);
        console.log(product);
    };
    
    const openCreateModal = () => {
        setModalMode('create');
        setIsModalOpen(true);
    };
  
    const openEditModal = (product) => {
        setSelectedProduct(product);
        setModalMode('edit');
        setIsModalOpen(true);
    };
  
    const closeModal = () => {
        setSelectedProduct(null);
        setModalMode('');
        setIsModalOpen(false);
    };

    useEffect(()=>{handleFetchAll()},[offset])

    return(
        <div className='bg-white w-full h-screen overflow-y-auto'>
            {message && (
                <div className='bg-black text-white p-2 text-center flex justify-center'>
                    <h1 className='font-kanit mx-2'>{message}</h1>
                    <button className='mx-2' onClick={()=> setMessage(null)}><MdCancel/></button>
                </div>
            )}

            <div className='flex flex-col lg:flex-row items-center justify-evenly px-6 pt-6 pb-2 mx-6 mt-6 mb-2'>
                {/*<Subtitle word={'Productos'}/>*/}
                <MantenedorSelect titulo={'Productos'}/>
                <FormSearch submit={handleSubmit} input={inputValue} handleInput={handleInputValue}/>
                <AddButton onOpen={() => openCreateModal()} word={'producto'}/>
            </div>

            <ProductsTable products={products} onDelete={handleDelete} onEdit={openEditModal} onShow={openShowModal}/>

            <ProductModal 
                isOpen = {isModalOpen}
                product = {selectedProduct}
                mode = {modalMode}
                onClose = {closeModal}
                onSave = {(data)=> setSelectedProduct(data)}
                handleEdit = {handleEdit}
                handleCreate = {handleCreate}
            />

            {products.length === originalProducts.length && (<PaginationButton offset={offset} previus={handlePreviousPage} next={handleNextPage}/>)}

            {products.length !== originalProducts.length && (<BackButton reset={handleResetProducts}/>)}

            <div className='flex justify-start ml-32'>
                <BackToMenuButton/>
            </div>
        </div>
    );
}

export default Productos;