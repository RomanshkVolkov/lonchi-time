'use client';

import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { Button } from '@heroui/react';
import { orderAtom } from '@/libs/atoms/order';
import { deleteOrderAction } from '@/libs/actions/orders';

type Props = {
  id: string;
};

export default function FormDeleteOrder({ id }: Props) {
  const { back } = useRouter();
  const [_, setAtom] = useAtom(orderAtom);

  const handleDelete = async () => {
    setAtom((prev) => prev.filter((order) => order.id !== id));
    await deleteOrderAction(id);

    back();
  };

  const footer = (
    <div className="flex w-full justify-end py-2">
      <div className="flex justify-between">
        <Button onPress={back} variant="light" color="danger">
          Cerrar
        </Button>
        <Button onPress={handleDelete} variant="flat" color="primary">
          Confirmar
        </Button>
      </div>
    </div>
  );

  const body = (
    <div className="flex flex-col gap-4">
      <p>¿Está seguro de que desea eliminar esta orden?</p>
      {footer}
    </div>
  );

  return body;
}
