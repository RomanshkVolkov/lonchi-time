import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Button, ButtonProps, Tooltip } from '@heroui/react';

export default function EditButton({
  tooltip,
  href,
  buttonProps,
}: {
  tooltip: string;
  href: string;
  buttonProps?: Omit<ButtonProps, 'as' | 'href' | 'children' | 'onPress'>;
}) {
  return (
    <Tooltip content={tooltip}>
      <Button
        variant="light"
        isIconOnly
        className="cursor-pointer text-lg text-default-400 active:opacity-50"
        as={Link}
        href={href}
        {...buttonProps}
      >
        <PencilSquareIcon className="w-5" />
      </Button>
    </Tooltip>
  );
}
