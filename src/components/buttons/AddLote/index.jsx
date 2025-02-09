const AddLote = ({handleOpen}) =>{
    return (
        <div className="flex justify-center items-center">
            <button 
                className='bg-gradient-to-r from-gray-600 to-neutral-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md lg:transition-transform lg:transform lg:duration-300 lg:hover:-translate-y-2l lg:hover:scale-110'
                onClick={handleOpen}
            >
                Agregar Lote
            </button>
        </div>
    );
}

export default AddLote;