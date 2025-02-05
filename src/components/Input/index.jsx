const Input = ({type, value, onChange, bg, placeholder, readOnly}) =>{
    return(
        <input
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          className={`w-full p-2 border ${bg} rounded-md focus:ring-2 focus:ring-sky-900 focus:outline-none`}
          placeholder={placeholder}
        />
    );
};

export default Input;