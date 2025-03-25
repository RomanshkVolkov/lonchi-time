import { ACTION_ERROR_RESPONSE } from '@/libs/constants/global';

export function printErrorsOnDevEnv(error: any) {
  if (process.env.NODE_ENV !== 'production') {
    console.debug(error?.stack ?? error);
  }
}

export function handleActionError<T extends Record<string, string[]>>(
  error: any,
  fields: Record<string, string>,
  errors: T = {} as T
) {
  printErrorsOnDevEnv(error);
  const message = (error?.message as string) ?? 'Ocurrío un error inesperado';
  const details = error?.stack ?? error;

  return {
    ...ACTION_ERROR_RESPONSE,
    message,
    details,
    errors,
    fields,
  };
}
