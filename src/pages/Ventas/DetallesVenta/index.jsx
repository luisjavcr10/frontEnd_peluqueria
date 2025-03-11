import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../../../services/userServices';
import { getSales, postSales } from "../../../services/salesServices";
import ModalListProduct from "../../../components/modals/ModalListProduct";
import ModalListService from "../../../components/modals/ModalListService";
import PayPalProvider from "../../../context/PayPalProvider";
import PayPalButton from "../../../components/buttons/PayPalButton";

// Import modular components
import CustomerForm from "./components/CustomerForm";
import PaymentMethodForm from "./components/PaymentMethodForm";
import ItemsButtons from "./components/ItemsButtons";
import SaleDetailsSection from "./components/SaleDetailsSection";

const DetallesVenta = () => {
  const navigate = useNavigate();

  const [showProductModal, setShowProductModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [quantitySales, setQuantitySales] = useState(null);

  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    idSales: "",
    idUser: "",
    ruc: "",
    totalGravado: "",
    igv: "",
    total: "",
    idCustomer: "",
    nameCustomer: "",
    correoCustomer: "",
    methodPayment: "Efectivo",
  });
  
  // Estado para manejar los productos y servicios agregados
  const [items, setItems] = useState([]);

  useEffect(() => {
    handleFetchUser();
    handleGetSales();
  }, []);

  const handleAddItems = (newItems) => {
    setItems(prev => {
      // Create a map of existing items by name for faster lookup
      const itemMap = Object.fromEntries(prev.map(item => [item.name, item]));
      
      // Process new items
      newItems.forEach(newItem => {
        if (itemMap[newItem.name]) {
          // Update quantity and recalculate subtotal if item exists
          itemMap[newItem.name].quantity = newItem.quantity;
          itemMap[newItem.name].subtotal = newItem.quantity * itemMap[newItem.name].unitPrice;
        } else {
          // Add new item to the map
          itemMap[newItem.name] = newItem;
        }
      });
      
      return Object.values(itemMap);
    });
  };

  // Función para manejar cambios en los inputs del formulario
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Función para calcular el total de la venta
  const calcularTotal = () => {
    return items.reduce((total, item) => total + (parseFloat(item.subtotal) || 0), 0).toFixed(2);
  };
  
  //Funcion para obtener el usuario actual del sistema
  const handleFetchUser = async () => {
    const userData = await getCurrentUser()
    setCurrentUser(userData.idUser);
  };

  //Funcion para obtener la cantidad de ventas
  const handleGetSales = async () => {
    try {
      const data = await getSales();
      setQuantitySales(data.sales.length);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  }

  //Funcion para contruir el id de la venta
  const buildIdSale = () => {
    const id = (formData.idCustomer.length === 11 ? 'F' : 'B') + '-' + (quantitySales + 1).toString().padStart(4, '0');
    return id;
  };

  //Funcion para construir los datos de la venta
  const buildSaleData = () => {
    const total = calcularTotal();
    const igv = total > 0 ? parseFloat((0.18 * total).toFixed(2)) : 0;
    const totalGravado = total > 0 ? parseFloat((total - igv).toFixed(2)) : 0;
    const correo = formData.correoCustomer;
    const date = new Date();

    const data = {
      idSales: buildIdSale(),
      idUser: currentUser,
      ruc: '10410023925',
      totalGravado: totalGravado,
      igv: igv,
      total: parseFloat(total),
      idCustomer: formData.idCustomer,
      nameCustomer: formData.nameCustomer,
      methodPayment: formData.methodPayment
    };

    return {
      saleData: data,
      saleDetailsData: items,
      correo,
      date
    };
  };
  
  const postSaleData = async (body, bodyWithCorreoAndDate) => {
    try {
      const dataSale = body.saleData;
      const saleDetails = body.saleDetailsData.map(({ name, ...rest }) => ({ ...rest }));
      const bodyFinal = {
        saleData: dataSale,
        saleDetailsData: saleDetails
      };
      await postSales(bodyFinal);
      navigate(`/ventas/detalles-venta/${dataSale.idSales}`, { state: { saleData: bodyWithCorreoAndDate } });
    } catch (error) {
      console.error("Error posting sale data:", error);
    }
  };
  
  const createSale = async () => {
    const dataSale = buildSaleData();
    const body = {
      saleData: dataSale.saleData,
      saleDetailsData: dataSale.saleDetailsData
    };
    await postSaleData(body, dataSale);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/*Titulo pagina */}
      <h1 className="text-2xl text-center font-semibold text-gray-800 mb-6 ml-6 ">
        Registrar Venta
      </h1>

      {/*Seccion del formulario de la venta */}
      <div className="md:flex md:flex-row md:gap-4 md:justify-center">
        {/* Componente de formulario de cliente */}
        <CustomerForm formData={formData} setFormData={setFormData} />

        {/** Seccion de forma de pago y agregar items */}
        <div className="lg:flex lg:flex-col">
          {/* Componente de método de pago */}
          <PaymentMethodForm 
            methodPayment={formData.methodPayment} 
            handleInputChange={handleInputChange} 
          />

          {/* Componente de botones para agregar items */}
          <ItemsButtons 
            onShowProductModal={() => setShowProductModal(true)} 
            onShowServiceModal={() => setShowServiceModal(true)} 
          />
        </div>
      </div>
      
      {/* Componente de detalles de venta */}
      <SaleDetailsSection items={items} total={calcularTotal()} />

      {/* Botón para procesar el pago */}
      <div className="flex flex-col items-center w-full mt-6">
        {formData.methodPayment === 'Efectivo' ? (
          <button
            onClick={createSale}
            className="w-11/12 bg-gradient-to-r from-gray-600 to-neutral-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-x-105"
          >
            Procesar Pago
          </button>
        ) : formData.methodPayment === 'PayPal' ? (
          <PayPalProvider>
            <PayPalButton orderData={buildSaleData()}/>
          </PayPalProvider>
        ) : (
          <button
            onClick={createSale}
            className="w-11/12 bg-gradient-to-r from-gray-600 to-neutral-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-x-105"
          >
            Procesar Pago
          </button>
        )}
      </div>

      {/* Modales */}
      <ModalListProduct
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onAddItems={handleAddItems}
      />

      <ModalListService
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        onAddItems={handleAddItems}
      />
    </div>
  );
};

export default DetallesVenta;
