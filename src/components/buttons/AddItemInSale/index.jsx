const AddItemInSale = ({onClick, message}) =>{
    return(
        <button
            onClick={onClick}
            className="bg-gradient-to-r from-gray-600 to-neutral-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-110"
        >
          {message}
        </button>
    );
};

export default AddItemInSale;