'use client';

import { OrderAtomTypes } from '@/libs/atoms/order';
import { serializePrice } from '@/libs/serializers/common';
import DeleteButton from '@/ui/buttons/delete-button';
import EditButton from '@/ui/buttons/edit-button';
import DynamicTable from '@/ui/tables/dynamic-table';
import { useCallback } from 'react';
import DetailsOrderToogle from './details-order-toogle';
import DynamicTableCollapse from '@/ui/tables/dynamic-table-collapse';

type Props = {
  data: OrderAtomTypes[];
};
export default function OrderTable({ data }: Props) {
  const renderFunction = useCallback(
    (
      row: OrderAtomTypes,
      columnKey: keyof OrderAtomTypes & 'subtotal' & 'actions',
    ) => {
      const cellValue = row[columnKey];

      switch (columnKey) {
        case 'diner':
          return row.diner.label;
        case 'hasCoca':
          return row.hasCoca ? 'Sí' : 'No';
        case 'items':
          return row.items.reduce((acc, item) => acc + item.amount, 0);
        case 'subtotal':
          const amount = row.items.reduce(
            (acc, item) => acc + item.amount * item.price.value,
            0,
          );
          return serializePrice(amount).formatted;
        case 'actions':
          return (
            <div className="flex justify-center gap-2">
              <EditButton
                tooltip="Ver detalle"
                href={`/edit-order/${row.key}`}
              />
              <DeleteButton
                tooltip="Eliminar orden"
                href={`/delete-order/${row.key}`}
              />
            </div>
          );
        default:
          return String(cellValue);
      }
    },
    [],
  );

  return (
    <div>
      <DynamicTableCollapse
        columns={[
          { key: 'diner', label: 'Nombre' },
          { key: 'hasCoca', label: 'Incluye Coca' },
          { key: 'items', label: 'Cantidad' },
          { key: 'subtotal', label: 'Subtotal' },
          { key: 'actions', label: 'Acciones' },
        ]}
        data={data}
        renderFunction={renderFunction}
      />
    </div>
  );
}
