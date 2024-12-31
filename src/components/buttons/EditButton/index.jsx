import { FaEdit } from 'react-icons/fa';

const EditButton = ({entity,onEdit}) =>{
    return (
        <button
            onClick={() => onEdit(entity)}
            className='p-2 m-2 bg-yellow-400 rounded-md transition delay-50 hover:bg-yellow-600 hover:-translate-y-2 hover:scale-110 hover:text-white'
        >
            <FaEdit />
        </button>
    );
    
};

export default EditButton;