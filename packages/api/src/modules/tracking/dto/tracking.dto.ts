import {
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
  IsEnum,
  IsObject,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGrowthRecordDto {
  @ApiPropertyOptional({ example: 75.5, description: 'Height in centimeters' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(200)
  heightCm?: number;

  @ApiPropertyOptional({ example: 9.2, description: 'Weight in kilograms' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(50)
  weightKg?: number;

  @ApiPropertyOptional({ example: 45.0, description: 'Head circumference in cm' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  headCircumferenceCm?: number;

  @ApiPropertyOptional({ example: '2024-01-15' })
  @IsOptional()
  @IsDateString()
  recordedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

export enum LogType {
  SLEEP = 'SLEEP',
  FEED_BREAST = 'FEED_BREAST',
  FEED_BOTTLE = 'FEED_BOTTLE',
  FEED_SOLID = 'FEED_SOLID',
  DIAPER_WET = 'DIAPER_WET',
  DIAPER_DIRTY = 'DIAPER_DIRTY',
  DIAPER_MIXED = 'DIAPER_MIXED',
  MEDICATION = 'MEDICATION',
  SYMPTOM = 'SYMPTOM',
  ACTIVITY = 'ACTIVITY',
}

export class CreateDailyLogDto {
  @ApiProperty({ enum: LogType })
  @IsEnum(LogType)
  type: LogType;

  @ApiPropertyOptional({
    description: 'Additional data specific to log type',
    example: { amount_ml: 120, side: 'left' },
  })
  @IsOptional()
  @IsObject()
  data?: Record<string, any>;

  @ApiPropertyOptional({ example: '2024-01-15T08:00:00Z' })
  @IsOptional()
  @IsDateString()
  startedAt?: string;

  @ApiPropertyOptional({ example: '2024-01-15T09:30:00Z' })
  @IsOptional()
  @IsDateString()
  endedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
