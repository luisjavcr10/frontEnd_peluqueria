import { useLocation, useNavigate } from "react-router-dom";
import { IoMdDownload,IoIosHome } from "react-icons/io";
import ConfettiSlow from "../../../components/canvas-confetti/ConfettiSlow";


const DetallePostVenta = () => {
    const location = useLocation();
    const { saleData } = location.state || {};
    const headSale = saleData?.saleData;
    const detailsSale = saleData?.saleDetailsData || [];

    console.log(saleData)

    const navigate = useNavigate();

    if (!saleData) {
        return <div className="p-6 text-center text-gray-600">No hay datos de venta disponibles.</div>;
    }

    return (
        <div className=" bg-gray-50 min-h-scree h-full pt-8">
            <ConfettiSlow/>
            {/* Encabezado */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">Comprobante de Pago</h1>

                <div className="flex flex-col md:flex-row justify-evenly">
                    {/* Datos de generales */}
                    <div className="rounded-xl my-6 bg-white p-6 shadow-md">
                        <h2 className="text-xl text-center font-semibold text-gray-700 mb-4">Datos generales</h2>
                        <p className="my-1"><strong>ID Venta:</strong> {headSale.idSales}</p>
                        <p className="my-1"><strong>Método de Pago:</strong> {headSale.methodPayment}</p>
                        <p className="my-1"><strong>Fecha:</strong> {new Date(saleData.date).toLocaleDateString()}</p>
                    </div>

                    {/* Datos de Cliente */}
                    <div className="rounded-xl my-6 bg-white p-6 shadow-md">
                        <h2 className="text-xl text-center font-semibold text-gray-700 mb-4">Datos de Cliente</h2>
                        <p className="my-1"><strong>Cliente:</strong> {headSale.nameCustomer}</p>
                        <p className="my-1"><strong>Nro Documento:</strong> {headSale.idCustomer}</p>
                        <p className="my-1"><strong>Correo:</strong> {saleData.correo !==''? saleData.correo : 'No especificado'}</p>
                    </div>
                </div>

                {/* Detalles de Productos y Servicios */}
                <div className="mt-4 mb-4 mx-8">
                    <div className="overflow-x-auto">
                        <div className="grid grid-cols-5 gap-2 font-semibold pb-2 text-center text-white">
                            <div className="col-span-2  bg-gradient-to-r from-gray-600 to-neutral-700 p-1 rounded-lg shadow-md">Item</div>
                            <div className="col-span-1  bg-gradient-to-r from-gray-600 to-neutral-700 p-1 rounded-lg shadow-md">Cantidad</div>
                            <div className="col-span-1  bg-gradient-to-r from-gray-600 to-neutral-700 p-1 rounded-lg shadow-md">Precio</div>
                            <div className="col-span-1  bg-gradient-to-r from-gray-600 to-neutral-700 p-1 rounded-lg shadow-md">Subtotal</div>
                        </div>
                        {detailsSale.map((detail, index) => (
                            <div key={index} className="grid grid-cols-5 gap-4 border-b-2 border-gray-600 py-2 text-gray-600">
                                <div className="col-span-2 ml-6">{detail.name}</div>
                                <div className="col-span-1 text-center">{detail.quantity}</div>
                                <div className="col-span-1 text-center">S/. {(detail.unitPrice || 0).toFixed(2)}</div>
                                <div className="col-span-1 text-center">S/. {(detail.subtotal || 0).toFixed(2)}</div>
                            </div>
                        ))}
                        <div className="flex flex-row justify-end gap-2 font-semibold pt-4 pb-2 text-white text-right">
                            <div className="w-fit col-span-2 my-1 bg-gradient-to-r from-gray-700 to-gray-600 py-1 px-4 rounded-lg shadow-md ">IGV: S/. {(headSale.igv || 0).toFixed(2)}</div>
                            <div className="w-fit col-span-2 my-1 bg-gradient-to-r from-lime-900 to-lime-800 py-1 px-4 rounded-lg shadow-md">Total Gravado: S/. {(headSale.totalGravado || 0).toFixed(2)}</div>
                            <div className="w-fit col-span-2 my-1 bg-gradient-to-r from-sky-900 to-sky-800 py-1 px-4 rounded-lg shadow-md">Total: S/. {(headSale.total || 0).toFixed(2)}</div>
                        </div>
                    </div>
                </div>

                {/* Botón de Impresión */}
                <div className="flex flex-row justify-end gap-4 md:mr-8">
                    <button
                        onClick={() => navigate('/ventas')}
                        className="bg-gradient-to-r from-gray-400 to-gray-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-110"
                    >
                        <IoIosHome className="text-lg"/>
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="bg-gradient-to-r from-lime-900 to-lime-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform lg:duration-300 hover:-translate-y-2l hover:scale-110"
                    >
                        <IoMdDownload className="text-lg"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetallePostVenta;