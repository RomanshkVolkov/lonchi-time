'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { EventFieldTypes } from '@/types/event';
import { OrderAtomTypes } from '@/libs/atoms/order';
import { createEvent, deleteEvent, editEvent } from '@/libs/services/events';
import {
  handleActionError,
  printErrorsOnDevEnv,
} from '@/libs/serializers/error-handler';
import { ACTION_SUCCESS_RESPONSE } from '../constants/global';

export async function createEventAction(
  orders: OrderAtomTypes[],
  prevState: any,
  formData: FormData,
) {
  const data = Object.fromEntries(formData.entries()) as Record<
    EventFieldTypes,
    string
  >;

  try {
    await createEvent({
      name: data.name,
      date: new Date(data.date).toISOString(),
      location: data.location,
      description: data.description,
      orders,
    });
  } catch (error) {
    printErrorsOnDevEnv(error);
    return handleActionError(error, data);
  }
  revalidatePath('/');
  redirect('/');
}

export async function editEventAction(
  id: string,
  orders: OrderAtomTypes[],
  prevState: any,
  formData: FormData,
) {
  const data = Object.fromEntries(formData.entries()) as Record<
    EventFieldTypes,
    string
  >;

  try {
    await editEvent({
      id,
      name: data.name,
      date: new Date(data.date).toISOString(),
      location: data.location,
      description: data.description,
      orders,
    });
  } catch (error) {
    printErrorsOnDevEnv(error);
    return handleActionError(error, data);
  }
  revalidatePath('/');
  redirect('/');
}

export async function deleteEventAction(
  id: string,
) {
  try {
    await deleteEvent(id);
    return ACTION_SUCCESS_RESPONSE;
  } catch (error) {
    printErrorsOnDevEnv(error);
    return handleActionError(error, {});
  }
}
