import { useState } from 'react';
import { getDniData, getBasicRucData } from "../../../../services/sunatService";
import H2text from "../../../../components/text/H2text";
import SalesSelect from "../../../../components/selects/SalesSelect";
import Input from "../../../../components/Input";
import { IoSend } from "react-icons/io5";
import { ThreeDot } from 'react-loading-indicators';
import { MdCleaningServices } from "react-icons/md";

const CustomerForm = ({ formData, setFormData }) => {
  const [docType, setDocType] = useState("RUC");
  const [readOnlyInput, setReadOnlyInput] = useState(false);
  const [bgInput, setBgInput] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cleanForm, setCleanForm] = useState(false);

  const handleDocType = (e) => {
    setDocType(e.target.value);
    setReadOnlyInput(false);
    setBgInput('');
    setFormData((prev) => ({ ...prev, idCustomer: '', nameCustomer: '' }));
  };

  const handleCleanForm = () => {
    setCleanForm(false);
    setFormData((prev) => ({ ...prev, idCustomer: '', nameCustomer: '' }));
    setReadOnlyInput(false);
    setBgInput('');
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const fetchNameCustomer = async () => {
    const value = formData.idCustomer;
    if (!value || (value.length !== 8 && value.length !== 11)) {
      setErrorMessage("Ingrese un número de documento válido");
      setTimeout(() => setErrorMessage(""), 4000);
      return;
    }

    setIsLoading(true);
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
          setTimeout(() => setErrorMessage(""), 4000);
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
      setErrorMessage("Error al obtener datos del cliente");
      setTimeout(() => setErrorMessage(""), 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/** Fila del titulo*/}
      <div className="flex justify-between items-center w-full">
        {/** Titulo de la seccion*/}
        <H2text message={'Datos de cliente'} />

        {/** Mensaje de error de la API Sunat*/}
        <div className="flex-1 flex justify-center mb-4">
          {errorMessage && (
            <span className="text-lg font-medium bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent animate-fade-in-out">
              {errorMessage}
            </span>
          )}
        </div>

        {/** Boton para limpiar los datos de cliente*/}
        {cleanForm && (
          <button
            className="mb-4 bg-cyan-600 p-2 hover:bg-cyan-700 rounded-lg text-white transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-110"
            onClick={handleCleanForm}
          >
            <MdCleaningServices className="text-xl cursor-pointer " />
          </button>
        )}
      </div>

      {/** Filas de los input de datos de cliente*/}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="grid grid-cols-9 gap-2">
          {/* Select: Tipo de Documento */}
          <div className="relative w-full col-start-1 col-span-3">
            <SalesSelect
              value={docType}
              labelText={'Tipo de documento'}
              onChange={handleDocType}
              options={['RUC', 'DNI']}
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

          {/* Boton: Enviar numero de documento al API y loading */}
          <div className="col-start-9 col-span-1 flex justify-center">
            {isLoading ? (
              <ThreeDot variant="bob" color="black" size="small" text="" textColor="" />
            ) : (
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-110"
                onClick={fetchNameCustomer}
              >
                <IoSend />
              </button>
            )}
          </div>
        </div>

        {/* Input: Nombre de Cliente */}
        <Input
          type={"text"} readOnly={true}
          value={formData.nameCustomer} bg={"bg-gray-100 text-lime-600"}
          onChange={(e) => handleInputChange("nameCustomer", e.target.value)}
          placeholder={"Nombres y Apellidos o Razón Social"}
        />

        {/* Input: Correo de Cliente */}
        <Input
          type={"text"} readOnly={false}
          value={formData.correoCustomer}
          onChange={(e) => handleInputChange("correoCustomer", e.target.value)}
          placeholder={"Correo electrónico (opcional)"}
        />
      </div>
    </div>
  );
};

export default CustomerForm;