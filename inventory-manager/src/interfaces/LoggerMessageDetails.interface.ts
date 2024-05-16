import { ObjectId } from 'mongodb';

export interface LoggerMessageInterface {
  operation: string;
  productID: string | ObjectId;
  timeAdded: number | Date;
}
