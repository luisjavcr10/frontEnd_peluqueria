import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { postSales } from "../../../services/salesServices";

const PayPalButton = ({ orderData }) =>{
    const navigate = useNavigate();
    const saleData = orderData.saleData;
    const itemsSaleData = orderData.saleDetailsData;

    const getConversionValue = async () =>{
        const response = await fetch('https://v6.exchangerate-api.com/v6/143c509aef0d49cdcc4c39fc/latest/USD', {
            method: "GET"
        });
        const data = await response.json();
        const value = data.conversion_rates.PEN;
        return value;
    }

    const totalInUSD = async ()=>{
        const value = await getConversionValue();
        let totalUSD = 0;
        const itemsSaleDataUSD = itemsSaleData.map((item) =>{
            const unitPriceUSD = (item.unitPrice / value).toFixed(2);
            totalUSD += parseFloat(unitPriceUSD);
            return{
                ...item,
                unitPrice: unitPriceUSD,
            }
        });
        const saleDataUSD = {
            ...saleData,
            total: totalUSD.toFixed(2),
        };
        return({saleDataUSD, itemsSaleDataUSD});
    };

    const postSaleData = async () => {
        try {
            const dataSale = orderData.saleData;
            const saleDetails = orderData.saleDetailsData.map(({ name, ...rest }) => ({ ...rest }));
            const bodyFinal ={
              saleData:dataSale,
              saleDetailsData:saleDetails,
            }
            await postSales(bodyFinal);
            navigate(`/ventas/detalles-venta/${dataSale.idSales}`, { state: { saleData: orderData } });
        } catch (error) {
            console.error(error);
        }
    };

    const createOrder = async () => {
        const saleTotalDataUSD = await totalInUSD();
        console.log(saleTotalDataUSD)
        try {
            const dataSale = {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        reference_id: 'PUHF',
                        amount: {
                            currency_code: 'USD',
                            value: saleTotalDataUSD.saleDataUSD.total, 
                            breakdown: {
                                item_total: { currency_code: 'USD', value: saleTotalDataUSD.saleDataUSD.total }
                            }
                        },
                        items: saleTotalDataUSD.itemsSaleDataUSD.map(item => ({
                            name: item.name,
                            description: item.description || "",
                            quantity: item.quantity.toString(),
                            unit_amount: {
                                currency_code: 'USD',
                                value: item.unitPrice
                            }
                        }))
                    }
                    
                ]
            };
            console.log(dataSale);
            const response = await fetch("http://localhost:3000/api/v1/paypal/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataSale),
            });

            if (!response.ok) {
                throw new Error(`Error creating order: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            return data.id;
        } catch (error) {
            console.error("Error in createOrder:", error);
            alert("There was an error creating the order. Please try again.");
        }
    };

    const onApprove = async (data) => {
        try {
            const captureResponse = await fetch("http://localhost:3000/api/v1/paypal/capture-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderID: data.orderID }),
            });

            if (!captureResponse.ok) {
                throw new Error(`Error capturing order: ${captureResponse.statusText}`);
            }

            const captureData = await captureResponse.json();

            await postSaleData(); 
        } catch (error) {
            console.error("Error in onApprove transaction:", error);
            alert("There was an error completing the transaction. Please try again.");
        }
    };

    const styles = {
        layout: "vertical",
        color: "silver",
        shape: "rect",
        label: "checkout",
        borderRadius: 10,
    };

    return (
        <div className="w-3/4">
            <PayPalButtons
                style={styles}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </div>
    );
}

export default PayPalButton;