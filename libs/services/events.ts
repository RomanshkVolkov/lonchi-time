'use server';

import prisma from '@/prisma/db';
import { NO_LOGIC_DELETED_AT } from '@/prisma/queries';
import { serializePrice } from '@/libs/serializers/common';
import { EventRecordTypes } from '@/types/event';

export async function getEventsDataTable() {
  const data = await prisma.event.findMany({
    orderBy: {
      date: 'desc',
    },
    where: NO_LOGIC_DELETED_AT
  });

  return data.map((event) => ({
    ...event,
    cocaPrice: serializePrice(event.cocaPrice),
  }));
}

export async function createEvent(data: {
  name: string;
  date: string;
  location: string;
  description: string;
  cocaPrice: string;
}) {
  await prisma.event.create({
    data: {
      name: data.name,
      date: data.date,
      location: data.location,
      description: data.description,
      cocaPrice: +data.cocaPrice || 50,
    },
  });

}

export async function editEvent(data: {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  cocaPrice: string;
}) {
  await prisma.event.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      date: data.date,
      location: data.location,
      description: data.description,
      cocaPrice: +data.cocaPrice || 50,
    },
  });

}

export async function getEventRecordByID(
  id: string,
): Promise<EventRecordTypes | null> {
  const data = await prisma.event.findUnique({
    select: {
      id: true,
      name: true,
      date: true,
      location: true,
      description: true,
      cocaPrice: true,
      orders: {
        select: {
          id: true,
          diner: true,
          hasCoca: true,
          details: {
            select: {
              id: true,
              product: true,
              quantity: true,
            },
          },
        },
      },
    },
    where: {
      id: id,
    },
  });

  if (!data) {
    return null;
  }

  return {
    ...data,
    cocaPrice: data.cocaPrice.toNumber(),
    date: data.date.toISOString(),
    orders: data.orders.map((order) => ({
      ...order,
      details: order.details.map((detail) => ({
        ...detail,
        product: {
          ...detail.product,
          price: serializePrice(detail.product.price),
        },
      })),
    })),
  };
}

export async function deleteEvent(id: string) {
  await prisma.event.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
    }
  });
}

export async function deleteOrder(orderID: string) {
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
}
