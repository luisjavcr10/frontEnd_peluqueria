const BackButton = ({reset}) =>{
    return (
        <div className='flex justify-center mt-4'>
            <button 
                onClick={reset} 
                className='bg-blue-500 text-white px-4 py-2 rounded-lg transition delay-50 hover:bg-blue-700 hover:-translate-y-2 hover:scale-110 hover:text-zinc-300 shadow-md shadow-blue-200'>
                Regresar a la lista completa
            </button>
        </div>
    );
};

export default BackButton;