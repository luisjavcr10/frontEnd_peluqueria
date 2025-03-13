const ProductList = ({products, handleOpen}) =>{
    return (
        <ul className='space-y-6'>
                {products.map((product) => (
                    <li
                    key={product.idProduct}
                    className='bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-lg transition-shadow duration-200'
                    >
                    <div className="flex justify-center flex-row gap-6">
                        <div className="mr-4">
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-36 h-36 object-cover rounded-lg shadow-md"
                            />
                        </div>
                        <div>
                            <h3 className='text-2xl font-semibold text-gray-800 mb-2'>
                            {product.name}
                            </h3>
                            <p className='text-gray-600 text-sm mb-1 w-5/6'>
                            <span className='font-medium text-gray-800 '>Descripción:</span>{' '}
                            {product.description}
                            </p>
                            <p className='text-gray-600 text-sm mb-1'>
                            <span className='font-medium text-gray-800'>Precio:</span> S/. 
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
                    </div>
                    <button className='bg-gradient-to-r from-blue-400 to-blue-700 text-white font-semibold py-2 px-4 mt-4 sm:mt-0 sm:ml-4 rounded-lg shadow-md lg:transition-transform lg:transform lg:duration-300 lg:hover:-translate-y-2l lg:hover:scale-110'
                        onClick={()=>handleOpen(product)}>
                        Agregar Stock
                    </button>
                    </li>
                ))}
                </ul>
    );
}

export default ProductList;