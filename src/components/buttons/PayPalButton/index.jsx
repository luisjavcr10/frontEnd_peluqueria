import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = () =>{
    const styles = {
        layout: "vertical",
        color: "silver",
        shape: "rect",
        label: "checkout",
        borderRadius: 10,
    }
    return (
        <div className="w-3/4">
            <PayPalButtons
                style={styles}
            />
        </div>
        
    );
}

export default PayPalButton;