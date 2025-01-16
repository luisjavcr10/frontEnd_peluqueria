import ShowButton from '../../buttons/ShowButton';
import EditButton from '../../buttons/EditButton';
import DeleteButton from '../../buttons/DeleteButton';

const ProductsTable = ({products, onShow, onEdit, onDelete}) => {
    return(
        <div className='flex justify-center w-full mt-8'>
          <div className='w-4/5 overflow-x-auto'>
            <table className='table-auto w-full '>
              <thead className='bg-gradient-to-r from-zinc-900 to-slate-700'>
                <tr className='text-white text-left'>
                  <th className='px-4 py-2 rounded-s-3xl'>ID</th>
                  <th className='px-4 py-2'>Nombre</th>
                  <th className='px-4 py-2'>Categoria</th>
                  <th className='px-4 py-2'>Precio</th>
                  <th className='px-4 py-2'>Stock</th>
                  <th className='px-4 py-2'>FL</th>
                  <th className='px-4 py-2'>FV</th>
                  <th className='px-4 py-2 rounded-e-3xl'>Opciones</th>
                </tr> 
              </thead> 
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.idProduct}
                    className='border-b-2 border-stone-700'
                  >
                    <td className='px-2 mx-2 text-sm text-gray-600 font-semibold'>{product.idProduct}</td>
                    <td className='px-2 mx-2 text-sm font-bold'>{product.name}</td>
                    <td className='px-2 mx-2 text-sm'>{product.category.name}</td>
                    <td className='px-2 mx-2 text-sm text-center'>S/. {product.price}</td>
                    <td className='px-2 mx-2 text-sm text-center'>{product.stock}</td>
                    <td className='px-2 mx-2 text-sm'>{product.arrivalDate}</td>
                    <td className='px-2 mx-2 text-sm'>{product.expirationDate}</td>
                    <td className='px-2 mx-2'>
                      <div className='flex space-x-2 overflow-x-auto'>
                        <ShowButton
                          entity={product}
                          onShow={onShow}
                        />
                        <EditButton
                          entity={product}
                          onEdit={onEdit}
                        />
                        <DeleteButton
                          id={product.idProduct}
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

export default ProductsTable;