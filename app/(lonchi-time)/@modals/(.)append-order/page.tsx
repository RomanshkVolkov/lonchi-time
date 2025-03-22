import FormAppendOrder from '@/ui/events/form-append-order';
import ModalWrapper from '@/ui/pop-ups/modal-wrapper';
import { getDinnersForInput } from '@/libs/services/diners';
import { getProductsForCreateOrder } from '@/libs/services/products';

export default async function AppendOrderModal() {
   const [diners, products] = await Promise.all([
      getDinnersForInput(),
      getProductsForCreateOrder(),
   ]);
   return (
      <ModalWrapper header="Agregar orden" isIntercepted>
         <FormAppendOrder diners={diners} products={products} />
      </ModalWrapper>
   );
}
