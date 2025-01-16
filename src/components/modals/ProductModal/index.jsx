import { useEffect, useState } from 'react';
import {getCategories} from '../../../services/categoriesService'

import { MdCancel } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';


const ProductModal = ({ isOpen, product, mode, onClose,onSave, handleEdit, handleCreate }) =>{
    const [categories, setCategories] = useState([]);
    const [selectValue, setSelectValue] = useState(0);
    const [body, setBody] = useState({});

    //Metodo para los cambios del select
    const handleChangeSelect = (event) => {
        const value = event.target.value;
        setSelectValue(value);
        if (value !== 'default') {
            setBody((prev) =>({...prev,idCategory:value} ))
        } 
        console.log(body);
    };

    const handleFetchAll = async () =>{
        try {
            const data = await getCategories();
            setCategories(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{handleFetchAll()},[]);

    if (!isOpen) return null; 

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 w-full m-4 max-w-md rounded-lg overflow-y-auto'>
                <h2 className="text-lg font-bold mb-4">
                {mode === 'show'
                    ? 'Detalles de Producto'
                    : mode === 'edit'
                    ? 'Editar Producto'
                    : 'Crear Producto'}
                </h2>
                <form>
                    <div className='grid grid-cols-4 gap-2'>
                        <div className={`mb-4 col-start-1 col-span-1`}>
                            <label className='block text-gray-700'>ID:</label>
                            <input
                                type='number'
                                value={product?.idProduct|| ''}
                                readOnly
                                className='w-full p-2 border rounded bg-gray-300 cursor-not-allowed  shadow-sm shadow-slate-500'
                            />
                        </div>
                        <div className='mb-4 col-start-2 col-span-3'>
                            <label className='block text-gray-700'>Nombre:</label>
                            <input
                                type='text'
                                value={product?.name || ''}
                                readOnly={mode === 'show'}
                                onChange={(e) =>(
                                    onSave({ ...product, name: e.target.value }),
                                    setBody((prev) => ({...prev, name:e.target.value}))
                                )}
                                className='w-full p-2 border rounded bg-gray-100 shadow-sm shadow-slate-500'
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Descripción:</label>
                        <textarea
                            value={product?.description || ''}
                            readOnly={mode === 'show'}
                            onChange={(e) =>(
                                onSave({ ...product, description: e.target.value }),
                                setBody((prev) => ({...prev, description:e.target.value}))
                            )}
                            className='w-full p-2 border rounded bg-gray-100 shadow-sm shadow-slate-500 '
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Categoria:</label>
                        <select className='mb-4 w-full p-2 border bg-gray-100 rounded shadow-sm shadow-slate-500' onChange={handleChangeSelect}>
                                <option value='default'>{mode==='create' ? 'Selecciona categoria' : product?.category?.name}</option>
                                {categories.map((category) =>(
                                    category.idCategory !== product?.category?.idCategory?<option key={category.idCategory} value={category.idCategory}>{category.name}</option>:''
                                ))}
                        </select>
                    </div>
                    
                    <div className='grid grid-cols-4 gap-2'>
                        <div className='mb-4  col-start-1 col-span-2'>
                            <label className='block text-gray-700'>Precio:</label>
                            <input
                                type='number'
                                value={product?.price}
                                readOnly={mode === 'show'}
                                onChange={(e) =>(
                                    onSave({ ...product, price: e.target.value }),
                                    setBody((prev) => ({...prev, price:e.target.value}))
                                )}
                                className='w-full p-2 border bg-gray-100 rounded shadow-sm shadow-slate-500'
                            />
                        </div>
                        <div className='mb-4  col-start-3 col-span-2'>
                            <label className='block text-gray-700'>Stock:</label>
                            <input
                                type='number'
                                value={product?.stock}
                                readOnly={mode === 'show'}
                                onChange={(e) =>(
                                    onSave({ ...product, stock: e.target.value }),
                                    setBody((prev) => ({...prev, stock:e.target.value}))
                                )}
                                className='w-full p-2 border bg-gray-100 rounded shadow-sm shadow-slate-500'
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-4 gap-2'>
                        <div className='mb-4  col-start-1 col-span-2'>
                            <label className='block text-gray-700'>Fecha Llegada:</label>
                            <input
                                type='date'
                                value={product?.arrivalDate}
                                readOnly={mode === 'show'}
                                onChange={(e) =>(
                                    onSave({ ...product, arrivalDate: e.target.value }),
                                    setBody((prev) => ({...prev, arrivalDate:e.target.value}))
                                )}
                                className='w-full p-2 border bg-gray-100 rounded shadow-sm shadow-slate-500'
                            />
                        </div>
                        <div className='mb-4  col-start-3 col-span-2'>
                            <label className='block text-gray-700'>Fecha Vencimiento:</label>
                            <input
                                type='date'
                                value={product?.expirationDate}
                                readOnly={mode === 'show'}
                                onChange={(e) =>(
                                    onSave({ ...product, expirationDate: e.target.value }),
                                    setBody((prev) => ({...prev, expirationDate:e.target.value}))
                                )}
                                className='w-full p-2 border bg-gray-100 rounded shadow-sm shadow-slate-500'
                            />
                        </div>
                    </div>
                    
                    
                    <div className='flex justify-end space-x-4'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='px-4 py-2 bg-red-500 rounded transition delay-50 hover:bg-red-700 hover:-translate-y-2 hover:scale-110 hover:text-white'
                        >
                            <MdCancel />
                        </button>
                        {mode !== 'show' && (
                            <button
                                onClick={()=>mode=== 'edit' ? handleEdit(product.idProduct, body): handleCreate(body) }
                                type='submit'
                                className='px-4 py-2 bg-green-500  rounded transition delay-50 hover:bg-green-700 hover:-translate-y-2 hover:scale-110 hover:text-white'
                            >
                                <FaSave />
                            </button>
                        )}
                    </div>
                    
                </form>

            </div>

        </div>
    );
};

export default ProductModal;