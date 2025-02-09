import ShowButton from '../../buttons/ShowButton';
import EditButton from '../../buttons/EditButton';
import DeleteButton from '../../buttons/DeleteButton';

const EmployeesTable =  ( {employees, onShow, onEdit, onDelete}) =>{ 
    return (
        <div className='flex justify-center w-full mt-8'>
          <div className='w-4/5 overflow-x-auto'>
            <table className='table-auto w-full '>
              <thead className='bg-gradient-to-r from-zinc-900 to-slate-700'>
                <tr className='text-white text-left'>
                  <th className='px-4 py-2 rounded-s-3xl'>ID</th>
                  <th className='px-4 py-2'>Nombre</th>
                  <th className='px-4 py-2'>Telefono</th>
                  <th className='px-4 py-2'>Email</th>
                  <th className='px-4 py-2'>Rol</th>
                  <th className='px-4 py-2 rounded-e-3xl'>Opciones</th>
                </tr> 
              </thead> 
              <tbody>
                {employees.map((employee, index) => (
                  <tr
                    key={employee.idEmployee}
                    className='border-b-2 border-stone-700'
                  >
                    <td className='px-2 mx-2 text-sm'>{employee.idEmployee}</td>
                    <td className='px-2 mx-2 text-sm'>{employee.name}</td>
                    <td className='px-2 mx-2 text-sm'>{employee.phone}</td>
                    <td className='px-2 mx-2 text-sm'>{employee.user.email}</td>
                    <td className='px-2 mx-2 text-sm'>{employee.user.role.name}</td>
                    <td className='px-2 mx-2'>
                      <div className='flex space-x-2 overflow-x-auto'>
                        <ShowButton
                          entity={employee}
                          onShow={onShow}
                        />
                        <EditButton
                          entity={employee}
                          onEdit={onEdit}
                        />
                        <DeleteButton
                          id={employee.idEmployee}
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

export default EmployeesTable;