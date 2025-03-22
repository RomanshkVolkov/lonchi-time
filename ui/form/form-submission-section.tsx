import CancelButton from '@/ui/form/cancel-button';
import SaveButton from '@/ui/form/save-button';
import FormErrorsSection from '@/ui/form/form-errors-section';
import { ErrorActionTypes } from '@/types/common';

type Props = {
   isLoading: boolean;
   cancelHref?: string;
   state?: ErrorActionTypes;
};
export default function FormSubmissionSection({ isLoading, cancelHref, state }: Props) {
   return (
      <>
         <FormErrorsSection state={state} />
         <div className="mt-4 flex w-full justify-between gap-2 sm:justify-end md:mt-0">
            {cancelHref && <CancelButton href={cancelHref} />}
            <SaveButton disabled={isLoading} isLoading={isLoading} />
         </div>
      </>
   );
}
