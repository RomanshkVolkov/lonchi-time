'use client';

import { useCallback } from 'react';
import { Event } from '@prisma/client';
import { SelectOption, TableColumns } from '@/types/common';
import { safeParseDateString } from '@/libs/utils/intl';
import DynamicTable from '@/ui/tables/dynamic-table';
import DeleteButton from '../buttons/delete-button';
import PopoverButtonLinks from '../buttons/popover-button-links';
import { Button } from '@heroui/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const columns: TableColumns<Omit<Event, 'date'> & { date: string }>[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'date', label: 'Fecha' },
  { key: 'actions', label: 'Acciones' },
];
type Props = {
  data: (Omit<Event, 'date'> & { date: string })[];
  diners: SelectOption[];
};
export default function EventsTable({ data, diners }: Props) {
  const renderFunciton = useCallback(
    (row: Props['data'][0], columnKey: keyof Event & 'actions') => {
      const cellValue = row[columnKey];

      switch (columnKey) {
        case 'date':
          return safeParseDateString(row.date.replace('Z', ''))?.date.format;
        case 'actions':
          return (
            <div className="flex justify-center">
              <PopoverButtonLinks
                links={diners.map((diner) => ({
                  label: diner.label,
                  href: `/events/${row.id}?diner=${diner.key}`,
                }))}
                button={
                  <Button variant="light" isIconOnly>
                    <PencilSquareIcon className="w-5" />
                  </Button>
                }
              />
              <DeleteButton
                tooltip="Eliminar evento"
                href={`/delete-event/${row.id}?name=${encodeURIComponent(row.name)}`}
              />
            </div>
          );
        default:
          return String(cellValue);
      }
    },
    [diners],
  );
  return (
    <DynamicTable
      data={data}
      columns={columns}
      renderFunction={renderFunciton}
    />
  );
}
