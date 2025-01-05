import ShowButton from '../../buttons/ShowButton';
import EditButton from '../../buttons/EditButton';
import DeleteButton from '../../buttons/DeleteButton';

const BasicTable = ({ entities, mode, onShow, onEdit, onDelete }) => {
  return (
    <div className='flex justify-center w-full mt-8'>
      <div className='w-4/5 overflow-x-auto'>
        <table className='table-auto w-full border-collapse border border-black'>
          <thead className='bg-black'>
            <tr>
              <th className='border border-gray-300 px-4 py-2 text-left text-white'>ID</th>
              <th className='border border-gray-300 px-4 py-2 text-left text-white'>Nombre</th>
              <th className='border border-gray-300 px-4 py-2 text-left text-white'>Descripción</th>
              <th className='border border-gray-300 px-4 py-2 text-left text-white'>Opciones</th>
            </tr> 
          </thead> 
          <tbody>
            {entities.map((entity, index) => (
              <tr
                key={mode==='Categoria'? entity.idCategory : entity.idRole}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className='border border-gray-300 px-2 mx-2 text-sm'>{mode==='Categoria'? entity.idCategory : entity.idRole}</td>
                <td className='border border-gray-300 px-2 mx-2 text-sm'>{entity.name}</td>
                <td className='border border-gray-300 px-2 mx-2 text-sm'>{entity.description}</td>
                <td className='border border-gray-300 px-2 mx-2'>
                  <div className='flex space-x-2 overflow-x-auto'>
                    <ShowButton
                      entity={entity}
                      onShow={onShow}
                    />
                    <EditButton
                      entity={entity}
                      onEdit={onEdit}
                    />
                    <DeleteButton
                      id={mode==='Categoria'? entity.idCategory : entity.idRole}
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

export default BasicTable;
