import { GrLogin } from "react-icons/gr";

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
                className="
                    text-center 
                    text-lg 
                    text-white 
                    px-6 
                    py-3 
                    my-4 
                    bg-gradient-to-r 
                    from-gray-500 
                    via-gray-600 
                    to-gray-700 
                    hover:from-gray-600 
                    hover:via-gray-700 
                    hover:to-gray-800 
                    rounded-xl 
                    flex 
                    flex-row 
                    items-center 
                    gap-3 
                    shadow-lg 
                    hover:shadow-xl 
                    transform 
                    hover:scale-105 
                    transition 
                    duration-300 
                    ease-in-out
                "
                onClick={onClick}
            >
                Visitar
                <GrLogin className="text-xl" />
            </button>

        </div>
    );
}

export default Card;