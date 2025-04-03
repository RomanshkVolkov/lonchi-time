'use client';

import Link from 'next/link';
import PopoverWrapper from '@/ui/pop-ups/popover-wrapper';
import { Button } from '@heroui/react';

type Props = {
  links: { label: string; href: string }[];
  button: React.ReactNode;
};
export default function PopoverButtonLinks({ links, button }: Props) {
  return links.length > 0 ? (
    <PopoverWrapper
      trigger={button}
      popoverProps={{
        placement: 'bottom-start',
      }}
    >
      <ul className="flex max-h-[350px] w-full flex-col gap-2 overflow-y-auto p-2">
        {links.map((link) => (
          <Button
            key={link.href}
            as={Link}
            href={link.href}
            variant="ghost"
            size="sm"
          >
            {link.label}
          </Button>
        ))}
      </ul>
    </PopoverWrapper>
  ) : null;
}
