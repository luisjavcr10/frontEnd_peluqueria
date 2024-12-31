import { FaSearch } from 'react-icons/fa';

const FormSearch = ({handleSubmit, inputValue, handleInputValue}) =>{
    return (
        <form onSubmit={handleSubmit} className='flex justify-center items-center'>
            <input 
              type='text'  
              className='bg-white px-4 py-2 rounded-2xl border border-gray-300'
              placeholder='Buscar por ID'
              value={inputValue}
              onChange={(e) => handleInputValue(e.target.value)} 
            />
            <button 
                type='submit'
                className='bg-gray-300 p-4 m-2 rounded-full transition delay-50 hover:bg-gray-700 hover:-translate-y-2 hover:scale-110 hover:text-white'>
                <FaSearch />
            </button>
        </form>
    );
};

export default FormSearch;