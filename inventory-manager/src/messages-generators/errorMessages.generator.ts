export function systemErrorMessage<T>(message?: T): T {
  const defaultMessage: string = 'Internal Server Error [-_-]';
  return (message !== undefined ? message : defaultMessage) as T;
}

export function mongodbErrorMessage<T>(message?: T): T {
  const defaultMessage: string = 'Internal Server Error [-_-]';
  return (message !== undefined ? message : defaultMessage) as T;
}
