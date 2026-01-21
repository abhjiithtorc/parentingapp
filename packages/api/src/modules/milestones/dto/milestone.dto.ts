import {
  IsString,
  IsDateString,
  IsOptional,
  IsEnum,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MilestoneCategory {
  PHYSICAL = 'PHYSICAL',
  COGNITIVE = 'COGNITIVE',
  SOCIAL = 'SOCIAL',
  LANGUAGE = 'LANGUAGE',
  EMOTIONAL = 'EMOTIONAL',
  SELF_CARE = 'SELF_CARE',
}

export class CreateMilestoneDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  templateId?: string;

  @ApiProperty({ enum: MilestoneCategory })
  @IsEnum(MilestoneCategory)
  category: MilestoneCategory;

  @ApiProperty({ example: 'First steps!' })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({ example: 'Took 3 steps from couch to coffee table' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({ example: '2024-01-15' })
  @IsOptional()
  @IsDateString()
  achievedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  photoUrl?: string;
}

export class UpdateMilestoneDto {
  @ApiPropertyOptional({ example: '2024-01-15' })
  @IsOptional()
  @IsDateString()
  achievedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  photoUrl?: string;
}
