/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback } from 'react';
import { Event } from '@prisma/client';

import DynamicTable from '@/ui/tables/dynamic-table';
import ShowButton from '@/ui/buttons/show-button';
import { TableColumns } from '@/types/common';
import { safeParseDateString } from '@/libs/utils/intl';

const columns: TableColumns<Event>[] = [
   { key: 'name', label: 'Nombre' },
   { key: 'date', label: 'Fecha' },
   { key: 'actions', label: 'Acciones' },
];
type Props = {
   data: Event[];
};
export default function EventItemTable({ data }: Props) {
   const renderFunciton = useCallback((row: any, columnKey: any) => {
      const cellValue = row[columnKey];

      switch (columnKey) {
         case 'date':
            return safeParseDateString(cellValue)?.date.format;
         case 'actions':
            return (
               <div>
                  <ShowButton tooltip="Ver evento" href={`/events/${row.id}`} />
               </div>
            );
         default:
            return String(cellValue);
      }
   }, []);
   return <DynamicTable data={data} columns={columns} renderFunction={renderFunciton} />;
}
