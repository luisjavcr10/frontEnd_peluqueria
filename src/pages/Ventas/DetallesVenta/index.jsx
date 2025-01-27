const DetallesVenta = () =>{
    return (
        <div className='flex flex-col lg:flex-col   bg-white w-full h-screen overflow-y-auto'>
            <div>
                <label htmlFor="">Customer</label>
                <input type="text" name="" id="" className="border"/>
            </div>
            <div>
                <label htmlFor="">Description</label>
                <input type="text" name="" id="" className="border"/>
            </div>
            <div className="flex flex-row">
                <button>Add product</button>
                <button>Add service</button>
            </div>
            <table>
                <thead >
                    <tr>
                        <th>Item</th>
                        <th>Tipo</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Shampoo</td>
                        <td>Producto</td>
                        <td>S/. 4</td>
                        <td>2</td>
                        <td>S/. 8</td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
};

export default DetallesVenta;