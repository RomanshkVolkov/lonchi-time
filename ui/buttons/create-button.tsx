'use client';

import { HeroIcon } from '@/types/common';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button, ButtonProps } from '@heroui/react';
import Link from 'next/link';

/**
 * A button component that links to a specified URL and includes an icon.
 * Renders a full button with children and icon for larger screens, and an icon-only button for smaller screens.
 * @param href - The URL to link to
 * @param children - The children to render inside the button.
 * @param icon - The icon to render inside the button. Defaults to PlusIcon.
 */

type CustomButtonProps = Omit<ButtonProps, 'children'>;
export default function CreateLinkButton({
   href,
   children,
   icon,
   mobileProps,
   desktopProps,
}: {
   href: string;
   children: React.ReactNode;
   icon?: HeroIcon;
} & {
   mobileProps?: CustomButtonProps;
   desktopProps?: CustomButtonProps;
}) {
   const Icon = icon || PlusIcon;
   return (
      <>
         <Button
            className="hidden md:flex"
            color="secondary"
            variant="flat"
            size="lg"
            type="button"
            href={href}
            as={Link}
            {...desktopProps}>
            {children}
            <Icon className="w-6" />
         </Button>
         <Button
            className="md:hidden flex"
            color="secondary"
            variant="flat"
            size="lg"
            type="button"
            href={href}
            as={Link}
            isIconOnly
            {...mobileProps}>
            <Icon className="w-6" />
         </Button>
      </>
   );
}
