'use client';

import { useActionState } from 'react';
import { useAtom } from 'jotai';
import { DatePicker, Input, Textarea } from '@heroui/react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import FormSection from '@/ui/form/form-section';
import FormWrapper from '@/ui/form/form-wrapper';
import FormSubmissionSection from '@/ui/form/form-submission-section';
import OrderSection from '@/ui/events/orders/order-section';
import { orderAtom } from '@/libs/atoms/order';
import { createEventAction } from '@/libs/actions/events';
import { stringToCalendarDate } from '@/libs/utils/intl';

export default function CreateEventForm() {
   const [orders] = useAtom(orderAtom);
   const bindAction = createEventAction.bind(null, orders);
   const [state, action, isLoading] = useActionState(bindAction, undefined);
   return (
      <FormWrapper action={action} validationBehavior="native">
         <DetailsSection fields={state?.fields} />
         <FormSubmissionSection isLoading={isLoading} state={state} />
      </FormWrapper>
   );
}

function DetailsSection({ fields }: { fields?: Record<string, string> }) {
   return (
      <div className="flex w-full flex-col gap-4">
         <FormSection icon={CalendarDaysIcon} title="Información básica">
            Detalles del evento
         </FormSection>
         <div />
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input name="name" label="Nombre" defaultValue={fields?.name} isRequired />
            <DatePicker
               name="date"
               label="Fecha"
               defaultValue={stringToCalendarDate(fields?.date)}
               isRequired
            />
            <Input name="location" label="Ubicación" defaultValue={fields?.location} />
         </div>
         <Textarea
            name="description"
            label="Descripción"
            defaultValue={fields?.description}
         />
         <OrderSection />
      </div>
   );
}
