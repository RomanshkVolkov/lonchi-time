import { Products } from '@prisma/client';

export type ProductList = Pick<Products, 'id' | 'name'> & {
   price: {
      value: number;
      formatted: string;
   };
};
export type EventFieldTypes = 'name' | 'date' | 'location' | 'description';

export type EventRecordTypes = {
   id: string;
   name: string;
   date: string;
   location: string;
   description: string;
   orders: {
      id: string;
      hasCoca: boolean;
      diner: {
         id: string;
         name: string;
      };
      details: {
         id: string;
         quantity: number;
         product: ProductList;
      }[];
   }[];
};
