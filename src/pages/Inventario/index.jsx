import { useEffect, useState } from 'react';
import { getProducts, getProductByCategory, updateProduct } from '../../services/productService'; 
import {getCategories} from '../../services/categoriesService';
import PaginationButton from '../../components/buttons/PaginationButton';

const Inventario = () => {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts]=useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedValue, setSelectedValue] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [addedStock, setAddedStock] = useState('');
    const [offset, setOffset] = useState(0);
    const limit = 10;

    const handleSubmit = (e) => {
        e.preventDefault(); // Evitar el refresco del navegador
    
        if (!addedStock || isNaN(addedStock)) {
          alert('Por favor, ingresa un número válido');
          return;
        }
    
        const newStock = parseInt(selectedProduct.stock) + parseInt(addedStock); 
    
        const stockUpdate = {
          stock: newStock,
        };
    
        handleUpdateStock(selectedProduct.idProduct, stockUpdate);
        handleCloseModal();
    };

    //Consumo de ednpoints
    const handleFetchAll = async () => {
        try {
            const data = await getProducts(offset, limit);
            setProducts(data);
            setOriginalProducts(data);
            const c = await getCategories();
            setCategories(c);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleUpdateStock = async (id, stock) =>{
        try {
            await updateProduct(id, stock);
            (selectedValue === 0 || selectedValue === 'default') ? await handleFetchAll() : await handleByCategory(selectedValue);
        } catch (error) {
            console.error(error);
        }
    }

    const handleByCategory = async (id) =>{
        try {
            const data = await getProductByCategory(id);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    //Metodo para los cambios del select
    const handleChangeSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue(selectedValue);
    
        if (selectedValue === 'default') {
            setProducts(originalProducts);
        } else {
            handleByCategory(selectedValue);
        }
    };

    //Metodos para la paginacion
    const handleNextPage = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };
  
    const handlePreviousPage = () => {
        setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
    };
    
    //Metodos para el modal de stock
    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setIsOpenModal(false);
    };

    useEffect(() => {
        handleFetchAll();
    }, [offset]);

    return (
        <div className='p-4 bg-gray-50 min-h-screen'>
            <div className='max-w-5xl mx-auto h-screen overflow-y-auto m-2'>
                {/* Botón y Select */}
                <div className='flex items-center justify-between mb-6 bg-white p-4 shadow-md rounded-lg'>
                <button className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200'>
                    Agregar Lote
                </button>
                <select
                    className='bg-gray-100 border border-gray-300 rounded-lg text-gray-700 py-2 px-4 focus:ring-2 focus:ring-green-400 focus:outline-none'
                    value={selectedValue}
                    onChange={handleChangeSelect}
                >
                    <option value='default'>Todos</option>
                    {categories.map((category) => (
                    <option
                        key={category.idCategory}
                        value={category.idCategory}
                        className='text-gray-700'
                    >
                        {category.name}
                    </option>
                    ))}
                </select>
                </div>

                {/* Lista de Productos */}
                <ul className='space-y-6'>
                {products.map((product) => (
                    <li
                    key={product.idProduct}
                    className='bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-lg transition-shadow duration-200'
                    >
                    <div>
                        <h3 className='text-2xl font-semibold text-gray-800 mb-2'>
                        {product.name}
                        </h3>
                        <p className='text-gray-600 text-sm mb-1'>
                        <span className='font-medium text-gray-800'>Descripción:</span>{' '}
                        {product.description}
                        </p>
                        <p className='text-gray-600 text-sm mb-1'>
                        <span className='font-medium text-gray-800'>Precio:</span> $
                        {product.price}
                        </p>
                        <p className='text-gray-600 text-sm mb-1'>
                        <span className='font-medium text-gray-800'>Stock:</span>{' '}
                        {product.stock}
                        </p>
                        <p className='text-gray-600 text-sm'>
                        <span className='font-medium text-gray-800'>Categoría:</span>{' '}
                        {product.category?.name}
                        </p>
                    </div>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4 sm:mt-0 sm:ml-4 rounded-lg shadow-md transition-all duration-200'
                        onClick={()=>{handleOpenModal(product)}}>
                        Agregar Stock
                    </button>
                    </li>
                ))}
                </ul>

                {(selectedValue==='default' || selectedValue===0) && <PaginationButton
                    offset={offset}
                    previus={handlePreviousPage}
                    next={handleNextPage}
                />}
                
            </div>

            {isOpenModal && 
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md m-4'>
                        <h2 className='text-lg font-bold mb-4'>
                            {`Agregar stock a: ${selectedProduct.name}`}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label className='block text-gray-700'>Stock del producto</label>
                                <input
                                    type='number'
                                    value={selectedProduct?.stock || ''}
                                    readOnly
                                    className='w-full p-2 border rounded bg-gray-100 cursor-not-allowed'
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700'>Añadir lote:</label>
                                <input
                                    type='number'
                                    value={addedStock}
                                    onChange={(e) => setAddedStock(e.target.value)} // Actualizar el estado del input
                                    className='w-full p-2 border rounded bg-white cursor-allowed'
                                />
                            </div>
                            <div className='flex justify-end space-x-4'>
                                <button
                                    type='button'
                                    onClick={handleCloseModal}
                                    className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
                                >
                                    Cerrar
                                </button>
                                <button
                                    type='submit'
                                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                                >
                                    Actualizar Stock
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>

    );
};

export default Inventario;
