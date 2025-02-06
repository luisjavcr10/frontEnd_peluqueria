import { useState } from "react";
import ModalListProduct from "../../../components/modals/ModalListProduct";
import ModalListService from "../../../components/modals/ModalListService";
import H2text from "../../../components/text/H2text";
import SalesSelect from "../../../components/selects/SalesSelect";
import Input from "../../../components/Input";
import AddItemInSale from "../../../components/buttons/AddItemInSale";
import SaleDailsTable from "../../../components/tables/SaleDetailsTable";
import { getDniData, getBasicRucData } from "../../../services/sunatService";
import { IoSend } from "react-icons/io5";

const DetallesVenta = () => {
    const [showProductModal, setShowProductModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [readOnlyInput, setReadOnlyInput] = useState(false);
    const [bgInput, setBgInput]=useState('');

    const handleAddItems = (newItems) => {
        setItems(prev => [...prev, ...newItems]);
      };
     
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
      idSales:"",
      idUser:"",
      ruc:"",
      totalGravado:"",
      igv:"",
      total : "",
      idCustomer: "",
      nameCustomer: "",
      correoCustomer:"",
      methodPayment: "",
    });
    // Estado para manejar los productos y servicios agregados
    const [items, setItems] = useState([]);
    // Estado para manejar solicitud de RUC y DNI
    const [docType, setDocType]=useState("");
    const handleDocType= (e)=>{
      setDocType(e.target.value);
    }

    //Comsumo de endpoint de api
    const fetchNameCustomer = async () => {
      const value = formData.idCustomer; 
      try {
        if (value.length === 8) {
          console.log('before')
          const data = await getDniData(value);
          console.log('after')
          if (data) {
            setReadOnlyInput(true);
            setBgInput('bg-gray-100')
            handleInputChange("nameCustomer", data.Nombres || '');
          }
        } else if (value.length === 11) {
          const data = await getBasicRucData(value);
          if (data) {
            setReadOnlyInput(true);
            setBgInput('bg-gray-100')
            handleInputChange("nameCustomer", data.RazonSocial || '');
          }
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    // Función para manejar cambios en los inputs del formulario
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Función para calcular el total de la venta
    const calcularTotal = () => {
        return items.reduce((total, item) => total + item.subTotal, 0).toFixed(2);
    };

    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl text-center font-semibold text-gray-800 mb-6 ml-6 ">
          Registrar Venta
        </h1>
        <div className="md:flex md:flex-row md:gap-4 md:justify-center">
          {/* Formulario de la venta */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <H2text message={'Datos de cliente'}/>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {/* Select: Tipo de Comprobante */}
                <div className="grid grid-cols-9 gap-2">
                  <div className="relative w-full col-start-1 col-span-3">
                    <SalesSelect 
                      value={docType} 
                      labelText={'Tipo de documento'} 
                      onChange={handleDocType}
                      options={['RUC','DNI']}
                    />
                  </div>
                  {/* Input: Numero de Documento */}
                  <div className="col-start-4 col-span-5">
                    <Input 
                      type={"number"} bg={bgInput} docType={docType}
                      value={formData.idCustomer} readOnly={readOnlyInput}
                      onChange={(e) => {
                        handleInputChange("idCustomer", e.target.value);
                      }} 
                      placeholder={"Número de documento"}/>
                  </div>
                  <div className="col-start-9 col-span-1 flex justify-center">
                    <button 
                      className="bg-gradient-to-r from-gray-600 to-neutral-700 text-white py-2 px-6 rounded-lg shadow-md" 
                      onClick={fetchNameCustomer}
                    >
                      <IoSend />
                    </button>
                  </div>
                </div>
                {/* Input: Nombre de Cliente */}
                <div>
                  <Input 
                        type={"text"} readOnly={true}
                        value={formData.nameCustomer} bg={"bg-gray-100 text-lime-600"}
                        onChange={(e) =>handleInputChange("nameCustomer", e.target.value)} 
                        placeholder={"Nombres y Apellidos o Razón Social"}/>
                </div>
                {/* Input: Correo de Cliente */}
                <div>
                <Input 
                        type={"text"} readOnly={false}
                        value={formData.correoCustomer} 
                        onChange={(e) =>handleInputChange("correoCustomer", e.target.value)} 
                        placeholder={"Correo electrónico (opcional)"}/>

                </div>
            </div>
          </div>

          <div className="lg:flex lg:flex-col">
            {/* Forma de Pago */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 lg:h-36">
              <H2text message={'Forma de Pago'}/>
              <div className="flex justify-center w-full lg:w-96 gap-4">
                <div className="relative w-full">
                  <SalesSelect 
                    labelText={'Forma de Pago'} 
                    value={formData.methodPayment} 
                    onChange={(e) => handleInputChange("methodPayment", e.target.value)}
                    options={['Efectivo','Tarjeta','Yape']}
                  />
                </div>
              </div>
            </div>
              {/* Botones para agregar productos y servicios */}
            <div className="flex justify-evenly gap-4 mb-6">
              <AddItemInSale onClick={() => setShowProductModal(true)} message={'Agregar Productos'}/>
              <AddItemInSale onClick={() => setShowServiceModal(true)} message={'Agregar Servicios'}/>
            </div>
          </div>
          
          
        </div>
        
        

        

        {/* Tabla de productos y servicios */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <H2text message={'Datos de la venta'}/>
          <SaleDailsTable items={items} total={calcularTotal()}/>
        </div>

        {/* Botón para procesar el pago */}
        <div className="mt-6">
          <button
            onClick={() => console.log("Procesar pago")}
            className="w-full bg-gradient-to-r from-gray-600 to-neutral-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-x-105"
          >
            Procesar Pago
          </button>
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