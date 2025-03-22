import { Button } from '@heroui/react';
import { ButtonHero } from '@/types/common';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

type Props = {} & ButtonHero;
export default function SaveButton({ ...props }: Props) {
   return (
      <Button
         color="success"
         variant="shadow"
         type="submit"
         endContent={<CheckCircleIcon className="w-6" />}
         {...props}>
         Guardar
      </Button>
   );
}
