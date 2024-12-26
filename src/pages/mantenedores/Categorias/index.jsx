import { useEffect, useState } from 'react';
import { getCategories } from '../../../services/categoriesService';

{/*Icons*/}
import { FaEye } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';


const Categorias = () =>{
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllCategories = async () =>{
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                setError(error);
            }
        };
        getAllCategories();  
    },[]);

    return (  
        <div className="bg-blue-200 w-full lg:w-5/6 h-full lg:h-10/12 overflow-x-auto">
            <table className='table-auto w-full border-collapse border border-gray-300'>
                <thead className='bg-gray-200'>
                    <tr>
                        <th className='border border-gray-300 px-4 py-2 text-left'>ID</th>
                        <th className='border border-gray-300 px-4 py-2 text-left'>Nombre</th>
                        <th className='border border-gray-300 px-4 py-2 text-left'>Descripcion</th>
                        <th className='border border-gray-300 px-4 py-2 text-left'>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr
                            key={category.idCategory}
                            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                            <td className="border border-gray-300 px-2  text-sm">{category.idCategory}</td>
                            <td className="border border-gray-300 px-2 text-sm">{category.name}</td>
                            <td className="border border-gray-300 px-2 text-sm">{category.description}</td>
                            <td className="border border-gray-300 px-2 ">
                                <button className='p-2 m-2 bg-sky-400 rounded-md transition delay-50 hover:bg-sky-700 hover:-translate-y-2 hover:scale-110'><FaEye /></button>
                                <button className='p-2 m-2 bg-green-400 rounded-md transition delay-50 hover:bg-green-600 hover:-translate-y-2 hover:scale-110'><FaEdit /></button>
                                <button className='p-2 m-2 bg-red-500 rounded-md transition delay-50 hover:bg-red-700 hover:-translate-y-2 hover:scale-110'><FaDeleteLeft /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Categorias;