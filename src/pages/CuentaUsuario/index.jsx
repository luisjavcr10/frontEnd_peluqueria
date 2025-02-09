import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/userServices';

const CuentaUsuario = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleFetchUser = async () => {
        const result = await getCurrentUser();
        console.log(result);
        setUser(result);
        setFormData({
            email: result?.email || '',
            password: '',
            name: result?.name || ''
        });
    };

    useEffect(() => {
        handleFetchUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            await updateUser(user.idUser, formData); // Asume que `updateUser` está configurado
            alert('User updated successfully');
            setIsEditing(false);
            handleFetchUser(); // Refresca los datos del usuario
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            {user ? (
                <form className="space-y-6">
                    {/* ID */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">
                            ID
                        </label>
                        <p className="mt-1 text-gray-800 bg-gray-100 p-2 rounded-md">
                            {user.idUser}
                        </p>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">
                            Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-800 p-2"
                            />
                        ) : (
                            <p className="mt-1 text-gray-800 bg-gray-100 p-2 rounded-md">
                                {user.name}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">
                            Email
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-800 p-2"
                            />
                        ) : (
                            <p className="mt-1 text-gray-800 bg-gray-100 p-2 rounded-md">
                                {user.email}
                            </p>
                        )}
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">
                            Role
                        </label>
                        <p className="mt-1 text-gray-800 bg-gray-100 p-2 rounded-md">
                            {user.role?.name}
                        </p>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">
                            Password
                        </label>
                        {isEditing ? (
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-800 p-2"
                            />
                        ) : (
                            <p className="mt-1 text-gray-800 bg-gray-100 p-2 rounded-md">
                                ********
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4">
                        {isEditing ? (
                            <button
                                type="button"
                                className="py-2 px-6 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={toggleEditing}
                                className="py-2 px-6 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </form>
            ) : (
                <p className="text-center text-gray-500">Cargando los datos del usuario...</p>
            )}
        </div>

    );
};

export default CuentaUsuario;
