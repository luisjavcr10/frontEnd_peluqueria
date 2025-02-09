import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const mantenedores = [
    {
        id:1,
        name:'Categorias',
        url:'/mantenedores/categorias'
    },
    {
        id:2,
        name:'Servicios',
        url:'/mantenedores/servicios'
    },
    {
        id:3,
        name:'Productos',
        url:'/mantenedores/productos'
    },
    {
        id:4,
        name:'Roles',
        url:'/mantenedores/roles'
    },
    {
        id:5,
        name:'Empleados',
        url:'/mantenedores/empleados'
    }
];

const MantenedorSelect = ({titulo}) =>{
    const [selectValue, setSelectValue] = useState('')

    const navigate = useNavigate();

    //Metodo para los cambios del select
    const handleChangeSelect = (event) => {
        const value = parseInt(event.target.value);
        setSelectValue(value);
        if (value !== 'default') {
            const result=mantenedores.find((m)=>m.id===value)
            navigate(result.url)
            console.log(result)
        } 
    };

    return(
        <select className='font-kanit font-kanit-bold text-3xl' onChange={handleChangeSelect}
        >
            <option value='default'>{titulo}</option>
            {mantenedores.map((mantenedor=>(
                mantenedor.name!==titulo ? 
                <option 
                    key={mantenedor.id} 
                    value={mantenedor.id}
                    className='text-sm'
                >
                    {mantenedor.name}
                </option>
                :''
            )))}
        </select>
    );
};

export default MantenedorSelect;