import { OrderAtomTypes } from '@/libs/atoms/order';
import { serializePrice } from '@/libs/serializers/common';
import EditButton from '@/ui/buttons/edit-button';
import DynamicTable from '@/ui/tables/dynamic-table';

type Props = {
   data: OrderAtomTypes[];
};
export default function OrderTable({ data }: Props) {
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
            renderFunction={(row, columnKey) => {
               const cellValue = row[columnKey];

               switch (columnKey) {
                  case 'diner':
                     return row.diner.label;
                  case 'hasCoca':
                     return row.hasCoca ? 'Sí' : 'No';
                  case 'items':
                     return row.items.reduce((acc, item) => {
                        return acc + item.amount;
                     }, 0);
                  case 'subtotal':
                     const amount = row.items.reduce((acc, item) => {
                        return acc + item.amount * item.price.value;
                     }, 0);
                     return serializePrice(amount).formatted;
                  case 'actions':
                     return (
                        <div className="flex justify-center gap-2">
                           <EditButton
                              tooltip="ver detalle"
                              href={`/edit-order/${row.key}`}
                           />
                        </div>
                     );
                  default:
                     return String(cellValue);
               }
            }}
         />
      </div>
   );
}
