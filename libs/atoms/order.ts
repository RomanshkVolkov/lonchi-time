import { SelectOption } from '@/types/common';
import { ProductList } from '@/types/event';
import { atom } from 'jotai';

export type OrderAtomTypes = {
  key: string;
  id?: string;
  diner: SelectOption;
  hasCoca: boolean;
  items: (ProductList & {
    detailID?: string;
    amount: number;
  })[];
};
export const orderAtom = atom<OrderAtomTypes[]>([]);
