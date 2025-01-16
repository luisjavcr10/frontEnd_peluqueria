const CarouselButton = ({onClick, children}) =>{
    return (
        <button
            onClick={onClick}
            className=' bg-gray-800 text-white p-4 m-4 rounded-full hover:bg-gray-700'
        >
            {children}
        </button>
    );
};

export default CarouselButton;