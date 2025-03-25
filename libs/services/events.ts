'use server';

import prisma from '@/prisma/db';
import { OrderAtomTypes } from '../atoms/order';
import { serializePrice } from '../serializers/common';
import { EventRecordTypes } from '@/types/event';
import { NO_LOGIC_DELETED_AT } from '@/prisma/queries';

export async function getEventsDataTable() {
  return await prisma.event.findMany({
    orderBy: {
      date: 'desc',
    },
    where: NO_LOGIC_DELETED_AT
  });
}

export async function createEvent(data: {
  name: string;
  date: string;
  location: string;
  description: string;
  orders: OrderAtomTypes[];
}) {
  await prisma.$transaction(async (ctx) => {
    const event = await ctx.event.create({
      data: {
        name: data.name,
        date: data.date,
        location: data.location,
        description: data.description,
      },
    });

    for (const order of data.orders) {
      const createdOrder = await ctx.order.create({
        data: {
          eventID: event.id,
          dinerID: order.diner.key,
        },
      });

      await ctx.orderDetails.createMany({
        data: order.items.map((item) => ({
          orderID: createdOrder.id,
          productID: item.id,
          quantity: item.amount,
        })),
      });
    }
  });
}

export async function editEvent(data: {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  orders: OrderAtomTypes[];
}) {
  await prisma.$transaction(async (ctx) => {
    await ctx.event.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        date: data.date,
        location: data.location,
        description: data.description,
      },
    });

    await ctx.orderDetails.deleteMany({
      where: {
        order: {
          eventID: data.id,
          id: {
            notIn: data.orders.filter((o) => o.key.includes('-')).map((order) => order.key),
          }
        }
      },
    });

    await ctx.order.deleteMany({
      where: {
        eventID: data.id,
        NOT: {
          id: {
            in: data.orders.filter((o) => o.key.includes('-')).map((order) => order.key),
          },
        },
      },
    });

    for (const order of data.orders) {
      const isNewOrder = !order.key.includes('-');

      if (isNewOrder) {
        const createdOrder = await ctx.order.create({
          data: {
            eventID: data.id,
            dinerID: order.diner.key,
          },
        });

        await ctx.orderDetails.createMany({
          data: order.items.map((item) => ({
            orderID: createdOrder.id,
            productID: item.id,
            quantity: item.amount,
          })),
        });

        continue;
      }

      await ctx.order.update({
        where: {
          id: order.key,
        },
        data: {
          dinerID: order.diner.key,
          hasCoca: order.hasCoca,
        },
      });

      await ctx.orderDetails.deleteMany({
        where: {
          orderID: order.key,
        },
      });

      await ctx.orderDetails.createMany({
        data: order.items.map((item) => ({
          orderID: order.key,
          productID: item.id,
          quantity: item.amount,
        })),
      });
    }
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
