import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { postSales } from "../../../services/salesServices";

const PayPalButton = ({ orderData }) =>{
    const navigate = useNavigate();

    const totalInUSD = async (totalPEN)=>{
        const response = await fetch('https://v6.exchangerate-api.com/v6/143c509aef0d49cdcc4c39fc/latest/USD', {
            method: "GET"
        });
        const data = await response.json();
        const value = data.conversion_rates.PEN;
        const totalUSD = totalPEN/value;
        return totalUSD;
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
        const total = orderData.saleData.total;
        const totalUSD = ((await totalInUSD(total)).toFixed(2));
        console.log(totalUSD)
        try {
            const dataSale = {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        reference_id: 'PUHF',
                        amount: {
                            currency_code: 'USD',
                            value: totalUSD, 
                        }
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
        await fetch("http://localhost:3000/api/v1/paypal/capture-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderID: data.orderID }),
        });

        await postSaleData();
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