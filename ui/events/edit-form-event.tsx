'use client';

import { useActionState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { DatePicker, Input, Textarea } from '@heroui/react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import FormSection from '@/ui/form/form-section';
import FormWrapper from '@/ui/form/form-wrapper';
import FormSubmissionSection from '@/ui/form/form-submission-section';
import OrderSection from '@/ui/events/orders/order-section';
import { orderAtom } from '@/libs/atoms/order';
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
         <DetailsSection event={event} />
         <FormSubmissionSection isLoading={isLoading} state={state} />
      </FormWrapper>
   );
}

function DetailsSection({ event }: { event: EventRecordTypes }) {
   return (
      <div className="flex w-full flex-col gap-4">
         <FormSection icon={CalendarDaysIcon} title="Información básica">
            Detalles del evento
         </FormSection>
         <div />
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input name="name" label="Nombre" defaultValue={event?.name} isRequired />
            <DatePicker
               name="date"
               label="Fecha"
               defaultValue={safeParseDateString(event?.date)?.calendarDate}
               isRequired
            />
            <Input name="location" label="Ubicación" defaultValue={event?.location} />
         </div>
         <Textarea
            name="description"
            label="Descripción"
            defaultValue={event?.description}
         />
         <OrderSection />
      </div>
   );
}
