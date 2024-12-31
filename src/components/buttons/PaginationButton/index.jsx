import { MdFirstPage,MdLastPage } from 'react-icons/md';

const PaginationButton = ({offset, previus, next}) =>{
    return (
        <div className='flex items-center justify-center my-4'>
              <button 
                onClick={previus} 
                disabled={offset === 0}
                className='text-black border-slate-800 rounded-s-full mr-4 transition delay-50 hover:text-white hover:bg-black border hover:-translate-y-2 hover:scale-110 shadow-sm shadow-black'>
                <MdFirstPage className='w-6 h-6'/>
              </button>
              <button 
                onClick={next}
                className='text-black border border-slate-800 rounded-e-full ml-4 transition delay-50 hover:text-white hover:bg-black hover:-translate-y-2 hover:scale-110 shadow-sm shadow-black'>
                <MdLastPage className='w-6 h-6'/>
              </button>
        </div>
    );
};

export default PaginationButton;