'use server';

import { ACTION_SUCCESS_RESPONSE } from '@/libs/constants/global';
import { OrderAtomTypes } from '@/libs/atoms/order';
import { createOrder, deleteOrder, editOrder } from '@/libs/services/orders';
import { handleActionError } from '@/libs/serializers/error-handler';

export async function createOrderAction(eventID: string, data: OrderAtomTypes) {
  try {
    await createOrder(eventID, data);
    return ACTION_SUCCESS_RESPONSE;
  } catch (error) {
    console.error(error);
    return handleActionError(error, {});
  }
}


export async function editOrderAction(id: string, data: OrderAtomTypes) {
  try {
    await editOrder(id, data);
    return ACTION_SUCCESS_RESPONSE;
  } catch (error) {
    console.error(error);
    return handleActionError(error, {});
  }
}


export async function deleteOrderAction(id: string) {
  try {
    await deleteOrder(id);
    return ACTION_SUCCESS_RESPONSE;
  } catch (error) {
    console.error(error);
    return handleActionError(error, {});
  }
}
