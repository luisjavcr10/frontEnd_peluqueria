import { FaSearch } from 'react-icons/fa';
import SearchButton from '../../buttons/SearchButton';

const FormSearch = ({submit, input, handleInput}) =>{
    return (
        <form onSubmit={submit} className='flex justify-center items-center'>
            <input 
              type='text'  
              className='bg-white px-4 py-2 rounded-2xl border border-gray-300'
              placeholder='Put on an ID or key word'
              value={input}
              onChange={handleInput} 
            />
            <SearchButton/>
        </form>
    );
};

export default FormSearch;