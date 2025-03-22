import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Button, Link, Tooltip } from '@heroui/react';

export default function EditButton({
  tooltip,
  href,
}: {
  tooltip: string;
  href: string;
}) {
  return (
    <Tooltip content={tooltip}>
      <Button
        variant="light"
        isIconOnly
        className="cursor-pointer text-lg text-default-400 active:opacity-50"
        as={Link}
        href={href}
      >
        <PencilSquareIcon className="w-5" />
      </Button>
    </Tooltip>
  );
}
