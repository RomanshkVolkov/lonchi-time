'use client';

import DeleteAction from '@/ui/form/delete-action';
import { deleteEventAction } from '@/libs/actions/events';
import CancelButton from '../form/cancel-button';

export default function DeleteEventForm({
  id,
  name,
}: {
  id: string;
  name?: string;
}) {
  const bindAction = deleteEventAction.bind(null, id);

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex justify-start">
        <p className="text-sm text-gray-500">
          ¿Estás seguro de que quieres eliminar este evento &quot;
          {name || 'Nombre'}&quot; ?
        </p>
      </div>
      <div className="flex flex-row justify-end gap-4">
        <CancelButton href="back()" />
        <DeleteAction deleteAction={bindAction} />
      </div>
    </div>
  );
}
