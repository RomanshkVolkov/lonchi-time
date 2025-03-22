'use client';

import { Card, CardBody, Form, FormProps } from '@heroui/react';

type Props = {
   children: React.ReactNode;
} & Omit<FormProps, 'children'>;
export default function FormWrapper({ children, ...formProps }: Props) {
   return (
      <Card className="p-10">
         <CardBody>
            <Form {...formProps}>{children}</Form>
         </CardBody>
      </Card>
   );
}
