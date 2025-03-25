'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { addToast, Button } from '@heroui/react';

type DeleteActionTypes = () => Promise<
  | {
      success?: boolean;
      message: string;
      details: string;
    }
  | undefined
>;
export default function DeleteAction({
  deleteAction,
}: {
  deleteAction: DeleteActionTypes;
}) {
  const { back } = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const state = await deleteAction();
      if (state?.message) {
        addToast({
          title: 'Error',
          description: state.message,
          variant: 'bordered',
          color: 'danger',
        });
      } else if (state?.success) {
        addToast({
          title: 'Eliminado correctamente',
          description: 'El elemento ha sido eliminado exitosamente',
          variant: 'bordered',
          color: 'success',
        });
        back();
      }
    });
  };

  return (
    <form onSubmit={handleDelete}>
      <Button color="danger" type="submit" isLoading={isPending}>
        Eliminar
      </Button>{' '}
    </form>
  );
}
