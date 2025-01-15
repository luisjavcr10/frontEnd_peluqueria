const StockModal = ({product, submit, addStock, handleAddStock, closeModal}) =>{
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md m-4'>
                <h2 className='text-lg font-bold mb-4'>
                            {`Agregar stock a: ${product.name}`}
                </h2>
                <form onSubmit={submit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Stock del producto</label>
                        <input
                            type='number'
                            value={product?.stock || ''}
                            readOnly
                            className='w-full p-2 border rounded bg-gray-100 cursor-not-allowed'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Añadir lote:</label>
                        <input
                            type='number'
                            value={addStock}
                            onChange={(e) => handleAddStock(e.target.value)} // Actualizar el estado del input
                            className='w-full p-2 border rounded bg-white cursor-allowed'
                        />
                    </div>
                    <div className='flex justify-end space-x-4'>
                        <button
                            type='button'
                            onClick={closeModal}
                            className='px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-400 rounded hover:bg-gray-300 transition-transform transform duration-300  hover:-translate-y-2 hover:scale-110'
                        >
                            Cerrar
                        </button>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded transition-transform transform duration-300  hover:-translate-y-2 hover:scale-110'
                        >
                            Actualizar Stock
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StockModal;