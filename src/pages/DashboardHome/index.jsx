import { useState, useEffect } from 'react';
import { FaChartLine, FaBoxOpen, FaUsers, FaCalendarCheck } from 'react-icons/fa';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { getSales } from '../../services/salesServices';
import { getProducts } from '../../services/productService';
import { getCategories } from '../../services/categoriesService';
import { getServices } from '../../services/servicesService';
import { getCurrentUser } from '../../services/userServices';
import SalesContributionChart from '../../components/charts/SalesContributionChart';

const DashboardHome = () => {

    const [user, setUser] = useState('');

    // Estado para almacenar datos de estadísticas
    const [stats, setStats] = useState({
        ventas: { total: 0, productos: 0, servicios: 0, cantidad: 0 },
        inventario: { productos: 0, categorias: 0, bajoStock: 0 },
        empleados: { total: 0, activos: 0 },
        citas: { hoy: 0, pendientes: 0, completadas: 0 }
    });
    
    // Estado para almacenar actividades recientes
    const [recentActivities, setRecentActivities] = useState([]);
    
    // Estado para almacenar productos más vendidos
    const [topProducts, setTopProducts] = useState([]);
    
    // Estado para controlar carga de datos
    const [loading, setLoading] = useState(true);
    
    // Estado para almacenar datos de ventas para el gráfico
    const [salesData, setSalesData] = useState(null);
    
    // Función para cargar datos del dashboard
    const loadDashboardData = async () => {
        try {
            setLoading(true);
            
            // Obtener datos de ventas
            const salesData = await getSales();
            
            // Guardar datos de ventas para el gráfico
            setSalesData(salesData);
            
            // Obtener datos de productos
            const productsData = await getProducts();
            
            // Obtener datos de categorías
            const categoriesData = await getCategories();
            
            // Calcular productos con bajo stock (menos de 10 unidades)
            const lowStockProducts = productsData.filter(product => product.stock < 10);
            
            // Calcular ventas de productos y servicios
            let productSales = 0;
            let serviceSales = 0;
            
            if (salesData?.sales) {
                salesData.sales.forEach(sale => {
                    if (sale.details && Array.isArray(sale.details)) {
                        sale.details.forEach(detail => {
                            if (detail.type === 'producto') {
                                productSales += (parseFloat(detail.unitPrice) * parseFloat(detail.quantity)) || 0;
                            } else if (detail.type === 'servicio') {
                                serviceSales += (parseFloat(detail.unitPrice) * parseFloat(detail.quantity)) || 0;
                            }
                        });
                            
                    };
                    
                });
            }
            
            // Actualizar estadísticas
            setStats({
                ventas: { 
                    total: salesData?.sales ? salesData.sales.reduce((sum, sale) => sum + parseFloat(sale.total), 0) : 0, 
                    productos: productSales, 
                    servicios: serviceSales, 
                    cantidad: salesData?.sales?.length || 0 
                },
                inventario: { 
                    productos: productsData?.length || 0, 
                    categorias: categoriesData?.length || 0, 
                    bajoStock: lowStockProducts.length 
                },
                empleados: { total: 6, activos: 5 }, // Estos datos podrían venir de una API de empleados
                citas: { hoy: 8, pendientes: 3, completadas: 5 } // Estos datos podrían venir de una API de citas
            });
            
            // Simular actividades recientes
            if (salesData?.sales && salesData.sales.length > 0) {
                const recentSales = salesData.sales.slice(0, 4).map(sale => ({
                    type: 'venta',
                    time: '10 minutos', // Aquí se podría calcular el tiempo real
                    description: `Venta completada - S/. ${sale.total}`,
                    color: 'green'
                }));
                
                setRecentActivities(recentSales);
            }
            
            // Calcular productos más vendidos basado en datos reales de ventas
            if (salesData?.sales && productsData && productsData.length > 0) {
                // Crear un mapa para contar la cantidad de cada producto vendido
                const productSalesCount = {};
                let totalProductsSold = 0;
                
                // Recorrer todas las ventas y contar productos
                salesData.sales.forEach(sale => {
                    if (sale.details && Array.isArray(sale.details)) {
                        sale.details.forEach(detail => {
                            if (detail.type === 'producto') {
                                const productName = detail.idProduct;
                                const quantity = parseInt(detail.quantity) || 0;
                                
                                if (!productSalesCount[productName]) {
                                    productSalesCount[productName] = 0;
                                }
                                
                                productSalesCount[productName] += quantity;
                                totalProductsSold += quantity;
                            }
                        });      
                    };
                });
            
                
                // Convertir el mapa a un array y ordenar por cantidad vendida (de mayor a menor)
                const sortedProducts = Object.entries(productSalesCount)
                    .map(([name, units]) => ({
                        name,
                        units,
                        percentage: totalProductsSold > 0 ? Math.round((units / totalProductsSold) * 100) : 0
                    }))
                    .sort((a, b) => b.units - a.units)
                    .slice(0, 4); // Tomar los 4 productos más vendidos
                console.log(sortedProducts);
                setTopProducts(sortedProducts);
            } else if (productsData && productsData.length > 0) {
                // Si no hay datos de ventas, mostrar productos con stock bajo como alternativa
                const sortedProducts = [...productsData]
                    .sort((a, b) => a.stock - b.stock)
                    .slice(0, 4)
                    .map(product => ({
                        name: product.name,
                        units: product.stock,
                        percentage: Math.min(Math.round((1 - product.stock / 100) * 100), 100) // Invertir la lógica para productos con bajo stock
                    }));
                
                setTopProducts(sortedProducts);
            }
            
        } catch (error) {
            console.error('Error al cargar datos del dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFetchUser = async () => {
        const result = await getCurrentUser();
        console.log(result);
        setUser(result); // Store the user data in the state
    };
    
    // Cargar datos al montar el componente
    useEffect(() => {
        loadDashboardData();
        handleFetchUser();
        
        // Recargar datos cada 5 minutos
        const interval = setInterval(() => {
            loadDashboardData();
        }, 300000); // 5 minutos
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='p-6 bg-white min-h-screen'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-center flex-row items-center gap-2 p-2'>
                    <h1 className='text-2xl font-bold text-gray-800 '>Bienvenido al panel de control  </h1>
                    <strong className='text-2xl font-bold text-stone-600' > {user.name} </strong>
                </div>
                
                
                {/* Tarjetas de estadísticas */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-4'>
                    {/* Tarjeta de Ventas */}
                    <div className='bg-gradient-to-r from-stone-400 to-stone-500 rounded-xl shadow-lg shadow-stone-500 p-6 text-white'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-lg font-semibold'>Ventas del Día</h2>
                            <RiMoneyDollarCircleFill className='text-3xl opacity-80' />
                        </div>
                        <p className='text-3xl font-bold mt-2'>S/. {stats.ventas.total}</p>
                        <div className='mt-4 text-blue-100'>
                            <p className='text-sm'>Productos: S/. {stats.ventas.productos}</p>
                            <p className='text-sm'>Servicios: S/. {stats.ventas.servicios}</p>
                        </div>
                    </div>

                    {/* Tarjeta de Inventario */}
                    <div className='bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl shadow-lg shadow-gray-600 p-6 text-white'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-lg font-semibold'>Inventario</h2>
                            <FaBoxOpen className='text-3xl opacity-80' />
                        </div>
                        <p className='text-3xl font-bold mt-2'>{stats.inventario.productos} productos</p>
                        <div className='mt-4 text-green-100'>
                            <p className='text-sm'>{stats.inventario.categorias} categorías</p>
                            <p className='text-sm'>{stats.inventario.bajoStock} productos con bajo stock</p>
                        </div>
                    </div>

                    {/* Tarjeta de Empleados */}
                    <div className='bg-gradient-to-r from-neutral-500 to-neutral-600 rounded-xl shadow-lg shadow-neutral-600 p-6 text-white'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-lg font-semibold'>Empleados</h2>
                            <FaUsers className='text-3xl opacity-80' />
                        </div>
                        <p className='text-3xl font-bold mt-2'>{stats.empleados.total} empleados</p>
                        <div className='mt-4 text-purple-100'>
                            <p className='text-sm'>{stats.empleados.activos} activos hoy</p>
                        </div>
                    </div>

                    {/* Tarjeta de Citas */}
                    <div className='bg-gradient-to-r from-slate-500 to-slate-600 rounded-xl shadow-lg shadow-slate-600 p-6 text-white'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-lg font-semibold'>Citas del Día</h2>
                            <FaCalendarCheck className='text-3xl opacity-80' />
                        </div>
                        <p className='text-3xl font-bold mt-2'>{stats.citas.hoy} citas</p>
                        <div className='mt-4 text-amber-100'>
                            <p className='text-sm'>{stats.citas.pendientes} pendientes</p>
                            <p className='text-sm'>{stats.citas.completadas} completadas</p>
                        </div>
                    </div>
                </div>

                {/* Gráfico de contribución de ventas */}
                {salesData && <SalesContributionChart salesData={salesData} />}

                {/* Sección de actividad reciente y gráficos */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {/* Actividad reciente */}
                    <div className='bg-gradient-to-r from-stone-400 to-stone-500 rounded-xl shadow-lg shadow-stone-500 p-6'>
                        <h2 className='text-xl font-semibold text-white mb-4'>Actividad Reciente</h2>
                        <div className='space-y-4'>
                            {loading ? (
                                <p className='text-gray-200'>Cargando actividades recientes...</p>
                            ) : recentActivities.length > 0 ? (
                                recentActivities.map((activity, index) => (
                                    <div key={index} className={`border-l-4 border-${activity.color}-500 pl-4 py-2`}>
                                        <p className='text-sm text-gray-300'>Hace {activity.time}</p>
                                        <p className='font-medium text-white'>{activity.description}</p>
                                    </div>
                                ))
                            ) : (
                               <p> No hay actividad reciente</p>
                            )}
                        </div>
                    </div>

                    {/* Productos más vendidos */}
                    <div className='bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl shadow-lg shadow-gray-600 p-6'>
                        <h2 className='text-xl font-semibold text-white mb-4'>Productos Más Vendidos</h2>
                        <div className='space-y-4'>
                            {loading ? (
                                <p className='text-gray-200'>Cargando productos más vendidos...</p>
                            ) : topProducts.length > 0 ? (
                                topProducts.map((product, index) => (
                                    <div key={index}>
                                        <div className='flex justify-between mb-1 text-gray-100'>
                                            <span className='font-medium'>{product.name}</span>
                                            <span>{product.units} unidades</span>
                                        </div>
                                        <div className='w-full bg-gray-200 rounded-full h-2.5'>
                                            <div className='bg-green-600 h-2.5 rounded-full' style={{ width: `${product.percentage}%` }}></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <p>
                                        No hay datos disponibles
                                    </p>
                                    
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;