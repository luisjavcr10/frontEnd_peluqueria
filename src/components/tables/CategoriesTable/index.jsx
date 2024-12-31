import ShowButton from '../../buttons/ShowButton';
import EditButton from '../../buttons/EditButton';
import DeleteButton from '../../buttons/DeleteButton';

const CategoriesTable = ({ categories, onShow, onEdit, onDelete }) => {
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
            {categories.map((category, index) => (
              <tr
                key={category.idCategory}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className='border border-gray-300 px-2 mx-2 text-sm'>{category.idCategory}</td>
                <td className='border border-gray-300 px-2 mx-2 text-sm'>{category.name}</td>
                <td className='border border-gray-300 px-2 mx-2 text-sm'>{category.description}</td>
                <td className='border border-gray-300 px-2 mx-2'>
                  <div className='flex space-x-2 overflow-x-auto'>
                    <ShowButton
                      entity={category}
                      onShow={onShow}
                    />
                    <EditButton
                      entity={category}
                      onEdit={onEdit}
                    />
                    <DeleteButton
                      id={category.idCategory}
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

export default CategoriesTable;
