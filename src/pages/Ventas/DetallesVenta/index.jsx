import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDniData, getBasicRucData } from "../../../services/sunatService";
import { getCurrentUser } from '../../../services/userServices';
import { getSales, postSales } from "../../../services/salesServices";
import ModalListProduct from "../../../components/modals/ModalListProduct";
import ModalListService from "../../../components/modals/ModalListService";
import H2text from "../../../components/text/H2text";
import SalesSelect from "../../../components/selects/SalesSelect";
import Input from "../../../components/Input";
import AddItemInSale from "../../../components/buttons/AddItemInSale";
import SaleDailsTable from "../../../components/tables/SaleDetailsTable";
import { IoSend } from "react-icons/io5";
import { ThreeDot } from 'react-loading-indicators';
import { MdCleaningServices } from "react-icons/md";

import PayPalProvider from "../../../context/PayPalProvider";
import PayPalButton from "../../../components/buttons/PayPalButton";

const DetallesVenta = () => {
    const [showProductModal, setShowProductModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [readOnlyInput, setReadOnlyInput] = useState(false);
    const [bgInput, setBgInput]=useState('');
    const [currectUser, setCurrentUser] = useState(null);
    const [quantitySales, setQuantitySales]=useState(null);

    const navigate = useNavigate();

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
      methodPayment: "Efectivo",
    });
    // Estado para manejar los productos y servicios agregados
    const [items, setItems] = useState([]);

    // Estado para manejar solicitud de RUC y DNI
    const [docType, setDocType]=useState("RUC");
    const handleDocType= (e)=>{
      setDocType(e.target.value);
      setReadOnlyInput(false);
      setBgInput('');
      setFormData((prev) => ({...prev,idCustomer:'', nameCustomer: ''}));
    }

    //Comsumo de endpoint de api
    // Add this state near your other useState declarations
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [cleanForm, setCleanForm] = useState(false)

    useEffect(() => {
      handleFetchUser();
      handleGetSales();
    }, []);
  
    const handleCleanForm = () =>{
      setCleanForm(false);
      setFormData((prev) => ({...prev,idCustomer:'', nameCustomer: ''}));
      setReadOnlyInput(false);
      setBgInput('');
    }

    // Modify the fetchNameCustomer function
    const fetchNameCustomer = async () => {
      const value = formData.idCustomer;
      setIsLoading(true); // Start loading
      try {
        if (value.length === 8) {
          const data = await getDniData(value);
          if (!data.mensaje) {
            setReadOnlyInput(true);
            setBgInput('bg-gray-100');
            handleInputChange("nameCustomer", data.nombres || '');
            setCleanForm(true);
          } else {
            setErrorMessage("Número de DNI no encontrado");
            setTimeout(() => {
              setErrorMessage("");
            }, 4000);
          }
        } else if (value.length === 11) {
          const data = await getBasicRucData(value);
          if (data) {
            setReadOnlyInput(true);
            setBgInput('bg-gray-100');
            handleInputChange("nameCustomer", data.razonSocial || '');
            setCleanForm(true);
          }
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setIsLoading(false); // Stop loading regardless of success or failure
      }
    };

    // Función para manejar cambios en los inputs del formulario
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Función para calcular el total de la venta
    const calcularTotal = () => {
      return items.reduce((total, item) => total + (parseFloat(item.subtotal) || 0), 0).toFixed(2);
  };

    const handleFetchUser = async () => {
      const userData = await getCurrentUser()
      setCurrentUser(userData.idUser);
    };

    const handleGetSales = async () => {
      try {
        const data = await getSales();
        setQuantitySales(data.sales.length);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    }

    const buildIdSale= () =>{
      const id = (docType==='RUC' ? 'F':'B')+'-'+(quantitySales+1).toString().padStart(4, '0');
      return id;
    };

    const buildSaleData = () => {
        const total = calcularTotal();
        const igv = (calcularTotal() === 0 ? 0 : 0.18 * total);
        const totalGravado = (calcularTotal() === 0 ? 0 : total - igv);
        const correo = formData.correoCustomer;
        const date = new Date();
    
        const data = {
            idSales: buildIdSale(),
            idUser: currectUser,
            ruc: '10410023925',
            totalGravado: parseFloat(totalGravado.toFixed(2)),
            igv: parseFloat(igv.toFixed(2)),
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
    
    const postSaleData = async (body) => {
        try {
            const dataSale = body.saleData;
            const saleDetails = body.saleDetailsData.map(({ name, ...rest }) => ({ ...rest }));
            const bodyFinal ={
              saleData:dataSale,
              saleDetailsData:saleDetails,
            }
            await postSales(bodyFinal);
            navigate(`/ventas/detalles-venta/${dataSale.idSales}`, { state: { saleData: body } });
        } catch (error) {
            console.error(error);
        }
    };
    
    const createSale = async () => {
        const dataSale = buildSaleData();
        const body = {
          saleData:dataSale.saleData,
          saleDetailsData: dataSale.saleDetailsData
        }
        await postSaleData(body);
    };

    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl text-center font-semibold text-gray-800 mb-6 ml-6 ">
          Registrar Venta
        </h1>
        <div className="md:flex md:flex-row md:gap-4 md:justify-center">
          {/* Formulario de la venta */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center w-full">
                <div>
                  <H2text message={'Datos de cliente'}/>
                </div>
                <div className="flex-1 flex justify-center mb-4">
                  {errorMessage && (
                    <span className="text-lg font-medium bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent animate-fade-in-out">
                      {errorMessage}
                    </span>
                  )}
                </div>
                {cleanForm &&(
                  <button 
                    className="mb-4 bg-cyan-600 p-2 hover:bg-cyan-700 rounded-lg text-white transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-110"
                    onClick={handleCleanForm}
                  >
                  <MdCleaningServices className="text-xl cursor-pointer "/>
                  </button>
                )}
                
              </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="grid grid-cols-9 gap-2">
                  {/* Select: Tipo de Documento */}
                  <div className="relative w-full col-start-1 col-span-3">
                    <SalesSelect 
                      value={docType} 
                      labelText={'Tipo de documento'} 
                      onChange={handleDocType}
                      options={['RUC','DNI']}
                    />
                  </div>
                  {/* Input: Numero de Documento */}
                  <div className="col-start-4 col-span-5 relative">
                    
                    <Input 
                      type={"number"}
                      bg={bgInput}
                      docType={docType}
                      value={formData.idCustomer}
                      readOnly={readOnlyInput}
                      onChange={(e) => {
                        handleInputChange("idCustomer", e.target.value);
                      }} 
                      placeholder={"Número de documento"}
                    />
                  </div>
                  <div className="col-start-9 col-span-1 flex justify-center">
                    {isLoading ? (
                      <ThreeDot variant="bob" color="black" size="small" text="" textColor="" />
                    ) : (
                      <button 
                        className="bg-gray-600 hover:bg-gray-700  text-white py-2 px-6 rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-110" 
                        onClick={fetchNameCustomer}
                      >
                        <IoSend />
                      </button>
                    )}
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
                    options={['Efectivo','PayPal','Tarjeta','Yape']}
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
        <div className="flex flex-col items-center w-full mt-6">
          {formData.methodPayment  === 'Efectivo' && <button
            onClick={createSale}
            className="w-11/12 bg-gradient-to-r from-gray-600 to-neutral-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-x-105"
          >
            Procesar Pago
          </button>}
            { formData.methodPayment  === 'PayPal' &&<PayPalProvider>
              <PayPalButton orderData={buildSaleData()}/>
            </PayPalProvider>}
          
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
