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
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            {user ? (
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            ID
                        </label>
                        <p className="mt-1 text-gray-900">{user.idUser}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        ) : (
                            <p className="mt-1 text-gray-900">{user.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        ) : (
                            <p className="mt-1 text-gray-900">{user.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <p className="mt-1 text-gray-900">{user.role?.name}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        {isEditing ? (
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        ) : (
                            <p className="mt-1 text-gray-900">********</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4">
                        {isEditing ? (
                            <button
                                type="button"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={toggleEditing}
                                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </form>
            ) : (
                <p className="text-center text-gray-500">Loading user data...</p>
            )}
        </div>
    );
};

export default CuentaUsuario;
