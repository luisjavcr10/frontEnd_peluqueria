import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({children}) =>{
    const {isAuthenticated} = useAuth();
    console.log('Usuario autenticado:', isAuthenticated);
    if(!isAuthenticated){
        return <Navigate to='/login' />;
    }
    return children;
}

export default ProtectedRoute;