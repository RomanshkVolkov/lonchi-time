import { ButtonHero } from '@/types/common';
import { Button, Link } from '@heroui/react';

type Props = {
  href: string;
} & ButtonHero;
export default function CancelButton({ href, ...props }: Props) {
  return (
    <Button as={Link} href={href} variant="flat" color="danger" {...props}>
      Cancelar
    </Button>
  );
}
