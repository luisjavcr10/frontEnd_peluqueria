import { useEffect, useState } from 'react';
import { getSales } from '../../services/salesServices';
import { useNavigate } from 'react-router-dom';

import { IoBag } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { FaClipboardUser } from 'react-icons/fa6';
import { TbListDetails } from 'react-icons/tb';

const Ventas = () =>{
    const [sales, setSales] = useState([]);
    const [originalSales, setOriginalSales] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedSale, setSelectedSale] =useState(null);
    const [offset, setOffset] = useState(0);
    const [message, setMessage] = useState(null);
    const limit = 10;
    const navigate = useNavigate(); 

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

    const handleNewSale = () =>{
        navigate('/ventas/detalles-venta');
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
            <div className='flex flex-col justify-center items-center bg-gray-50 border border-gray-300 rounded-2xl shadow-xl p-6 m-4 w-11/12 lg:w-2/5 h-11/12 lg:h-3/4 overflow-y-auto'>
                {/* Botón de Registrar */}
                <div className='w-full  flex justify-center mb-4'>
                    <button 
                        className='bg-gradient-to-r from-gray-600 to-neutral-700 text-zinc-300 text-lg sm:text-xl lg:text-2xl px-6 py-3 rounded-lg font-semibold lg:transition-transform lg:transform lg:duration-300 lg:hover:-translate-y-2l lg:hover:scale-110 hover:text-white shadow-md shadow-gray-600 w-full lg:w-auto'
                        onClick={handleNewSale}
                    >
                        Registrar nueva venta
                    </button>
                </div>
                {/* Contenedores de Resumen y Ganancias */}
                <div className='flex flex-row justify-center gap-4 w-full'>
                    {/* Resumen de Ventas del Día */}
                    <div className='bg-gray-600 text-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col gap-4'>
                        <h2 className='text-zinc-300 hover:text-white text-center text-lg sm:text-xl font-bold tracking-wide'>Resumen de Ventas del Día</h2>
                            {/* Cantidad de Ventas */}
                        <div className='flex justify-between items-center text-zinc-300  hover:text-white'>
                            <h3 className=' text-sm sm:text-base font-medium tracking-wide'>Cantidad de Ventas</h3>
                            <p className='text-lg sm:text-xl font-extrabold'>10</p>
                        </div>
                            {/* Cantidad de Productos */}
                        <div className='flex justify-between items-center text-zinc-300 hover:text-white'>
                            <h3 className=' text-sm sm:text-base font-medium tracking-wide'>Cantidad de Productos</h3>
                            <p className=' text-lg sm:text-xl font-extrabold'>25</p>
                        </div>
                            {/* Cantidad de Servicios */}
                        <div className='flex justify-between items-center text-zinc-300 hover:text-white'>
                            <h3 className='text-sm sm:text-base font-medium tracking-wide'>Cantidad de Servicios</h3>
                            <p className='text-lg sm:text-xl font-extrabold'>5</p>
                        </div> 
                    </div>

                    {/* Ganancias del Día */}
                    <div className='bg-neutral-700 text-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col gap-4'>
                        <h2 className='text-zinc-300 hover:text-white text-center text-lg sm:text-xl font-bold tracking-wide'>Ganancias del Día</h2>
                        {/* Total Ganancias */}
                        <div className='flex justify-between items-center text-zinc-300 hover:text-white'>
                            <h3 className='text-sm sm:text-base font-medium tracking-wide'>Total Ganancias</h3>
                            <p className='text-lg sm:text-xl font-extrabold'>S/. 1200</p>
                        </div>
                        {/* Ganancia en Productos */}
                        <div className='flex justify-between items-center text-zinc-300 hover:text-white'>
                            <h3 className=' text-sm sm:text-base font-medium tracking-wide'>Ganancia en Productos</h3>
                            <p className='text-lg sm:text-xl font-extrabold'>S/. 800</p>
                        </div>
                        {/* Ganancia en Servicios */}
                        <div className='flex justify-between items-center text-zinc-300 hover:text-white'>
                            <h3 className='text-sm sm:text-base font-medium tracking-wide'>Ganancia en Servicios</h3>
                            <p className='text-lg sm:text-xl font-extrabold'>S/. 400</p>
                        </div>
                    </div>

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