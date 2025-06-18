import { EventRecordTypes } from '@/types/event';
import { OrderAtomTypes } from '../atoms/order';

export function serializeEventRecordOrders(
  data: EventRecordTypes['orders']
): OrderAtomTypes[] {
  return data.map((order) => ({
    key: order.id,
    id: order.id,
    isCollapsed: false,
    diner: {
      key: order.diner.id,
      label: order.diner.name,
    },
    hasCoca: order.hasCoca,
    items: order.details.map((detail) => ({
      id: detail.product.id,
      detailID: detail.id,
      name: detail.product.name,
      price: {
        value: detail.product.price.value,
        formatted: detail.product.price.formatted,
      },
      amount: detail.quantity,
    })),
  }));
}
