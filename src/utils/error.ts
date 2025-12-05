import { IErrorResponse } from '@/types/error';

export const isApiError = (err: unknown): err is IErrorResponse => {
  if (typeof err !== 'object' && err === null && !('message' in err))
    return false;
  return typeof (err as IErrorResponse).message === 'string';
};
