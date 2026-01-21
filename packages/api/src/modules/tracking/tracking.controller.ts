import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TrackingService } from './tracking.service';
import { CreateGrowthRecordDto, CreateDailyLogDto } from './dto/tracking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('tracking')
@Controller('tracking')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TrackingController {
  constructor(private trackingService: TrackingService) {}

  // Growth Records
  @Post('growth/:childId')
  @ApiOperation({ summary: 'Record growth measurements' })
  async createGrowthRecord(
    @Param('childId') childId: string,
    @Request() req: any,
    @Body() createGrowthRecordDto: CreateGrowthRecordDto,
  ) {
    return this.trackingService.createGrowthRecord(
      childId,
      req.user.id,
      createGrowthRecordDto,
    );
  }

  @Get('growth/:childId')
  @ApiOperation({ summary: 'Get all growth records for a child' })
  async getGrowthRecords(@Param('childId') childId: string, @Request() req: any) {
    return this.trackingService.getGrowthRecords(childId, req.user.id);
  }

  @Get('growth/:childId/latest')
  @ApiOperation({ summary: 'Get latest growth record' })
  async getLatestGrowth(@Param('childId') childId: string, @Request() req: any) {
    return this.trackingService.getLatestGrowth(childId, req.user.id);
  }

  // Daily Logs
  @Post('logs/:childId')
  @ApiOperation({ summary: 'Create a daily log entry' })
  async createDailyLog(
    @Param('childId') childId: string,
    @Request() req: any,
    @Body() createDailyLogDto: CreateDailyLogDto,
  ) {
    return this.trackingService.createDailyLog(childId, req.user.id, createDailyLogDto);
  }

  @Get('logs/:childId')
  @ApiOperation({ summary: 'Get daily logs for a child' })
  @ApiQuery({ name: 'date', required: false, example: '2024-01-15' })
  async getDailyLogs(
    @Param('childId') childId: string,
    @Request() req: any,
    @Query('date') date?: string,
  ) {
    return this.trackingService.getDailyLogs(childId, req.user.id, date);
  }

  @Get('logs/:childId/summary')
  @ApiOperation({ summary: 'Get daily summary for a child' })
  @ApiQuery({ name: 'date', required: false, example: '2024-01-15' })
  async getDailySummary(
    @Param('childId') childId: string,
    @Request() req: any,
    @Query('date') date?: string,
  ) {
    return this.trackingService.getDailySummary(childId, req.user.id, date);
  }
}
