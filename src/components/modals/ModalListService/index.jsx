import { useEffect, useState } from 'react';
import { getServices } from '../../../services/servicesService';
import { MdCancel } from 'react-icons/md';

const ModalListService = ({ isOpen, onClose, onAddItems }) => {
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const limit = 10;

    const handleFetchAll = async () => {
        try {
        const data = await getServices(offset, limit);
        setServices(data);
        } catch (error) {
        console.error(error);
        }
    };
 
    useEffect(() => {
        if (isOpen) {
        handleFetchAll();
        }
    }, [isOpen, offset]);

    const handleSelectService = (service) => {
        setSelectedServices(prev => {
        const exists = prev.find(s => s.idService === service.idService);
        if (exists) return prev;
        return [...prev, { ...service, quantity: 1 }];
        });
    };

    const handleRemoveSelectService = (service) => {
        setSelectedServices(prev => prev.filter(s => s.idService !== service.idService));
    };

    const handleQuantityChange = (id, quantity) => {
        setSelectedServices(prev =>
        prev.map(s =>
            s.idService === id ? { ...s, quantity: Math.max(1, quantity) } : s
        )
        );
    };

    const handleAddToSale = () => {
      const itemsToAdd = selectedServices.map(service => ({
        type: 'SERVICIO',
        id: service.idService,
        name: service.name,
        unitPrice: service.price,
        quantity: service.quantity,
        subTotal: service.price * service.quantity
      }));
      
      onAddItems(itemsToAdd);
      onClose();
    };

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-4/5 flex flex-col lg:flex-row">
        {/* Listado de servicios */}
        <div className="flex-1 p-6 border-r overflow-y-auto">
          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Buscar servicio..."
              className="bg-white px-4 py-2 rounded-2xl border border-gray-300 shadow-md outline-2 outline-green-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
            {services
              .filter(service =>
                service.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((service) => (
                <div
                  key={service.idService}
                  className={`border rounded-lg p-4 cursor-pointer   hover:bg-gray-200 shadow-md ${(selectedServices.find(s => s.idService === service.idService)) ? ' border-green-800 border-4 bg-gray-200' : 'bg-gray-50'}`}
                  onClick={() => handleSelectService(service)}
                >
                  <h3 className="h-8 font-light text-sm text-center">{service.name}</h3>
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-32 object-contain mb-2"
                  />
                  <p className="text-gray-600 text-center">S/ {service.price}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Servicios seleccionados */}
        <div className="w-full lg:w-96 p-6 overflow-y-auto">
          <h2 className="text-lg text-center font-semibold mb-4">Servicios seleccionados</h2>
          {selectedServices.map((service) => (
            <div key={service.idService} className="border-b py-2">
              <div className="grid grid-cols-8 items-center gap-2">
                <div className='col-start-1 lg:col-start-1 col-span-5 lg:col-span-4'>
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-gray-600">S/ {service.price}</p>
                </div>
                <input
                  type="number"
                  min="1"
                  value={service.quantity}
                  onChange={(e) =>
                    handleQuantityChange(service.idService, parseInt(e.target.value))
                  }
                  className="col-start-6 lg:col-start-5 col-span-2 lg:col-span-2 p-1 border rounded text-center outline-2 outline-green-800"
                />
                <button 
                  className='sm:w-full py-2 col-start-8 lg:col-start-7 col-span-1 lg:col-span-2 bg-gradient-to-r from-gray-700 to-neutral-600 text-black font-semibold  rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-x-105 flex justify-center items-center'
                  onClick={()=>handleRemoveSelectService(service)}>
                <MdCancel className='text-white items-center'/>
                </button>
              </div>
            </div>
          ))}
          
          <button
            onClick={handleAddToSale}
            className="w-full bg-gradient-to-r from-gray-600 to-neutral-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-x-105 my-2"
          >
            Agregar a la venta
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-gray-200 to-neutral-300 text-black font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-x-105 "
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalListService;