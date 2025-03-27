import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button, ButtonProps, Tooltip } from '@heroui/react';

type Props = {
  tooltip: string;
  href?: string;
  mode?: 'link' | 'button';
  buttonProps?: ButtonProps;
};
export default function DeleteButton({
  tooltip,
  href,
  mode = 'link',
  buttonProps,
}: Props) {
  const isLink = mode === 'link';
  return (
    <Tooltip color="danger" content={tooltip}>
      <Button
        variant="light"
        isIconOnly
        className="cursor-pointer text-lg text-danger active:opacity-50"
        as={isLink ? Link : undefined}
        href={isLink ? href : undefined}
        {...buttonProps}
      >
        <TrashIcon className="w-5" />
      </Button>
    </Tooltip>
  );
}
