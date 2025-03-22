import { notFound } from 'next/navigation';
import MainWrapper from '@/ui/layout/main-wrapper';
import EditEventForm from '@/ui/events/edit-form-event';
import { getEventRecordByID } from '@/libs/services/events';

type Props = {
  params: Promise<{ id: string }>;
};
export default async function EventsPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventRecordByID(id);

  if (!event) {
    notFound();
  }

  return (
    <MainWrapper
      headSectionH1Props={{ content: `Este es el evento "${event!.name}"` }}
      breadcrumbs={[
        { href: '/', label: 'Eventos' },
        { href: `/events/${id}`, label: 'Detalle' },
      ]}
      createItemButtonProps={{
        buttonElementProps: {
          href: `/events/${id}/append-order`,
        },
        content: 'Agregar orden',
      }}
    >
      <EditEventForm event={event} />
    </MainWrapper>
  );
}
