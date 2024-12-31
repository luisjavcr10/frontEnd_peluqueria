import ShowButton from '../../buttons/ShowButton';
import EditButton from '../../buttons/EditButton';
import DeleteButton from '../../buttons/DeleteButton';

const EmployeesTable =  ( {employees, onShow, onEdit, onDelete}) =>{ 
    return (
        <div className='flex justify-center w-full mt-8'>
          <div className='w-4/5 overflow-x-auto'>
            <table className='table-auto w-full border-collapse border border-black'>
              <thead className='bg-black'>
                <tr>
                  <th className='border border-gray-300 px-4 py-2 text-left text-white'>ID</th>
                  <th className='border border-gray-300 px-4 py-2 text-left text-white'>Nombre</th>
                  <th className='border border-gray-300 px-4 py-2 text-left text-white'>Telefono</th>
                  <th className='border border-gray-300 px-4 py-2 text-left text-white'>Email</th>
                  <th className='border border-gray-300 px-4 py-2 text-left text-white'>Rol</th>
                  <th className='border border-gray-300 px-4 py-2 text-left text-white'>Opciones</th>
                </tr> 
              </thead> 
              <tbody>
                {employees.map((employee, index) => (
                  <tr
                    key={employee.idEmployee}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className='border border-gray-300 px-2 mx-2 text-sm'>{employee.idEmployee}</td>
                    <td className='border border-gray-300 px-2 mx-2 text-sm'>{employee.name}</td>
                    <td className='border border-gray-300 px-2 mx-2 text-sm'>{employee.phone}</td>
                    <td className='border border-gray-300 px-2 mx-2 text-sm'>{employee.user.email}</td>
                    <td className='border border-gray-300 px-2 mx-2 text-sm'>{employee.user.role.name}</td>
                    <td className='border border-gray-300 px-2 mx-2'>
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