import { MdCancel } from 'react-icons/md';

const XButton = ({close}) =>{
    return (
        <button
                type='button'
                onClick={close}
                className='px-4 py-2 mr-2 bg-red-500 rounded transition delay-50 hover:bg-red-700 hover:-translate-y-2 hover:scale-110 hover:text-white'
        >
                <MdCancel />
        </button>
    );
}

export default XButton