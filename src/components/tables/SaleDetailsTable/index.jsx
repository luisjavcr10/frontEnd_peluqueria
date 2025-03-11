const SaleDailsTable = ({items, total}) => {
    return (
        <table className="w-full text-left ">
            <thead>
              <tr className="border-b">
                <th className="p-2">Tipo</th>
                <th className="p-2">ID</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">P. U.</th>
                <th className="p-2">Cantidad</th>
                <th className="p-2">SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-2 text-center text-gray-500">
                    No hay items agregados.
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{item.type}</td>
                    <td className="p-2">{item.idService}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">S/ {item.unitPrice}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">S/ {item.subtotal}</td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan="6" className="p-2 font-semibold text-left">
                  Total:  S/ {total}
                </td>
              </tr>
            </tfoot>
          </table>
    );
}

export default SaleDailsTable;