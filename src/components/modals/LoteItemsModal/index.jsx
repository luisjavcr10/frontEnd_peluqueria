import { useState } from 'react';
import { updateProduct } from '../../../services/productService';

const LoteItemsModal = ({ products, close, closeBefore, updateMethod }) => {
    const [body, setBody] = useState([]);
    const [inputValues, setInputValues] = useState({}); // Objeto para manejar los valores individuales

    const updateProducts = () => {
        body.forEach((product) => {
            const payload = { stock: product.stock }; 
            updateMethod(product.id,payload)
        });
    
        close();
        closeBefore(); 
    };

    const addBody = (id, currentStock) => {
        const newStock = parseInt(currentStock) + parseInt(inputValues[id] || 0);
        const stockUpdate = {
        id: id,
        stock: newStock,
        };

        setBody((prev) => [...prev, stockUpdate]);
        console.log('Body actualizado:', [...body, stockUpdate]);
    };

    const handleChangeInputValue = (id, value) => {
        setInputValues((prev) => ({
        ...prev,
        [id]: value,
        }));
        console.log('Input actualizado:', id, value);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white m-6 p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-lg font-bold mb-4">Productos en el Lote</h2>
            <div className="space-y-4">
            {products.map((product) => (
                <div
                key={product.idProduct}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow"
                >
                    <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                    </div>
                    <div className='flex justify-end gap-2'>
                        <input
                            type="number"
                            placeholder="Cantidad a agregar"
                            value={inputValues[product.idProduct] || ''} 
                            onChange={(e) =>
                            handleChangeInputValue(product.idProduct, e.target.value)
                            }
                            className="border rounded px-3 py-1 text-sm w-48"
                        />
                        <button
                            onClick={() => addBody(product.idProduct, product.stock)}
                            className="px-4 py-2 font-semibold bg-gradient-to-r  from-blue-400 to-blue-700 text-white rounded-md transition-transform transform duration-300  hover:-translate-y-2 hover:scale-110"
                        >
                            Confirmar
                        </button>
                    </div>
                    
                </div>
            ))}
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-4 mt-6">
            <button
                onClick={close}
                className="px-4 py-2 bg-gradient-to-r  from-gray-100 to-gray-300 font-semibold rounded-md hover:bg-gray-300 text-gray-700 transition-transform transform duration-300  hover:-translate-y-2 hover:scale-110"
            >
                Regresar
            </button>
            <button
                onClick={updateProducts} 
                className="px-4 py-2 bg-gradient-to-r  from-green-400 to-green-700 font-semibold text-white rounded-md hover:bg-green-600 transition-transform transform duration-300  hover:-translate-y-2 hover:scale-110"
            >
                Finalizar
            </button>
            </div>
        </div>
        </div>
    );
};

export default LoteItemsModal;
