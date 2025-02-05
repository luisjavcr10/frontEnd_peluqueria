import { useEffect, useState } from 'react';
import { getServices } from '../../../services/servicesService';

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

    const handleQuantityChange = (id, quantity) => {
        setSelectedProducts(prev =>
        prev.map(s =>
            s.idService === id ? { ...p, quantity: Math.max(1, quantity) } : s
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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-3/4 flex">
        {/* Listado de servicios */}
        <div className="flex-1 p-6 border-r overflow-y-auto">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar servicio..."
              className="w-full p-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services
              .filter(service =>
                service.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((service) => (
                <div
                  key={service.idService}
                  className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSelectService(service)}
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-32 object-contain mb-2"
                  />
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-gray-600">S/ {service.price}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Productos seleccionados */}
        <div className="w-96 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Servicios seleccionados</h2>
          {selectedServices.map((service) => (
            <div key={service.idService} className="border-b py-2">
              <div className="flex justify-between items-center">
                <div>
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
                  className="w-20 p-1 border rounded text-center"
                />
              </div>
            </div>
          ))}
          
          <button
            onClick={handleAddToSale}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Agregar a la venta
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalListService;