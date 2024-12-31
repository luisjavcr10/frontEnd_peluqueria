import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/userServices';

const CuentaUsuario = () =>{
    const [user,setUser] = useState(null);

    const handleFetchUser = async()=>{
        const result = await getCurrentUser();
        console.log(result);
        setUser(result);
    }

    useEffect(()=>{handleFetchUser()},[]);

    return (
        <div>
            <ul>
                <li>{user?.idUser}</li>
                <li>{user?.name}</li>
                <li>{user?.email}</li>
                <li>{user?.role?.name}</li>
            </ul>
        </div>
    );
}

export default CuentaUsuario;