'use client';

import { useActionState, useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Chip, DatePicker, Input, Textarea } from '@heroui/react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import FormSection from '@/ui/form/form-section';
import FormWrapper from '@/ui/form/form-wrapper';
import FormSubmissionSection from '@/ui/form/form-submission-section';
import OrderSection from '@/ui/events/orders/order-section';
import { orderAtom, OrderAtomTypes } from '@/libs/atoms/order';
import { editEventAction } from '@/libs/actions/events';
import { safeParseDateString } from '@/libs/utils/intl';
import { EventRecordTypes } from '@/types/event';
import { serializeEventRecordOrders } from '@/libs/serializers/event';

type Props = {
  event: EventRecordTypes;
};
export default function EditEventForm({ event }: Props) {
  const [orders, setOrders] = useAtom(orderAtom);
  const bindAction = editEventAction.bind(null, event.id, orders);
  const [state, action, isLoading] = useActionState(bindAction, undefined);

  useEffect(() => {
    setOrders(serializeEventRecordOrders(event.orders));
  }, [event, setOrders]);

  return (
    <FormWrapper action={action} validationBehavior="native">
      <DetailsSection event={event} orders={orders} />
      <FormSubmissionSection isLoading={isLoading} state={state} />
    </FormWrapper>
  );
}

function DetailsSection({
  event,
  orders,
}: {
  event: EventRecordTypes;
  orders: OrderAtomTypes[];
}) {
  const [errors, setErrors] = useState<Record<'cocaPrice', boolean>>({} as any);
  const [cocaPrice, setCocaPrice] = useState<number>(event.cocaPrice);

  const valuePerDiner = useCallback(() => {
    const price = cocaPrice;
    const dinerHasCoke = orders.filter((order) => order.hasCoca).length;
    if (dinerHasCoke === 0) {
      return 0;
    }
    return Math.floor(isNaN(price) ? 0 : price / dinerHasCoke);
  }, [orders, cocaPrice]);
  return (
    <div className="flex w-full flex-col gap-4">
      <FormSection icon={CalendarDaysIcon} title="Información básica">
        Detalles del evento
      </FormSection>
      <div />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          name="name"
          label="Nombre"
          defaultValue={event?.name}
          isRequired
        />
        <DatePicker
          name="date"
          label="Fecha"
          defaultValue={safeParseDateString(event?.date)?.calendarDate}
          isRequired
        />
        <Input
          name="location"
          label="Ubicación"
          defaultValue={event?.location}
        />
      </div>
      <Textarea
        name="description"
        label="Descripción"
        defaultValue={event?.description}
      />
      <div className="flex justify-between">
        <Input
          name="cocaPrice"
          label="Precio de Coca"
          defaultValue={event?.cocaPrice.toString()}
          errorMessage="Invalid field"
          isInvalid={errors?.cocaPrice ?? false}
          onValueChange={(v) => {
            const isInvalid = /\D/.test(v);
            if (!isInvalid) {
              setCocaPrice(+v);
            }
            setErrors({ cocaPrice: isInvalid });
          }}
        />
        <div className="flex h-[56px] flex-col justify-center">
          <Chip size="lg">{`Precio por persona: $${valuePerDiner().toFixed(2)}`}</Chip>
        </div>
      </div>
      <OrderSection />
    </div>
  );
}
