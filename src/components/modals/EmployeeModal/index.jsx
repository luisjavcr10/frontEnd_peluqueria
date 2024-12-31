import { useState, useEffect } from 'react';
import { MdCancel } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';

const EmployeeModal = ({ isOpen, employee, mode, onClose, handleEdit, handleCreate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    passwordHash: '',
    idRole: 2, // Por defecto: Empleado
  });

  // Sincronización de datos iniciales para "edit" y "create"
  useEffect(() => {
    if (mode === 'edit' && employee) {
      setFormData({
        name: employee?.name || '',
        phone: employee?.phone || '',
        address: employee?.address || '',
        email: '',
        passwordHash: '',
        idRole: 2,
      });
    } else if (mode === 'create') {
      setFormData({
        name: '',
        phone: '',
        address: '',
        email: '',
        passwordHash: '',
        idRole: 2,
      });
    }
  }, [mode, employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'edit' && mode === 'show') {
      handleEdit(employee?.idEmployee, {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });
    } else if (mode === 'create') {
      handleCreate(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {mode === 'show'
            ? 'Detalles de Empleado'
            : mode === 'edit'
            ? 'Editar Empleado'
            : 'Crear Empleado'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Campos comunes para 'create' y 'edit' */}
          <div className="mb-4">
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={mode === 'show'}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              readOnly={mode === 'show'}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Dirección:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              readOnly={mode === 'show'}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Campos adicionales solo para 'create' */}
          {mode === 'create' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Correo electrónico:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Contraseña:</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="passwordHash"
                    value={formData.passwordHash}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Rol:</label>
                <select
                  name="idRole"
                  value={formData.idRole}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value={1}>Administrador</option>
                  <option value={2}>Empleado</option>
                </select>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 rounded transition hover:bg-red-700 hover:-translate-y-2 hover:scale-110 text-white"
            >
              <MdCancel />
            </button>
            {mode !== 'show' && (
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 rounded transition hover:bg-green-700 hover:-translate-y-2 hover:scale-110 text-white"
              >
                <FaSave />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
