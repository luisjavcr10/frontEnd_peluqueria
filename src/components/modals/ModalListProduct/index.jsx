import { useEffect, useState } from 'react';
import { getProducts } from '../../../services/productService';
import { MdCancel } from 'react-icons/md';

const ModalListProduct = ({ isOpen, onClose, onAddItems }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 10;

  //Funcion para obtener los productos
  const handleFetchAll = async () => {
    try {
      const data = await getProducts(offset, limit);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleFetchAll();
    }
  }, [isOpen, offset]);

  const handleSelectProduct = (product) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.idProduct === product.idProduct);
      if (exists) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveSelectProduct = (product)=>{
    setSelectedProducts(prev => prev.filter(p => p.idProduct !== product.idProduct));
  }

  const handleQuantityChange = (id, quantity) => {
    setSelectedProducts(prev =>
      prev.map(p =>
        p.idProduct === id ? { ...p, quantity: Math.max(1, quantity) } : p
      )
    );
  };

  const handleAddToSale = () => {
    const itemsToAdd = selectedProducts.map(product => ({
      type: 'PRODUCTO',
      idProduct: product.idProduct,
      name:product.name,
      unitPrice: parseFloat(product.price),
      quantity: product.quantity,
      subtotal: product.price * product.quantity
    }));
    
    onAddItems(itemsToAdd);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-5/4  flex flex-col lg:flex-row">
        {/* Listado de productos */}
        <div className="flex-1 p-6 border-r overflow-y-auto">
          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Buscar producto..."
              className="bg-white px-4 py-2 rounded-2xl border border-gray-300 shadow-md outline-2 outline-green-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div> 
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products
              .filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((product) => (
                <div
                  key={product.idProduct}
                  className={`border rounded-lg p-4 cursor-pointer   hover:bg-gray-200 shadow-md ${(selectedProducts.find(p => p.idProduct === product.idProduct)) ? ' border-green-800 border-4 bg-gray-200' : 'bg-gray-50'}`}
                  onClick={() => handleSelectProduct(product)}
                >
                  <h3 className="h-8 font-medium text-center">{product.name}</h3>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-contain mb-2"
                  />
                  <p className="text-gray-600 text-center">S/ {product.price}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Productos seleccionados */}
        <div className="w-full lg:w-96 p-6 overflow-y-auto">
          <h2 className="text-lg text-center font-semibold mb-4">Productos seleccionados</h2>
          {selectedProducts.map((product) => (
            <div key={product.idProduct} className="border-b py-2">
              <div className="grid grid-cols-8 items-center gap-2">
                <div className='col-start-1 lg:col-start-1 col-span-5 lg:col-span-4'>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-600">S/ {product.price}</p>
                </div>
                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) =>
                    handleQuantityChange(product.idProduct, parseInt(e.target.value))
                  }
                  className="col-start-6 lg:col-start-5 col-span-2 lg:col-span-2 p-1 border rounded text-center outline-2 outline-green-800"
                />
                <button 
                  className='sm:w-full py-2 col-start-8 lg:col-start-7 col-span-1 lg:col-span-2 bg-gradient-to-r from-gray-700 to-neutral-600 text-black font-semibold  rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-x-105 flex justify-center items-center'
                  onClick={()=>handleRemoveSelectProduct(product)}>
                <MdCancel className='text-white items-center'/>
                </button>
              </div>
            </div>
          ))}
          
          <button
            onClick={handleAddToSale}
            className="w-full bg-gradient-to-r from-gray-600 to-neutral-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-x-105 my-2"
          >
            Agregar a la venta
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-gray-200 to-neutral-300 text-black font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-x-105 "
          >
            Regresar
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModalListProduct;