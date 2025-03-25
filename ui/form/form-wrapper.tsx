'use client';

import {
  Card,
  CardBody,
  CardProps,
  Form,
  FormProps,
  HTMLHeroUIProps,
} from '@heroui/react';

type Props = {
  children: React.ReactNode;
  cardProps?: CardProps;
  cardBodyProps?: HTMLHeroUIProps<'div'>;
} & Omit<FormProps, 'children'>;
export default function FormWrapper({
  children,
  cardProps,
  cardBodyProps,
  ...formProps
}: Props) {
  return (
    <Card className="p-10" {...cardProps}>
      <CardBody {...cardBodyProps}>
        <Form {...formProps}>{children}</Form>
      </CardBody>
    </Card>
  );
}
