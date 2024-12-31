import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState( ()=>{
        return localStorage.getItem('isAuthenticated') === 'true'; //cargamos el estado desde localstorage
    });

    const login = () =>{
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated','true');
        //guardamos en localstorage
    } 

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('jwt')
        localStorage.removeItem('idUser')
        //limpiamos localstorage
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};