import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Inventario from '../pages/Inventario';
import CuentaUsuario from '../pages/CuentaUsuario';
import Ventas from '../pages/Ventas';
import Categorias from '../pages/mantenedores/Categorias';
import Productos from '../pages/mantenedores/Productos';
import Servicios from '../pages/mantenedores/Servicios';
import Empleados from '../pages/mantenedores/Empleados';
import Roles from '../pages/mantenedores/Roles';
import MantenedorHome from '../pages/MantenedorHome';
import DetallesVenta from '../pages/Ventas/DetallesVenta';
import DetallePostVenta from '../pages/Ventas/DetallePostVenta';

const AppRoutes = () =>{
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Ruta pública */}
                    <Route path='/login' element={<Login/>}/>
                    {/* Rutas protegidas dentro del Dashboard */}
                    <Route path='/' element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>}>
                        <Route path='mantenedores' element={<MantenedorHome/>}/>
                        <Route path='inventario' element={<Inventario/>}/>
                        <Route path='cuenta-usuario' element={<CuentaUsuario/>}/>
                        <Route path='ventas' element={<Ventas/>}/>
                        <Route path='ventas/detalles-venta' element={<DetallesVenta/>}/>
                        <Route path='ventas/detalles-venta/:idVenta' element={<DetallePostVenta/>}/>
                        <Route path='mantenedores/categorias' element={<Categorias/>}/>
                        <Route path='mantenedores/productos' element={<Productos/>}/>
                        <Route path='mantenedores/servicios' element={<Servicios/>}/>
                        <Route path='mantenedores/empleados' element={<Empleados/>}/>
                        <Route path='mantenedores/roles' element={<Roles/>}/>
                    </Route>
                    {/* Redirección por defecto */}
                    <Route path='*' element={<Navigate to="/login" />} />   
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default AppRoutes;