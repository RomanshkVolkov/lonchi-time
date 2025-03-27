'use server';

import prisma from '@/prisma/db';
import { serializeSelectOptionMapped } from '../serializers/common';

/**
 * @GET Section
 * @description This section contains the GET methods for the diners service.
 */

export async function getDinersForInput() {
  const data = await prisma.diner.findMany();

  return serializeSelectOptionMapped({
    mapped: { key: 'id', label: 'name' },
    options: data,
  });
}

/**
 *
 */
