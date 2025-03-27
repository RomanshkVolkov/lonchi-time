import CancelButton from '@/ui/form/cancel-button';
import SaveButton from '@/ui/form/save-button';
import FormErrorsSection from '@/ui/form/form-errors-section';
import { ErrorActionTypes } from '@/types/common';
import clsx from 'clsx';

type Props = {
  isLoading: boolean;
  cancelHref?: string;
  state?: ErrorActionTypes;
};
export default function FormSubmissionSection({
  isLoading,
  cancelHref,
  state,
}: Props) {
  const isDisableCancel = !Boolean((cancelHref?.length ?? 0) > 0);
  return (
    <>
      <FormErrorsSection state={state} />
      <div
        className={clsx('mt-4 flex w-full gap-2 sm:justify-end md:mt-0', {
          'justify-end': isDisableCancel,
          'justify-between': !isDisableCancel,
        })}
      >
        {cancelHref && <CancelButton href={cancelHref} />}
        <SaveButton disabled={isLoading} isLoading={isLoading} />
      </div>
    </>
  );
}
