import FormAppendOrder from '@/ui/events/form-append-order';
import ModalWrapper from '@/ui/pop-ups/modal-wrapper';
import { getDinnersForInput } from '@/libs/services/diners';
import { getProductsForCreateOrder } from '@/libs/services/products';

export default async function AppendOrderModal({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const [diners, products] = await Promise.all([
      getDinnersForInput(),
      getProductsForCreateOrder(),
   ]);
   return (
      <ModalWrapper header="Editar orden" isIntercepted>
         <FormAppendOrder keyItem={id} mode="edit" diners={diners} products={products} />
      </ModalWrapper>
   );
}
