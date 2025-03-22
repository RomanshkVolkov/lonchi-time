'use client';

import { ErrorActionTypes } from '@/types/common';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Accordion, AccordionItem } from '@heroui/react';

type Props = {
   state?: ErrorActionTypes;
};
export default function FormErrorsSection({ state }: Props) {
   if (!state) return null;

   return (
      <div className="flex w-full justify-end gap-2">
         <div>
            <Accordion variant="bordered">
               <AccordionItem
                  key={1}
                  aria-label="Error action message"
                  startContent={<ExclamationTriangleIcon className="w-6 text-red-500" />}
                  title={state.message}
                  classNames={{ title: 'text-red-500' }}>
                  <span className="text-sm text-red-500">Detalle: {state.details}</span>
               </AccordionItem>
            </Accordion>
         </div>
      </div>
   );
}
