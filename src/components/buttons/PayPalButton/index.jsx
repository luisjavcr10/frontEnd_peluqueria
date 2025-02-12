import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ orderData }) =>{
    const createOrder = async () => {
        try {
            console.log(orderData);
            const dataSale = {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        reference_id: 'PUHF',
                        amount: {
                            currency_code: 'USD',
                            value: orderData.saleData.total, // Ensure it's a string
                            breakdown: {
                                item_total: { currency_code: 'USD', value: orderData.saleData.total } // Ensure it's a string
                            }
                        },
                        items: orderData.saleDetailsData.map(item => ({
                            name: item.name, // Optional
                            quantity: item.quantity.toString(), // PayPal requires string
                            unit_amount: {
                                currency_code: 'USD',
                                value: item.unitPrice// Ensure it's a string
                            }
                        }))
                    }
                ],
                application_context: { 
                    return_url: '', 
                    cancel_url: '' 
                }
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
        const response = await fetch("http://localhost:3000/api/v1/paypal/capture-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderID: data.orderID }),
        });

        const orderData = await response.json();
        console.log("Pago aprobado:", orderData);
        alert("Pago completado con éxito");
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