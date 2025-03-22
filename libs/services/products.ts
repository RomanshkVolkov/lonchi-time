'use server';

import prisma from '@/prisma/db';
import { serializePrice } from '../serializers/common';

/**
 * @GET Section
 * @description This section contains the GET methods for the products service.
 */

export async function getProductsForCreateOrder() {
   const data = await prisma.products.findMany();
   return data.map((product) => ({ ...product, price: serializePrice(product.price) }));
}
