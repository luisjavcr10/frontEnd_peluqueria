import H2text from "../../../../components/text/H2text";
import SaleDailsTable from "../../../../components/tables/SaleDetailsTable";

const SaleDetailsSection = ({ items, total }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <H2text message={'Datos de la venta'}/>
      <SaleDailsTable items={items} total={total}/>
    </div>
  );
};

export default SaleDetailsSection;