import { SystemErrorErrorDetails } from './SystemerrorDetail.interface';

export interface MongodbErrorErrorDetails extends SystemErrorErrorDetails {
  productID?: string;
}
