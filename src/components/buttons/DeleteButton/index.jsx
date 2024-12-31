import { FaDeleteLeft } from 'react-icons/fa6';

const DeleteButton = ({id,onDelete}) =>{
    return (
        <button
            onClick={() => onDelete(id)}
            className='p-2 m-2 bg-red-500 rounded-md transition delay-50 hover:bg-red-700 hover:-translate-y-2 hover:scale-110 hover:text-white'
        >
            <FaDeleteLeft />
        </button>
    );
    
};

export default DeleteButton;