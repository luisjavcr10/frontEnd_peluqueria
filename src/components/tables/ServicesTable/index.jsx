import { FaEye, FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';

const ServicesTable = ({services, onShow, onEdit, onDelete}) =>{
    return (
        <div className='flex justify-center w-full mt-8'>
            <div className='w-4/5 overflow-x-auto'>
                <table className='table-auto w-full border-collapse border border-black'>
                <thead className='bg-black'>
                    <tr>
                    <th className='border border-gray-300 px-4 py-2 text-left text-white'>ID</th>
                    <th className='border border-gray-300 px-4 py-2 text-left text-white'>Nombre</th>
                    <th className='border border-gray-300 px-4 py-2 text-left text-white'>Descripción</th>
                    <th className='border border-gray-300 px-4 py-2 text-left text-white'>Precio</th>
                    <th className='border border-gray-300 px-4 py-2 text-left text-white'>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => (
                    <tr
                        key={service.idService}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                        <td className='border border-gray-300 px-2 mx-2 text-sm'>{service.idService}</td>
                        <td className='border border-gray-300 px-2 mx-2 text-sm'>{service.name}</td>
                        <td className='border border-gray-300 px-2 mx-2 text-sm'>{service.description}</td>
                        <td className='border border-gray-300 px-2 mx-2 text-sm'>{service.price}</td>
                        
                        <td className='border border-gray-300 px-2 mx-2'>
                        <div className='flex space-x-2 overflow-x-auto'>
                            <button
                            onClick={() => onShow(service)}
                            className='p-2 m-2 bg-sky-400 rounded-md transition delay-50 hover:bg-sky-700 hover:-translate-y-2 hover:scale-110 hover:text-white'
                            >
                            <FaEye />
                            </button>
                            <button
                            onClick={() => onEdit(service)}
                            className='p-2 m-2 bg-yellow-400 rounded-md transition delay-50 hover:bg-yellow-600 hover:-translate-y-2 hover:scale-110 hover:text-white'
                            >
                            <FaEdit />
                            </button>
                            <button
                            onClick={() => onDelete(service.idService)}
                            className='p-2 m-2 bg-red-500 rounded-md transition delay-50 hover:bg-red-700 hover:-translate-y-2 hover:scale-110 hover:text-white'
                            >
                            <FaDeleteLeft />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServicesTable;