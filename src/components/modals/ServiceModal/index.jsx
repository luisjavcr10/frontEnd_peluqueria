import { MdCancel } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';

const ServiceModal = ({isOpen, mode, service, onClose,onSave, handleEdit, handleCreate}) =>{
    if (!isOpen) return null; 
  
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
          <h2 className='text-lg font-bold mb-4'>
            {mode === 'show'
              ? 'Detalles del Servicio'
              : mode === 'edit'
              ? 'Editar Servicio'
              : 'Crear Servicio'}
          </h2>
          <form>
            <div className={`mb-4 ${mode === 'create' ? 'hidden' : ''}`}>
              <label className='block text-gray-700'>ID:</label>
              <input
                type='text'
                value={service?.idService || ''}
                readOnly
                className='w-full p-2 border rounded bg-gray-100 cursor-not-allowed'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Nombre:</label>
              <input
                type='text'
                value={service?.name || ''}
                readOnly={mode === 'show'}
                onChange={(e) =>
                  onSave({ ...service, name: e.target.value })
                }
                className='w-full p-2 border rounded'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Descripción:</label>
              <textarea
                value={service?.description || ''}
                readOnly={mode === 'show'}
                onChange={(e) =>
                  onSave({ ...service, description: e.target.value })
                }
                className='w-full p-2 border rounded'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Precio:</label>
              <textarea
                value={service?.price || ''}
                readOnly={mode === 'show'}
                onChange={(e) =>
                  onSave({ ...service, price: e.target.value })
                }
                className='w-full p-2 border rounded'
              />
            </div>
            <div className='flex justify-end space-x-4'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 bg-red-500 rounded transition delay-50 hover:bg-red-700 hover:-translate-y-2 hover:scale-110 hover:text-white'
              >
                <MdCancel />
              </button>
              {mode !== 'show' && (
                <button
                    onClick={()=>mode=== 'edit' ? handleEdit(service.idService, service): handleCreate(service) }
                  type='submit'
                  className='px-4 py-2 bg-green-500  rounded transition delay-50 hover:bg-green-700 hover:-translate-y-2 hover:scale-110 hover:text-white'
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

export default ServiceModal;