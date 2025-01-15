const Card = ({slide, onClick}) =>{
    return(
        <div
            key={slide.id}
            className='w-full flex flex-col flex-shrink-0 items-center bg-gray-100 border border-gray-300 rounded-2xl shadow-lg'
        >
            <h1 className='my-4 text-3xl font-kanit font-kanit-bold'>{slide.title}</h1>
            <img
                src={slide.image}
                alt={slide.title}
                className='w-full h-64 lg:h-96 object-cover'
            />
            <button 
                className='text-center font-semibold text-lg text-white p-2 my-4 bg-black rounded-xl'
                onClick={onClick}
            >
                Ingresar al mantenedor
            </button>
        </div>
    );
}

export default Card;