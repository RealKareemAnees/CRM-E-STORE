# Inventory manager

- all it does it to add or delete or update products
- it it the only one who can edit the products in the DB

## schemas

```typescript
export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(200)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(10)
  @Max(10000)
  newPrice: number;
}

export interface ProductInterface {
  title: string;
  description: string;
  newPrice: number;
}

export interface ProductWithIDInterface {
  _id: string;
  title: string;
  description: string;
  newPrice: number;
}

export interface productID {
  _id: string;
}

export interface SystemErrorErrorDetails {
  cause?: string | object | [];
}

export interface ErrorLogDetails extends SystemErrorErrorDetails {
  operation: string;
  productID?: string;
  date?: any;
  details?: object;
}

export interface LoggerMessageInterface {
  operation: string;
  productID: string | ObjectId;
  timeAdded: number | Date;
}

export interface SystemExceptionResponseMessageInterface {
  message: string | object | [];
  error?: any;
}
```

## constants

```ts
export const MONGODBURI = 'MONGODBURI';
export const DB_NAME = 'DB_NAME';
export const connectTimeoutMS = 'CONNECTIO_TIMEOUT'; // Example value, adjust as needed
export const minPoolSize = 'MINPOOLSIZE'; // Example value, adjust as needed
export const maxPoolSize = 'MAXPOOLSIZE'; // Example value, adjust as needed
export const products_collection = 'PRODUCTS_COLLECTION';

export const error_logs = 'ERROR_LOGS';
export const operation_logs = 'OPERATION_LOGS';
export const failed_operation_logs = 'FAILED_OPERATIO_LOGS';

export const operations_names = {
  add_product: 'add-product',
  update_product: 'update-product',
  delete_product: 'delete-product',
};
```

## messages

```ts
@Injectable()
export class OperationMessagesProvider {
  constructor() {}

  addProductMessage(productID?: string | ObjectId): string {
    const defaultMessage: string = 'FailedError to add Product [-_-]';
    return productID !== undefined
      ? `product with id ${productID} has been added successfully`
      : defaultMessage;
  }
  updateProductMessage(productID?: string | ObjectId): string {
    const defaultMessage: string = 'FailedError to add Product [-_-]';
    return productID !== undefined
      ? `product with id ${productID} has been updated successfully`
      : defaultMessage;
  }

  deleteProductMessage(productID?: string | ObjectId): string {
    const defaultMessage: string = 'FailedError to add Product [-_-]';
    return productID !== undefined
      ? `product with id ${productID} has been deleted successfully`
      : defaultMessage;
  }
}
```
