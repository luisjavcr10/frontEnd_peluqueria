const LogOutButton = ({handleClick, message, background}) =>{
    return (
        <button 
            onClick={handleClick}
            className={`m-4 p-2 ${background} h-10 w-40 rounded-xl transition-transform transform duration-300 hover:-translate-y-2l hover:scale-110`}
        >
            {message}
        </button>
    );
}

export default LogOutButton;