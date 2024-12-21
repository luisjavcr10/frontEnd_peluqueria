import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { useState } from 'react';

const Login = () => {
  const { login: authLogin } = useAuth(); // Extraer valores del contexto
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({email: '', password: ''})
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };


  const handleLogin = async () => {
    try {
      const data=  await login(credentials);
      console.log(data)
      authLogin();
      navigate('/'); 
    } catch (error) {
      setError(err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-black space-y-6 lg:space-y-0 lg:space-x-10">
      <div className='flex flex-col lg:flex-row items-center justify-center lg:w-4/5 lg:h-4/5 bg-black lg:rounded-lg lg:p-8 shadow-lg shadow-rose-100 m-8 p-8'>
        {/* Imagen del logotipo */}
        <div className="flex-shrink-0">
          <img 
            className="rounded-full w-60 h-60 lg:w-3/4 lg:h-3/4 object-cover" 
            src="./../../../public/img/logotipoPNG.png" 
            alt="Logotipo" 
          />
        </div>
        {/* Formulario */}
        <form
          onSubmit={(e) => e.preventDefault()} // Previene el envío del formulario
          className=" w-full max-w-md p-6 m-8 bg-zinc-50 rounded-2xl shadow-md "
        >
          <h2 className="text-lg text-center font-bold mb-4 text-black">Iniciar Sesión</h2>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            name="email"
            placeholder="Ingresa tu correo electrónico"
            value={credentials.email}
            onChange={handleInputChange}
            className="bg-zinc-50 border-b-4 rounded-2xl p-2 mb-4 w-full caret-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:rounded-2xl"
          />
          <input
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={credentials.password}
            onChange={handleInputChange}
            className="bg-zinc-50 border-b-4 rounded-2xl p-2 mb-4 w-full caret-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:rounded-2xl"
          />
          <button
            type="button"
            onClick={handleLogin}
            className="flex justify-center bg-black text-zinc-50 p-2 rounded-2xl w-2/4 mx-auto transition delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-zinc-200 hover:text-black duration-300"
          >
            Ingresar
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default Login;
