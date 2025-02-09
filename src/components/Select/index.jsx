const Select = ({value, handleChange, entities}) =>{
    return (
        <select
            className='bg-gray-100 border border-gray-300 rounded-lg text-gray-700 py-2 px-4 focus:ring-2 focus:ring-green-400 focus:outline-none'
            value={value}
            onChange={handleChange}
        >
            <option value='default'>Todos</option>
            {entities.map((entity) => (
            <option
                key={entity.idCategory}
                value={entity.idCategory}
                className='text-gray-700'
            >
                {entity.name}
            </option>
            ))}
        </select>
    );
}

export default Select;