'use client';

import Link from 'next/link';
import { useAtom } from 'jotai';
import React, { useCallback } from 'react';
import { Button } from '@heroui/react';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import FormSection from '@/ui/form/form-section';
import OrderTable from '@/ui/events/orders/order-table';
import { orderAtom } from '@/libs/atoms/order';
import ClipboardButton from '@/ui/buttons/clipboard-button';

export default function OrderSection() {
  const [orders] = useAtom(orderAtom);

  const detailsForExportOrders = useCallback(() => {
    const data = orders.reduce(
      (acc, current) => {
        current.items.forEach((item) => {
          acc[item.name] = item.amount + (acc[item.name] ?? 0);
        });
        return acc;
      },
      {} as { [key: string]: number },
    );
    return Object.entries(data)
      .map(([name, amount]) => `${name}: ${amount}`)
      .join('\n');
  }, [orders]);

  return (
    <div className="flex w-full flex-col gap-4">
      <FormSection icon={UserGroupIcon} title="Ordenes del evento">
        Detalles de las ordenes
      </FormSection>
      <div className="flex w-full justify-end gap-4">
        <ClipboardButton
          txt={detailsForExportOrders()}
          buttonProps={{ variant: 'bordered' }}
        />
        <Button as={Link} href="/append-order" variant="ghost" size="md">
          Agregar orden
        </Button>
      </div>
      <OrderTable data={orders} />
    </div>
  );
}
