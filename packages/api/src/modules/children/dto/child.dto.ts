import {
  IsString,
  IsDateString,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export class CreateChildDto {
  @ApiProperty({ example: 'Emma' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: '2023-06-15' })
  @IsDateString()
  dateOfBirth: string;

  @ApiPropertyOptional({ enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: '#8B5CF6' })
  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'Color must be a valid hex color' })
  color?: string;
}

export class UpdateChildDto {
  @ApiPropertyOptional({ example: 'Emma Rose' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional({ example: '2023-06-15' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: '#8B5CF6' })
  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'Color must be a valid hex color' })
  color?: string;
}
