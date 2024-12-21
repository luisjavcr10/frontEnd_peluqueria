import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Sidebar from '../../components/Sidebar';

const Dashboard = () =>{
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <NavBar />
                <main className="p-4">
                    <Outlet />
                    <h1>Dashboard here</h1>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;