import ShowButton from '../../buttons/ShowButton';
import EditButton from '../../buttons/EditButton';
import DeleteButton from '../../buttons/DeleteButton';


const ServicesTable = ({services, onShow, onEdit, onDelete}) =>{
    return (
        <div className='flex justify-center w-full mt-8'>
            <div className='w-4/5 overflow-x-auto'>
                <table className='table-auto w-full'>
                <thead className='bg-gradient-to-r from-zinc-900 to-slate-700'>
                    <tr className='text-left text-white'>
                    <th className='px-4 py-2 rounded-s-3xl'>ID</th>
                    <th className='px-4 py-2'>Nombre</th>
                    <th className='px-4 py-2'>Descripción</th>
                    <th className='px-4 py-2'>Precio</th>
                    <th className='px-4 py-2 rounded-e-3xl'>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => (
                    <tr
                        key={service.idService}
                        className='border-b-2 border-stone-700'
                    >
                        <td className='px-2 mx-2 text-sm'>{service.idService}</td>
                        <td className='px-2 mx-2 text-sm'>{service.name}</td>
                        <td className='px-2 mx-2 text-sm'>{service.description}</td>
                        <td className='px-2 mx-2 text-sm'>{service.price}</td>
                        
                        <td className='px-2 mx-2'>
                        <div className='flex space-x-2 overflow-x-auto'>
                            <ShowButton
                                entity={service}
                                onShow={onShow}
                            />
                            <EditButton
                                entity={service}
                                onEdit={onEdit}
                            />
                            <DeleteButton
                                id={service.idService}
                                onDelete={onDelete}
                            />
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServicesTable;