'use client';

import { useSearchParams } from 'next/navigation';
import { OrderAtomTypes } from '@/libs/atoms/order';
import { serializePrice } from '@/libs/serializers/common';
import DeleteButton from '@/ui/buttons/delete-button';
import EditButton from '@/ui/buttons/edit-button';
import DynamicTable from '@/ui/tables/dynamic-table';
import { useCallback } from 'react';

type Props = {
  data: OrderAtomTypes[];
};
export default function OrderTable({ data }: Props) {
  const searchParams = useSearchParams();
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
          const isDisabled = searchParams.get('diner') !== row.diner.key;
          return (
            <div className="flex justify-center gap-2">
              <EditButton
                tooltip="Ver detalle"
                href={`/edit-order/${row.key}`}
                buttonProps={{
                  isDisabled,
                }}
              />
              <DeleteButton
                tooltip="Eliminar orden"
                href={`/delete-order/${row.key}`}
                buttonProps={{
                  isDisabled,
                }}
              />
            </div>
          );
        default:
          return String(cellValue);
      }
    },
    [searchParams],
  );
  return (
    <div>
      <DynamicTable
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
