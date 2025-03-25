'use client';
import { useRouter } from 'next/navigation';
import { ButtonHero } from '@/types/common';
import { Button, Link } from '@heroui/react';

type Props = {
  href: string;
} & ButtonHero;
export default function CancelButton({ href, ...props }: Props) {
  const { back } = useRouter();
  const isCancelBack = href === 'back()';
  const options = {
    href: isCancelBack ? undefined : href,
    as: isCancelBack ? undefined : Link,
  };

  return (
    <Button
      as={options.as}
      href={options.href}
      variant="flat"
      color="danger"
      onPress={back}
      {...props}
    >
      Cancelar
    </Button>
  );
}
