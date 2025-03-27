'use client';

import Link from 'next/link';
import { useAtom } from 'jotai';
import { Button } from '@heroui/react';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import FormSection from '@/ui/form/form-section';
import OrderTable from '@/ui/events/orders/order-table';
import { orderAtom } from '@/libs/atoms/order';

export default function OrderSection() {
  const [orders] = useAtom(orderAtom);

  return (
    <div className="flex w-full flex-col gap-4">
      <FormSection icon={UserGroupIcon} title="Ordenes del evento">
        Detalles de las ordenes
      </FormSection>
      <div className="flex w-full justify-end">
        <Button as={Link} href="/append-order" variant="ghost" size="md">
          Agregar orden
        </Button>
      </div>
      <OrderTable data={orders} />
    </div>
  );
}
