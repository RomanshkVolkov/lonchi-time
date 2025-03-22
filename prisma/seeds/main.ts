import prisma from '@/prisma/db';

export async function runSeeds() {
   await Promise.all([runProductsSeed(), runDinerSeed()]);
}

runSeeds().then(async () => {
   console.debug('Seeds runned successfully');
   await prisma.$disconnect();
});

async function runProductsSeed() {
   const products = [
      'Relleno negro',
      'Cochinita',
      'Asada',
      'Salpicón',
      'Pollo en escabeche',
      'Huevo hervido',
      'Milanesa',
      'Lomitos',
   ];

   for (const name of products.sort((a, b) => a.localeCompare(b))) {
      await prisma.products.upsert({
         create: {
            name,
         },
         update: {},
         where: {
            name,
         },
      });
   }
}

async function runDinerSeed() {
   const diners = [
      'Rebeca',
      'Itzel',
      'Diego',
      'Jose',
      'Luis',
      'Arturo',
      'Rodrigo',
      'Brenda',
      'Carlos',
      'Javier',
      'Emmanuel',
   ];

   for (const name of diners.sort((a, b) => a.localeCompare(b))) {
      await prisma.diner.upsert({
         create: {
            name,
         },
         update: {},
         where: {
            name,
         },
      });
   }
}
