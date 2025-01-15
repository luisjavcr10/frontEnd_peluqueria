import { NavLink } from 'react-router-dom';

const SidebarElement = ({children, name, path}) =>{
    return(
        <div className='bg-gradient-to-r from-zinc-900 to-slate-700 rounded-xl'>
            <NavLink
                to={path}
                className={({ isActive }) =>
                `flex flex-col lg:flex-row p-2 items-center rounded-xl font-sans font-semibold m-2 ${
                    isActive
                        ? 'bg-gradient-to-r from-zinc-300 to-slate-400 text-black'
                        : 'hover:bg-gradient-to-r from-zinc-300 to-slate-400 text-white hover:text-black'
                    }`
                }
            >
                {children}
                {name}
            </NavLink>
        </div>
    );
} 

export default SidebarElement;