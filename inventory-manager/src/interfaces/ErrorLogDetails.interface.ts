import { SystemErrorErrorDetails } from './SystemerrorDetail.interface';

export interface ErrorLogDetails extends SystemErrorErrorDetails {
  operation: string;
  productID?: string;
  date?: any;
  details?: object;
}
