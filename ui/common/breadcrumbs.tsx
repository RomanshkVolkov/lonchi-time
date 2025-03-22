'use client';

import { Breadcrumbs as HeroBreadcrumbs, BreadcrumbItem } from '@heroui/react';

interface BreadCrumbProps {
   items: {
      label: string;
      href: string;
   }[];
}
export default function Breadcrumbs({ items }: BreadCrumbProps) {
   return (
      <HeroBreadcrumbs variant="solid" className="mt-2">
         {items.map((item, index) => (
            <BreadcrumbItem key={index} href={item.href}>
               {item.label}
            </BreadcrumbItem>
         ))}
      </HeroBreadcrumbs>
   );
}
