'use client';

import { useCallback } from 'react';
import { Event } from '@prisma/client';
import { TableColumns } from '@/types/common';
import { safeParseDateString } from '@/libs/utils/intl';
import DynamicTable from '@/ui/tables/dynamic-table';
import EditButton from '@/ui/buttons/edit-button';

const columns: TableColumns<Omit<Event, 'date'> & { date: string }>[] = [
   { key: 'name', label: 'Nombre' },
   { key: 'date', label: 'Fecha' },
   { key: 'actions', label: 'Acciones' },
];
type Props = {
   data: (Omit<Event, 'date'> & { date: string })[];
};
export default function OrderTable({ data }: Props) {
   const renderFunciton = useCallback(
      (row: Props['data'][0], columnKey: keyof Event & 'actions') => {
         const cellValue = row[columnKey];

         switch (columnKey) {
            case 'date':
               return safeParseDateString(row.date.replace('Z', ''))?.date.format;
            case 'actions':
               return (
                  <div className="flex justify-center">
                     <EditButton tooltip="Editar evento" href={`/events/${row.id}`} />
                  </div>
               );
            default:
               return String(cellValue);
         }
      },
      []
   );
   return <DynamicTable data={data} columns={columns} renderFunction={renderFunciton} />;
}
