import MainWrapper from '@/ui/layout/main-wrapper';
import EventsTable from '@/ui/tables/events-table';
import { getEventsDataTable } from '@/libs/services/events';

export default async function Home() {
  const [data] = await Promise.all([getEventsDataTable()]);
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
        data={data.map((item: any) => ({
          ...item,
          date: item.date.toISOString(),
          cocaPrice: item.cocaPrice.value,
        }))}
      />
    </MainWrapper>
  );
}
