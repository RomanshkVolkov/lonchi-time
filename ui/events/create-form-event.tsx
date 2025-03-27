'use client';

import { useActionState, useCallback, useState } from 'react';
import { useAtom } from 'jotai';
import { Chip, DatePicker, Input, Textarea } from '@heroui/react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import FormSection from '@/ui/form/form-section';
import FormWrapper from '@/ui/form/form-wrapper';
import FormSubmissionSection from '@/ui/form/form-submission-section';
import OrderSection from '@/ui/events/orders/order-section';
import { orderAtom, OrderAtomTypes } from '@/libs/atoms/order';
import { createEventAction } from '@/libs/actions/events';
import { stringToCalendarDate } from '@/libs/utils/intl';

export default function CreateEventForm() {
  const [orders] = useAtom(orderAtom);
  const bindAction = createEventAction.bind(null, orders);
  const [state, action, isLoading] = useActionState(bindAction, undefined);
  return (
    <FormWrapper action={action} validationBehavior="native">
      <DetailsSection fields={state?.fields} orders={orders} />
      <FormSubmissionSection isLoading={isLoading} state={state} />
    </FormWrapper>
  );
}

function DetailsSection({
  fields,
  orders,
}: {
  fields?: Record<string, string>;
  orders: OrderAtomTypes[];
}) {
  const [errors, setErrors] = useState<Record<'cocaPrice', boolean>>({} as any);
  const [cocaPrice, setCocaPrice] = useState<number>(0);

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
          defaultValue={fields?.name}
          isRequired
        />
        <DatePicker
          name="date"
          label="Fecha"
          defaultValue={stringToCalendarDate(fields?.date)}
          isRequired
        />
        <Input
          name="location"
          label="Ubicación"
          defaultValue={fields?.location}
        />
      </div>
      <Textarea
        name="description"
        label="Descripción"
        defaultValue={fields?.description}
      />
      <div className="flex justify-between">
        <Input
          id="cocaPrice"
          name="cocaPrice"
          label="Precio de Coca"
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
