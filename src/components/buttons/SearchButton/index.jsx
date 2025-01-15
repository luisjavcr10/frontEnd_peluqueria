import { FaSearch } from 'react-icons/fa';

const SearchButton = () => {
  return (
    <button
      type='submit'
      className='bg-gray-300 p-4 m-2 rounded-full transition delay-50 hover:bg-gray-700 hover:-translate-y-2 hover:scale-110 hover:text-white'
    >
      <FaSearch />
    </button>
  );
};

export default SearchButton;
