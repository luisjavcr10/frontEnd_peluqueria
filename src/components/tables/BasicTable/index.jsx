import ShowButton from '../../buttons/ShowButton';
import EditButton from '../../buttons/EditButton';
import DeleteButton from '../../buttons/DeleteButton';

const BasicTable = ({ entities, mode, onShow, onEdit, onDelete }) => {
  return (
    <div className='flex justify-center w-full mt-8'>
      <div className='w-4/5 overflow-x-auto'>
        <table className='table-auto w-full'>
          <thead className='bg-gradient-to-r from-zinc-900 to-slate-700'>
            <tr className='text-white text-left'>
              <th className='px-4 py-2 rounded-s-3xl'>ID</th>
              <th className='px-4 py-2'>Nombre</th>
              <th className='px-4 py-2'>Descripción</th>
              <th className='px-4 py-2 rounded-e-3xl'>Opciones</th>
            </tr> 
          </thead> 
          <tbody >
            {entities.map((entity, index) => (
              <tr
                key={mode==='Categoria'? entity.idCategory : entity.idRole}
                className='border-b-2 border-stone-700'
              >
                <td className='px-2 m-4 text-sm font-bold'>{mode==='Categoria'? entity.idCategory : entity.idRole}</td>
                <td className='px-2 m-4 text-sm'>{entity.name}</td>
                <td className='px-2 m-4 text-sm'>{entity.description}</td>
                <td className='px-2 mx-2'>
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
