import React from 'react';

function TableDetailOrder() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub Toal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Coca-Cola</td>
            <td>1</td>
            <td>R$ 2,00</td>
            <td>R$ 2,00</td>
          </tr>
        </tbody>
      </table>
      <div>
        <p>Total: R$ 2,00</p>
      </div>
    </div>
  );
}

export default TableDetailOrder;
