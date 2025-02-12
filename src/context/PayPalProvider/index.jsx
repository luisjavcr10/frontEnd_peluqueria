import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalProvider = ({children}) =>{
    const initialOptions = {
        clientId : 'AexmaSXS_dshFXQdh4IhWeKVKR5TjMHVwGDykkeTIMENHczy1Do9TdLQqjGMPBpd43T_FeJDpE9YUogN'
    }

    return <PayPalScriptProvider options={initialOptions}>{children}</PayPalScriptProvider>
};

export default PayPalProvider;