import { MaxLength } from '@nestjs/class-validator';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  MinLength,
  Min,
  Max,
} from 'class-validator';
import { ObjectId } from 'mongodb';

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

export class productID {
  @IsString()
  @IsNotEmpty()
  _id: string;
}
