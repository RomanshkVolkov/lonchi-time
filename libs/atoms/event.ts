import { atom } from 'jotai';

export type EventAtomTypes = {
  id: string;
};

const defaultValue: EventAtomTypes = {
  id: 'default',
};

export const eventAtom = atom<EventAtomTypes>(defaultValue);
