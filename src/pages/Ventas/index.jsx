import { useEffect, useState } from 'react';
import { getSales } from '../../services/salesServices';

import { IoBag } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { FaClipboardUser } from 'react-icons/fa6';

const Ventas = () =>{
    const [sales, setSales] = useState([]);
    const [originalSales, setOriginalSales] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedSale, setSelectedSale] =useState(null);
    const [offset, setOffset] = useState(0);
    const [message, setMessage] = useState(null);
    const limit = 10;

    useEffect(() => {handleFetchAll()}, [offset]);

    const openModal = (sale) =>{
        setIsOpenModal(true);
        setSelectedSale(sale);
        
    };

    const closeModal = () =>{
        console.log(selectedSale);
        setIsOpenModal(false);
        setSelectedSale(null);
    };

    const handleFetchAll = async () =>{
        try {
            const data = await getSales(offset, limit);
            setSales(data.sales);
            setOriginalSales(data.sales);
            console.log(sales);
            console.log(isOpenModal);
        } catch (error) {
            setMessage(error);
            console.error(message);
        }
    }

    return (
        <div className='flex flex-col lg:flex-row items-center justify-evenly bg-white w-full h-screen overflow-y-auto'>
            <div className='flex flex-col justify-center items-center bg-gray-50 border border-gray-300 rounded-2xl shadow-xl p-6 m-4 w-11/12 lg:w-2/5 h-2/5 lg:h-3/4 overflow-y-auto'>
                <button 
                    className='bg-green-500 text-2xl lg:text-3xl p-8 m-4 rounded-lg transition delay-50 hover:bg-green-700 hover:-translate-y-2 hover:scale-110 hover:text-white shadow-md shadow-green-200'
                    >
                    Registrar nueva venta</button>
                <div className='flex flex-row'>
                    <div className='bg-blue-500 p-8 m-4 rounded-lg'>2. Resumen de ventas del dia</div>
                    <div className='bg-orange-600 p-8 m-4 rounded-lg'>3. Ganancia del dia</div>
                </div>
            </div>
            <div className='bg-gray-50 border border-gray-300 rounded-2xl shadow-xl p-6 m-4 w-11/12 lg:w-2/5 h-2/5 lg:h-3/4 overflow-y-auto'>
            <h1 className='text-xl font-bold text-gray-800 mb-4 text-center border-b pb-2'>Historial de Ventas</h1>
            {sales.map((sale) => (
                <div
                key={sale.idSales}
                className='grid grid-cols-2 gap-x-4 gap-y-2 p-4 bg-white border border-gray-200 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 my-4'
                onClick={()=>openModal(sale)}
                >
                <div className='flex items-center col-span-2'>
                    <IoBag className='m-2'/>
                    <h1 className='text-lg font-semibold text-blue-600'>
                    Id de la venta: {sale.idSales}
                    </h1>
                </div>
                <div className='flex items-center'>
                    <FaUser className='m-2'/>
                    <h1 className='text-gray-800'>Empleado: {sale.user.name}</h1>
                </div>
                <div className='flex items-center'>
                    <FaClipboardUser className='m-2' />
                    <h1 className='text-gray-800'>Cliente: {sale.nameCustomer}</h1>
                </div>
                <div className='flex items-center col-span-2 justify-end'>
                    {/*Agregar icono*/}
                    <h1 className='text-gray-800 font-semibold'>Total: S/. {sale.total}</h1>
                </div>
                </div>
            ))}
            </div>

            {/* Modal */}
            {isOpenModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' onClick={closeModal}>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Ventas;