const SalesSelect = ({labelText, value, onChange, options}) =>{
    return(
        <>
        <label className="absolute -top-2 left-2 bg-white px-1 text-gray-500 text-xs">
                {labelText}
        </label>
        <select
          value={value || options[0]}
          onChange={onChange}
          className="w-full p-2 border font-light rounded-md focus:ring-2 focus:ring-sky-900 focus:outline-none"
        >
          {options.map((option)=>(
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        </>
    );
}

export default SalesSelect;