import MainWrapper from '@/ui/layout/main-wrapper';
import EventsTable from '@/ui/tables/events-table';
import { getEventsDataTable } from '@/libs/services/events';
import { getDinersForInput } from '@/libs/services/diners';

export default async function Home() {
  const [data, diners] = await Promise.all([
    getEventsDataTable(),
    getDinersForInput(),
  ]);
  return (
    <MainWrapper
      headSectionH1Props={{
        content: 'Bienvenido a la pagina de los salbutes',
      }}
      createItemButtonProps={{
        buttonElementProps: {
          href: '/events/create',
        },
        content: 'Agregar evento',
      }}
    >
      <EventsTable
        data={data.map((item) => ({
          ...item,
          date: item.date.toISOString(),
        }))}
        diners={diners}
      />
    </MainWrapper>
  );
}
