'use server';

import { EventFieldTypes } from '@/types/event';
import { OrderAtomTypes } from '../atoms/order';
import { createEvent, editEvent } from '../services/events';
import {
  handleActionError,
  printErrorsOnDevEnv,
} from '../serializers/error-handler';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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
