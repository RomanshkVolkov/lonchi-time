'use client';

import { JSX } from 'react';
import CreateLinkButton from '@/ui/buttons/create-button';
import { ButtonProps } from '@heroui/react';
import { HeroIcon } from '@/types/common';
import Breadcrumbs from '@/ui/common/breadcrumbs';

type Props = {
   children: React.ReactNode;
   mainElementProps?: JSX.IntrinsicElements['main'];
   headSectionProps?: JSX.IntrinsicElements['div'];
   headSectionH1Props: {
      h1elementProps?: JSX.IntrinsicElements['h1'];
      content: React.ReactNode;
   };
   headRightSectionProps?: React.ReactNode;
   createItemButtonProps?: {
      buttonElementProps?: {
         icon?: HeroIcon;
         href: string;
      } & Partial<
         Record<'mobileProps' | 'desktopProps', Omit<ButtonProps, 'children'> | undefined>
      >;
      content: React.ReactNode;
   };
   breadcrumbs?: { label: string; href: string }[];
};
export default function MainWrapper({
   children,
   mainElementProps,
   headSectionProps,
   headSectionH1Props,
   headRightSectionProps,
   createItemButtonProps,
   breadcrumbs = [],
}: Props) {
   return (
      <main {...mainElementProps}>
         <div
            className="mb-6 flex items-center justify-between"
            {...(headSectionProps ?? {})}>
            <div>
               <h1
                  className="mb-4 text-4xl"
                  {...(headSectionH1Props?.h1elementProps ?? {})}>
                  {headSectionH1Props.content}
               </h1>
               {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
            </div>
            {headRightSectionProps && headRightSectionProps}
            {createItemButtonProps && createItemButtonProps.buttonElementProps && (
               <CreateLinkButton {...createItemButtonProps.buttonElementProps}>
                  {createItemButtonProps.content}
               </CreateLinkButton>
            )}
         </div>
         {children}
      </main>
   );
}
