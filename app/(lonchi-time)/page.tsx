import { getEventsDataTable } from '@/libs/services/events';
import MainWrapper from '@/ui/layout/main-wrapper';
import OrderTable from '@/ui/tables/order-table';

export default async function Home() {
  const data = await getEventsDataTable();
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
      <OrderTable
        data={data.map((item) => ({
          ...item,
          date: item.date.toISOString(),
        }))}
      />
    </MainWrapper>
  );
}
