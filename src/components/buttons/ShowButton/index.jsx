import { FaEye } from 'react-icons/fa';

const ShowButton = ({entity,onShow}) =>{
    return (
        <button
            onClick={() => onShow(entity)}
            className='p-2 m-2 bg-sky-400 rounded-md transition delay-50 hover:bg-sky-700 hover:-translate-y-2 hover:scale-110 hover:text-white'
        >
            <FaEye />
        </button>
    );
    
};

export default ShowButton;