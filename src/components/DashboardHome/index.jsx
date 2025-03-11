import { useState, useEffect } from 'react';
import { getSales } from '../../services/salesServices';
import { getProducts } from '../../services/productService';
import { getCategories } from '../../services/categoriesService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaChartBar, FaBoxOpen, FaUsers, FaMoneyBillWave } from 'react-icons/fa';

const DashboardHome = () => {
    const [salesData, setSalesData] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Datos de ejemplo para los gráficos mientras se cargan los datos reales
    const sampleSalesData = [
        { name: 'Lun', ventas: 4000 },
        { name: 'Mar', ventas: 3000 },
        { name: 'Mie', ventas: 2000 },
        { name: 'Jue', ventas: 2780 },
        { name: 'Vie', ventas: 1890 },
        { name: 'Sab', ventas: 2390 },
        { name: 'Dom', ventas: 3490 },
    ];

    const samplePieData = [
        { name: 'Productos', value: 60 },
        { name: 'Servicios', value: 40 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Obtener datos de ventas, productos y categorías
                const salesResponse = await getSales(0, 10);
                const productsResponse = await getProducts(0, 0);
                const categoriesResponse = await getCategories();
                
                setSalesData(salesResponse.sales || []);
                setProductsData(productsResponse || []);
                setCategoriesData(categoriesResponse || []);
            } catch (error) {
                console.error('Error al cargar datos del dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calcular estadísticas
    const totalVentas = salesData.length;
    const totalProductos = productsData.length;
    const totalCategorias = categoriesData.length;
    const totalIngresos = salesData.reduce((sum, sale) => sum + (parseFloat(sale.total) || 0), 0);

    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
            
            {/* Tarjetas de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Tarjeta de Ventas */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium opacity-80">Total Ventas</p>
                            <p className="text-3xl font-bold">{totalVentas}</p>
                        </div>
                        <div className="bg-blue-400 bg-opacity-30 p-3 rounded-full">
                            <FaChartBar className="text-2xl" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm font-medium">Último mes</p>
                    </div>
                </div>

                {/* Tarjeta de Productos */}
                <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium opacity-80">Total Productos</p>
                            <p className="text-3xl font-bold">{totalProductos}</p>
                        </div>
                        <div className="bg-green-400 bg-opacity-30 p-3 rounded-full">
                            <FaBoxOpen className="text-2xl" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm font-medium">{totalCategorias} categorías</p>
                    </div>
                </div>

                {/* Tarjeta de Clientes */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium opacity-80">Clientes Atendidos</p>
                            <p className="text-3xl font-bold">{totalVentas}</p>
                        </div>
                        <div className="bg-purple-400 bg-opacity-30 p-3 rounded-full">
                            <FaUsers className="text-2xl" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm font-medium">Último mes</p>
                    </div>
                </div>

                {/* Tarjeta de Ingresos */}
                <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium opacity-80">Total Ingresos</p>
                            <p className="text-3xl font-bold">S/. {totalIngresos.toFixed(2)}</p>
                        </div>
                        <div className="bg-red-400 bg-opacity-30 p-3 rounded-full">
                            <FaMoneyBillWave className="text-2xl" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm font-medium">Último mes</p>
                    </div>
                </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Gráfico de Ventas por Día */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Ventas por Día</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={sampleSalesData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="ventas" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Gráfico de Distribución de Ventas */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Distribución de Ventas</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={samplePieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {samplePieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Últimas Ventas */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Últimas Ventas</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">ID</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Cliente</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Empleado</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {salesData.slice(0, 5).map((sale) => (
                                <tr key={sale.idSales} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm text-gray-800">{sale.idSales}</td>
                                    <td className="py-3 px-4 text-sm text-gray-800">{sale.nameCustomer}</td>
                                    <td className="py-3 px-4 text-sm text-gray-800">{sale.user?.name || 'N/A'}</td>
                                    <td className="py-3 px-4 text-sm font-medium text-gray-800">S/. {parseFloat(sale.total).toFixed(2)}</td>
                                </tr>
                            ))}
                            {salesData.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-4 px-4 text-sm text-center text-gray-500">No hay ventas registradas</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;