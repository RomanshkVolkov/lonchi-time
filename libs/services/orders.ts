'use server';

import { OrderAtomTypes } from '@/libs/atoms/order';
import prisma from '@/prisma/db';

export async function createOrder(eventID: string, data: OrderAtomTypes) {
  try {
    await prisma.order.create({
      data: {
        eventID,
        dinerID: data.diner.key,
        hasCoca: data.hasCoca,
        details: {
          createMany: {
            data: data.items.map((item) => ({
              productID: item.id,
              quantity: item.amount,
            }))
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create order');
  }
}

export async function editOrder(orderID: string, data: OrderAtomTypes) {
  try {
    await prisma.order.update({
      where: { id: orderID },
      data: {
        hasCoca: data.hasCoca,
        details: {
          deleteMany: {},
          createMany: {
            data: data.items.map((item) => ({
              productID: item.id,
              quantity: item.amount,
            }))
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Failed to edit order');
  }
}

export async function deleteOrder(orderID: string) {
  try {
    await prisma.$transaction(async (ctx) => {
      await ctx.orderDetails.deleteMany({
        where: {
          orderID
        }
      });

      await ctx.order.delete({
        where: {
          id: orderID
        }
      });

    });

  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete order');
  }
}
