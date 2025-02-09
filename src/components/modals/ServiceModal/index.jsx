import { MdCancel } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ServiceModal = ({ isOpen, mode, service, onClose, onSave, handleEdit, handleCreate }) => {
  const [localService, setLocalService] = useState(service || {});

  useEffect(() => {
    if (isOpen) {
      setLocalService(service || {});
    }
  }, [isOpen, service]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setLocalService((prev) => ({ ...prev, image: base64Image }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setLocalService((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'edit') {
      handleEdit(localService.idService, localService);
    } else if (mode === 'create') {
      handleCreate(localService);
    }
    onClose();
  };

  if (!isOpen) return null;

  const isViewMode = mode === 'show';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-max overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === 'show'
              ? 'Detalles del Servicio'
              : mode === 'edit'
              ? 'Editar Servicio'
              : 'Crear Servicio'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className='flex flex-col md:flex-row justify-evenly'>
          <div>
          {mode !== 'create' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID:</label>
              <input
                type="text"
                value={localService.idService || ''}
                readOnly
                className="w-full p-2 bg-gray-100 rounded-md border border-gray-300 cursor-not-allowed"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
            <input
              type="text"
              value={localService.name || ''}
              readOnly={isViewMode}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full p-2 rounded-md border ${
                isViewMode ? 'bg-gray-100' : 'bg-white focus:ring-2 focus:ring-blue-500'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción:</label>
            <textarea
              value={localService.description || ''}
              readOnly={isViewMode}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`w-full p-2 rounded-md border ${
                isViewMode ? 'bg-gray-100' : 'bg-white focus:ring-2 focus:ring-blue-500'
              }`}
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio:</label>
            <input
              type="number"
              value={localService.price || ''}
              readOnly={isViewMode}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className={`w-full p-2 rounded-md border ${
                isViewMode ? 'bg-gray-100' : 'bg-white focus:ring-2 focus:ring-blue-500'
              }`}
            />
          </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen:</label>
            {!isViewMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            )}
            {localService.image ? (
              <div className="mt-4 relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={localService.image}
                  alt="Vista previa de la imagen"
                  className="w-full h-full object-contain p-2"
                />
              </div>
            ) : (
              <div className="mt-4 aspect-video bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                {isViewMode ? 'Sin imagen' : 'Vista previa de imagen'}
              </div>
            )}
          </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 flex items-center gap-2 text-red-600 hover:text-red-700 font-medium rounded-md border border-red-100 hover:border-red-200 bg-red-50 hover:bg-red-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-300 ease-in-out"
            >
              <MdCancel className="text-xl" />
              Cancelar
            </button>
            
            {!isViewMode && (
              <button
                type="submit"
                className="px-5 py-2 flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md transition-colors
                shadow-lg hover:shadow-xl transform hover:scale-105 duration-300 ease-in-out"
              >
                <FaSave className="text-lg" />
                Guardar Cambios
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;