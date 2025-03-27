'use client';

import { useState } from 'react';
import { Button, ButtonProps, Input, InputProps } from '@heroui/react';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

type Props = {
  inputProps?: Omit<InputProps, 'children'>;
  buttonProps?: Omit<ButtonProps, 'children'>;
  defaultValue?: number;
};
export function ButtonQuantity({
  inputProps,
  buttonProps,
  defaultValue,
}: Props) {
  const [quantity, setQuantity] = useState<number | string>(defaultValue ?? 0);
  const [error, setError] = useState(false);

  const handleChange = (v: string) => {
    setError(!/^\d+$/.test(v));
    setQuantity(v);
  };

  const handleMinus = () => {
    setQuantity((prev) => {
      const num = +prev;
      if (num > 0) {
        return num - 1;
      }
      return 0;
    });
  };

  const handlePlus = () => {
    setQuantity((prev) => {
      const num = +prev;
      if (num < 20) return num + 1;
      return 20;
    });
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <Button isIconOnly variant="ghost" onPress={handleMinus} {...buttonProps}>
        <MinusCircleIcon className="h-6 w-6" />
      </Button>
      <Input
        type="text"
        size="md"
        onValueChange={handleChange}
        isInvalid={error}
        errorMessage="Inválido"
        value={String(quantity)}
        className="w-[50px]"
        {...inputProps}
      />
      <Button isIconOnly variant="ghost" onPress={handlePlus} {...buttonProps}>
        <PlusCircleIcon className="h-6 w-6" />
      </Button>
    </div>
  );
}
