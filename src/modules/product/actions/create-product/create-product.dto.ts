import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  enabled: boolean;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  salePrice: number;

  @IsOptional()
  @IsNumber()
  retailPrice: number;

  @IsOptional()
  @IsNumber()
  wholesalePrice: number;

  @IsOptional()
  @IsDateString()
  availableAt: Date;

  @IsOptional()
  @IsDateString()
  discontinueAt: Date;

  @IsOptional()
  @IsInt()
  featuredAttachmentId: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  attachments: number[];
}
