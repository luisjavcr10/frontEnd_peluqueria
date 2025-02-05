import { useEffect, useState } from 'react';
import { getCategories } from '../../../services/categoriesService';
import { MdCancel } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';

const ProductModal = ({ isOpen, product, mode, onClose, onSave, handleEdit, handleCreate }) => {
  const [categories, setCategories] = useState([]);
  const [localProduct, setLocalProduct] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLocalProduct(product || {});
      setSelectedCategory(product?.category?.idCategory || '');
    }
  }, [isOpen, product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLocalProduct(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setLocalProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...localProduct,
      idCategory: selectedCategory !== '' ? selectedCategory : localProduct.category?.idCategory
    };
    
    if (mode === 'edit') {
      handleEdit(updatedProduct.idProduct, updatedProduct);
    } else {
      handleCreate(updatedProduct);
    }
    onClose();
  };

  if (!isOpen) return null;

  const isViewMode = mode === 'show';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden m-8 p-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === 'show' ? 'Detalles del Producto' : 
             mode === 'edit' ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna Izquierda */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                <input
                  value={localProduct.idProduct || ''}
                  readOnly
                  className="w-full p-2 bg-gray-100 rounded-md border border-gray-300 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  value={localProduct.name || ''}
                  readOnly={isViewMode}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full p-2 rounded-md border ${
                    isViewMode ? 'bg-gray-100' : 'bg-white focus:ring-2 focus:ring-blue-500'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  disabled={isViewMode}
                  className={`w-full p-2 rounded-md border ${
                    isViewMode ? 'bg-gray-100' : 'bg-white focus:ring-2 focus:ring-blue-500'
                  }`}
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((category) => (
                    <option key={category.idCategory} value={category.idCategory}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={localProduct.description || ''}
                  readOnly={isViewMode}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`w-full p-2 rounded-md border ${
                    isViewMode ? 'bg-gray-100' : 'bg-white focus:ring-2 focus:ring-blue-500'
                  }`}
                  rows="3"
                />
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                  <input
                    type="number"
                    value={localProduct.price || ''}
                    readOnly={isViewMode}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className={`w-full p-2 rounded-md border ${
                      isViewMode ? 'bg-gray-100' : 'bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={localProduct.stock || ''}
                    readOnly={isViewMode}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    className={`w-full p-2 rounded-md border ${
                      isViewMode ? 'bg-gray-100' : 'bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Llegada</label>
                  <input
                    type="date"
                    value={localProduct.arrivalDate || ''}
                    readOnly={isViewMode}
                    onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
                    className={`w-full p-2 rounded-md border ${
                      isViewMode ? 'bg-gray-100' : 'bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Vencimiento</label>
                  <input
                    type="date"
                    value={localProduct.expirationDate || ''}
                    readOnly={isViewMode}
                    onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                    className={`w-full p-2 rounded-md border ${
                      isViewMode ? 'bg-gray-100' : 'bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                {!isViewMode && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                )}
                {localProduct.image ? (
                  <div className="mt-4 relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={localProduct.image}
                      alt="Vista previa"
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

export default ProductModal;