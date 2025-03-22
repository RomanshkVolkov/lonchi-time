import prisma from '@/prisma/db';
import MainWrapper from '@/ui/layout/main-wrapper';
import OrderTable from '@/ui/tables/order-table';

export default async function Home() {
   const data = await prisma.event.findMany({
      orderBy: {
         date: 'desc',
      },
   });
   console.log(data);
   return (
      <MainWrapper
         headSectionH1Props={{
            content: 'Bienvenido a la pagina de los salbutes',
         }}
         createItemButtonProps={{
            buttonElementProps: {
               href: `/events/create`,
            },
            content: 'Agregar evento',
         }}>
         <OrderTable
            data={data.map((item) => ({
               ...item,
               date: item.date.toISOString(),
            }))}
         />
      </MainWrapper>
   );
}
