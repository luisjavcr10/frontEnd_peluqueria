import { useEffect, useState } from 'react';
import XButton from '../../buttons/XButton';
import FormSearch from '../../forms/FormSearch';
import LoteItemsModal from '../LoteItemsModal';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

const LoteModal = ({ data, close, updateMethod }) => {
    const [products, setProducts] = useState(data);
    const [productsInLote, setProductsInLote] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

    const handleInProductsInLote = (product) => {
        setProductsInLote((prev) => [...prev, product]);
        setProducts(products.filter((p) => p !== product));
    };

    const handleOutProductsInLote = (product) => {
        setProductsInLote(productsInLote.filter((p) => p !== product));
        setProducts((prev) => [product, ...prev]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //product.idProduct.includes(inputValue)
        //
        const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setProducts(filteredProducts);
    };

    const handleChangeInput = (e) => {
        const { value } = e.target;
        setInputValue(value);
    };

    const handleShowAllAgain = () => {
        const produtsNotYetChosen = data.filter((p) => !productsInLote.includes(p));
        setProducts(produtsNotYetChosen);
        setInputValue('');
    };

    const handleOpenSecondModal = () => {
        setIsSecondModalOpen(true);
    };

    const handleCloseSecondModal = () => {
        setIsSecondModalOpen(false);
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (productsInLote.length > 0) {
                event.preventDefault();
                event.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [productsInLote]);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='flex flex-col bg-white m-6 p-6 rounded-lg shadow-lg w-full max-w-3xl'>
        {/* Formulario de Búsqueda */}
        <div className='mb-6'>
          <FormSearch submit={handleSubmit} input={inputValue} handleInput={handleChangeInput} />
        </div>

        {/* Botón Mostrar todos */}
        {((data.length-productsInLote.length) !== products.length) && (
          <button
            onClick={handleShowAllAgain}
            className='mb-4 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-800 font-semibold transition'
          >
            Mostrar todos los productos disponibles
          </button>
        )}

        {/* Contenedor de Productos */}
        <div className='flex flex-col sm:flex-row gap-6'>
          {/* Lista de Productos */}
          <div className='w-full sm:w-1/2 overflow-y-auto h-96 bg-gray-100 rounded-md shadow-inner p-4'>
            <h2 className='font-semibold text-gray-700 mb-3'>Productos Disponibles</h2>
            {products.length === 0 ? (
                    <p className='text-gray-500 italic'>Ninguna coincidencia encontrada.</p>
                ):(
                products.map((product, index) => (
                <div
                    key={product.idProduct}
                    className='grid grid-cols-5 rounded-md border m-2 cursor-pointer hover:bg-blue-100 text-gray-800 transition'
                    onClick={() => handleInProductsInLote(product)}
                >
                    <div className='bg-gray-200 col-start-1 col-span-1 p-2 text-center text-sm'>ID: {product.idProduct}</div>
                    <div className='bg-gray-50 col-start-2 col-span-4 p-2 text-sm'>{product.name}</div>
                </div>
            
                ))
            )}
          </div>

          {/* Productos en el Lote */}
          <div className='w-full sm:w-1/2 overflow-y-auto h-96 bg-gray-100 rounded-md shadow-inner p-4'>
            <h2 className='font-semibold text-gray-700 mb-3'>Productos en el Lote</h2>
            {productsInLote.length === 0 ? (
              <p className='text-gray-500 italic'>No hay productos en el lote.</p>
            ) : (
              productsInLote.map((product) => (
                <div
                key={product.idProduct}
                className="grid grid-cols-8 rounded-md border m-2 cursor-pointer text-gray-800 transition"
                >
                    <div className="bg-gray-200 col-start-1 col-span-2 p-2 text-center text-sm">
                        ID: {product.idProduct}
                    </div>
                    <div className="bg-gray-50 col-start-3 col-span-5 p-2 text-sm">
                        {product.name}
                    </div>
                    <button
                        type="button"
                        onClick={() => handleOutProductsInLote(product)}
                        className="flex justify-center items-center col-start-8 col-span-1 bg-gray-500 rounded transition delay-50 hover:bg-gray-700  hover:text-white"
                    >
                        <MdCancel />
                    </button>
                </div>

              ))
            )}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className='flex flex-row justify-end mt-4'>
          <XButton close={close} />
          <FaLongArrowAltRight
            className='py-2 ml-4 h-10 w-12 bg-green-500 rounded-lg text-white transition transform hover:bg-green-700 hover:-translate-y-1 hover:scale-110'
            onClick={handleOpenSecondModal}
          />
        </div>
      </div>

      {/* Segundo Modal */}
      {isSecondModalOpen && 
        <LoteItemsModal products={productsInLote} close={handleCloseSecondModal} closeBefore={close} updateMethod={updateMethod} />}
    </div>
  );
};

export default LoteModal;
