import AddItemInSale from "../../../../components/buttons/AddItemInSale";

const ItemsButtons = ({ onShowProductModal, onShowServiceModal }) => {
  return (
    <div className="flex justify-evenly gap-4 mb-6">
      <AddItemInSale onClick={onShowProductModal} message={'Agregar Productos'}/>
      <AddItemInSale onClick={onShowServiceModal} message={'Agregar Servicios'}/>
    </div>
  );
};

export default ItemsButtons;