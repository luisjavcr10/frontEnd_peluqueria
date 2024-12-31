import { IoMdAddCircle } from 'react-icons/io';

const AddButton = ({onOpen, word}) =>{
    return (
        <div className='flex items-center justify-center'>
            <button 
                onClick={onOpen} 
                className='flex items-center justify-center text-black bg-green-500 p-2 m-2 rounded-xl transition delay-50 hover:bg-green-700 hover:-translate-y-2 hover:scale-110 hover:text-white shadow-md shadow-green-200'>
                <h1 className='mx-2 hover:text-white'>Agregar nuevo {word}</h1>
                <IoMdAddCircle className='mx-2' />
            </button>
        </div>
    );
};

export default AddButton;