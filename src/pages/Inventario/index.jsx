import { useEffect, useState } from 'react';
import { getProducts, getProductByCategory, updateProduct } from '../../services/productService'; 
import {getCategories} from '../../services/categoriesService';
import PaginationButton from '../../components/buttons/PaginationButton';
import StockModal from '../../components/modals/StockModal';
import LoteModal from '../../components/modals/LoteModal';
import AddLote from '../../components/buttons/AddLote';
import Select from '../../components/select';
import ProductList from '../../components/lists/ProductList';

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
        <div className='p-4 bg-white min-h-screen'>
            <div className='max-w-5xl mx-auto h-screen overflow-y-auto m-2'>
                {/* Botón y Select */}
                <div className='flex items-center justify-between mb-6 bg-gray-50 p-4 shadow-md rounded-lg gap-2'>
                    <AddLote handleOpen={handleOpenLotelModal}/>
                    <Select value={selectedValue} handleChange={handleChangeSelect} entities={categories}/>
                </div>

                {/* Lista de Productos */}
                <ProductList products={products} handleOpen={handleOpenModal}/>

                {(selectedValue==='default' || selectedValue===0) && 
                <div className='pb-8'>
                    <PaginationButton offset={offset} previus={handlePreviousPage}next={handleNextPage}/>
                </div>}
                
            </div>

            {isOpenStockModal && 
            <StockModal product={selectedProduct} submit={handleSubmit} addStock={addedStock} 
                handleAddStock={handleAddedStock} closeModal={handleCloseModal}/>}

            {isOpenLoteModal &&
            <LoteModal data={allProducts} close={handleCloseLotelModal} updateMethod ={handleUpdateStock}/>}
        </div>
    );
};

export default Inventario;
