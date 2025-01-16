import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BackToMenuButton = () =>{
    const navigate = useNavigate();

    const handleButton = () =>{
        navigate('/mantenedores');
    };

    return (
        <button
            className="text-center 
                    text-sm 
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
                    ease-in-out"
            onClick={handleButton}        
        >
            <MdOutlineKeyboardBackspace/>
            Regresar al menú principal
        </button>
    );
};

export default BackToMenuButton;