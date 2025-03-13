import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
    return (
        <div className='h-screen grid lg:grid-cols-[auto_1fr]'>
            {/* Sidebar */}
            <Sidebar />

            {/* Contenido principal */}
            <main className='h-screen overflow-y-auto'>
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
