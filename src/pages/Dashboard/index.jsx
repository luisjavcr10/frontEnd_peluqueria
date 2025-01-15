/* 
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const Dashboard = () =>{
    return (
        <div className='fixed'>
            <Sidebar />
            <main className='fixed top-0 right-0 lg:right-9 h-screen w-full lg:w-9/12'>
                    <Outlet />
            </main>
        </div>
    );
}

export default Dashboard;*/

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
