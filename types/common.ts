import { ButtonProps } from '@heroui/react';

export type TableColumns<T> = {
  key: keyof T | 'actions' | string;
  label: string;
  align?: 'start' | 'center' | 'end';
  //  styles?: Styles[0];
  omitHead?: boolean;
};

export type TableProps<T> = {
  columns?: TableColumns<T>[];
  data: T[];
  redirectPath?: string;
  omitActions?: {
    edit?: boolean;
    delete?: boolean;
  };
  renderFunction?: (
    _row: T,
    _columnKey: keyof T & 'actions' & string,
  ) => React.ReactNode;
};

export type HeroIcon = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>
>;

export type ButtonHero = ButtonProps;

export type ErrorActionTypes = {
  success: boolean;
  message: string;
  details: string;
  errors: Record<string, string[]>;
  fields: Record<string, string>;
};

export type SelectOption = {
  label: string;
  key: string;
  [key: string]: string;
};
