import H2text from "../../../../components/text/H2text";
import SalesSelect from "../../../../components/selects/SalesSelect";

const PaymentMethodForm = ({ methodPayment, handleInputChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 lg:h-36">
      {/* Titulo*/}
      <H2text message={'Forma de Pago'}/>
      
      {/* Select: Forma de pago*/}
      <div className="flex justify-center w-full lg:w-96 gap-4">
        <div className="relative w-full">
          <SalesSelect 
            labelText={'Forma de Pago'} 
            value={methodPayment} 
            onChange={(e) => handleInputChange("methodPayment", e.target.value)}
            options={['Efectivo','PayPal','Tarjeta','Yape']}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodForm;