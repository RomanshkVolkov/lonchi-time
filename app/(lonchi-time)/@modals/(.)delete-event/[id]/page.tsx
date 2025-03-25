import DeleteEventForm from '@/ui/events/delete-event-form';
import ModalWrapper from '@/ui/pop-ups/modal-wrapper';

export default async function DeleteEventModal({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ name?: string }>;
}) {
  const { id } = await params;
  const { name } = await searchParams;

  return (
    <ModalWrapper header="Eliminar Evento" isIntercepted>
      <DeleteEventForm id={id} name={name} />
    </ModalWrapper>
  );
}
