import ModalWrapper from '@/ui/pop-ups/modal-wrapper';
import FormDeleteOrder from '@/ui/events/form-delete-order';

export default async function DeleteOrderModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <ModalWrapper header="Editar orden" isIntercepted footer={<></>}>
      <FormDeleteOrder id={id} />
    </ModalWrapper>
  );
}
