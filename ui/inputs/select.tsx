'use client';

import { SelectOption } from '@/types/common';
import { SelectProps, Select as SelectH, SelectItem } from '@heroui/react';

export default function Select({
   options,
   ...selectProps
}: {
   options: SelectOption[];
} & Omit<SelectProps, 'children'>) {
   return (
      <SelectH {...selectProps}>
         {options.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
         ))}
      </SelectH>
   );
}
