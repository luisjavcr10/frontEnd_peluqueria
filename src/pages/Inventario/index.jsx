import { useEffect, useState } from 'react';
import { getProducts, getProductByCategory, updateProduct } from '../../services/productService'; 
import {getCategories} from '../../services/categoriesService';
import PaginationButton from '../../components/buttons/PaginationButton';
import StockModal from '../../components/modals/StockModal';
import LoteModal from '../../components/modals/LoteModal';

const Inventario = () => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [originalProducts, setOriginalProducts]=useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedValue, setSelectedValue] = useState(0);
    const [isOpenStockModal, setIsOpenStockModal] = useState(false);
    const [isOpenLoteModal, setIsOpenLoteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [addedStock, setAddedStock] = useState('');
    const [offset, setOffset] = useState(0);
    const limit = 10;

    const handleSubmit = (e) => {
        e.preventDefault(); // Evitar el refresco del navegador
        console.log(e);
        if (!addedStock || isNaN(addedStock)) {
          alert('Por favor, ingresa un número válido');
          return;
        }
        const newStock = parseInt(selectedProduct.stock) + parseInt(addedStock); 
        const stockUpdate = {
          stock: newStock,
        };
        handleAddedStock('');
        handleUpdateStock(selectedProduct.idProduct, stockUpdate);
        handleCloseModal();
    };

    const handleAddedStock = (stock) =>{
        setAddedStock(stock);
    }

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
        setIsOpenStockModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setIsOpenStockModal(false);
    };

    //Metodos para el modal de lotes
    const handleOpenLotelModal = async () => {
        try {
            const data = await getProducts();
            setAllProducts(data)
            setIsOpenLoteModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseLotelModal = () => {
        setIsOpenLoteModal(false);
    };

    useEffect(() => {
        handleFetchAll();
    }, [offset]);

    return (
        <div className='p-4 bg-gray-50 min-h-screen'>
            <div className='max-w-5xl mx-auto h-screen overflow-y-auto m-2'>
                {/* Botón y Select */}
                <div className='flex items-center justify-between mb-6 bg-white p-4 shadow-md rounded-lg'>
                <button 
                    className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200'
                    onClick={handleOpenLotelModal}
                >
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

            {isOpenStockModal && 
            <StockModal 
                product={selectedProduct} 
                submit={handleSubmit} 
                addStock={addedStock} 
                handleAddStock={handleAddedStock} 
                closeModal={handleCloseModal}
            />}

            {isOpenLoteModal &&
            <LoteModal
                data={allProducts}
                close={handleCloseLotelModal}
                updateMethod ={handleUpdateStock}
            />}
        </div>
    );
};

export default Inventario;
