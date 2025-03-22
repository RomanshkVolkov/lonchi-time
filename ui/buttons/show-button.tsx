import { EyeIcon } from '@heroicons/react/24/outline';
import { Button, Link, Tooltip } from '@heroui/react';

export default function ShowButton({ tooltip, href }: { tooltip: string; href: string }) {
   return (
      <Tooltip content={tooltip}>
         <Button
            variant="light"
            isIconOnly
            className="cursor-pointer text-lg active:opacity-50"
            as={Link}
            href={href}>
            <EyeIcon className="w-5" />
         </Button>
      </Tooltip>
   );
}
