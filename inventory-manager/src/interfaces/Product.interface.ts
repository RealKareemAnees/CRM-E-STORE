import { ObjectId } from 'mongodb';

export interface ProductInterface {
  title: string;
  description: string;
  newPrice: number;
}

export interface ProductWithIDInterface {
  _id: ObjectId;
  title: string;
  description: string;
  newPrice: number;
}

export interface productID {
  _id: string;
}
