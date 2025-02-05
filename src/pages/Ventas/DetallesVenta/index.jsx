import { useState } from "react";
import ModalListProduct from "../../../components/modals/ModalListProduct";
import ModalListService from "../../../components/modals/ModalListService";
import H2text from "../../../components/text/H2text";
import SalesSelect from "../../../components/selects/SalesSelect";
import Input from "../../../components/Input";
import AddItemInSale from "../../../components/buttons/AddItemInSale";

const DetallesVenta = () => {
    const [showProductModal, setShowProductModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);

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
      console.log(e.target.value);
    }

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
        <h1 className="text-2xl text-center font-semibold text-gray-800 mb-6 ml-6">
          Registrar Venta
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <H2text message={'Forma de Pago'}/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Select: Forma de Pago */}
            <div className="relative w-full ">
              <SalesSelect 
                labelText={'Forma de Pago'} 
                value={formData.methodPayment} 
                onChange={(e) => handleInputChange("methodPayment", e.target.value)}
                options={['Efectivo','Tarjeta','Yape']}
              />
            </div>
          </div>
        </div>
        {/* Formulario de la venta */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <H2text message={'Datos de cliente'}/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Select: Tipo de Comprobante */}
              <div className="grid grid-cols-5 gap-2">
                <div className="relative w-full col-start-1 col-span-2">
                  <SalesSelect 
                    value={docType}
                    labelText={'Tipo de documento'} 
                    onChange={handleDocType}
                    options={['RUC','DNI']}
                  />
                </div>
                {/* Input: Numero de Documento */}
                <div className="col-start-3 col-span-3">
                  <Input 
                    type={"number"} 
                    value={formData.idCustomer} readOnly={false}
                    onChange={(e) => handleInputChange("idCustomer", e.target.value)} 
                    placeholder={"Número de documento"}/>
                </div>
              </div>
              {/* Input: Nombre de Cliente */}
              <div>
                <Input 
                      type={"text"} readOnly={true}
                      value={formData.nameCustomer} bg={"bg-gray-100"}
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

        {/* Botones para agregar productos y servicios */}
        <div className="flex justify-evenly gap-4 mb-6">
          <AddItemInSale onClick={() => setShowProductModal(true)} message={'Agregar Productos'}/>
          <AddItemInSale onClick={() => setShowServiceModal(true)} message={'Agregar Servicios'}/>
        </div>

        {/* Tabla de productos y servicios */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <H2text message={'Datos de la venta'}/>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Tipo</th>
                <th className="p-2">ID</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Precio Unitario</th>
                <th className="p-2">Cantidad</th>
                <th className="p-2">SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-2 text-center text-gray-500">
                    No hay items agregados.
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{item.type}</td>
                    <td className="p-2">{item.id}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">S/ {item.unitPrice}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">S/ {item.subTotal}</td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan="5" className="p-2 font-semibold text-right">
                  Total:
                </td>
                <td className="p-2 font-semibold">S/ {calcularTotal()}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Botón para procesar el pago */}
        <div className="mt-6">
          <button
            onClick={() => console.log("Procesar pago")}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
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