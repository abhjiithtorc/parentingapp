import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { CreateGrowthRecordDto, CreateDailyLogDto } from './dto/tracking.dto';

@Injectable()
export class TrackingService {
  constructor(
    private prisma: PrismaService,
    private childrenService: ChildrenService,
  ) {}

  // Growth Records
  async createGrowthRecord(childId: string, userId: string, data: CreateGrowthRecordDto) {
    await this.childrenService.findOne(childId, userId);

    return this.prisma.growthRecord.create({
      data: {
        childId,
        heightCm: data.heightCm,
        weightKg: data.weightKg,
        headCircumferenceCm: data.headCircumferenceCm,
        recordedAt: data.recordedAt ? new Date(data.recordedAt) : new Date(),
        notes: data.notes,
      },
    });
  }

  async getGrowthRecords(childId: string, userId: string) {
    await this.childrenService.findOne(childId, userId);

    return this.prisma.growthRecord.findMany({
      where: { childId },
      orderBy: { recordedAt: 'asc' },
    });
  }

  async getLatestGrowth(childId: string, userId: string) {
    await this.childrenService.findOne(childId, userId);

    return this.prisma.growthRecord.findFirst({
      where: { childId },
      orderBy: { recordedAt: 'desc' },
    });
  }

  // Daily Logs (Sleep, Feed, Diaper)
  async createDailyLog(childId: string, userId: string, data: CreateDailyLogDto) {
    await this.childrenService.findOne(childId, userId);

    return this.prisma.dailyLog.create({
      data: {
        childId,
        type: data.type,
        data: data.data || {},
        startedAt: data.startedAt ? new Date(data.startedAt) : undefined,
        endedAt: data.endedAt ? new Date(data.endedAt) : undefined,
        notes: data.notes,
      },
    });
  }

  async getDailyLogs(childId: string, userId: string, date?: string) {
    await this.childrenService.findOne(childId, userId);

    const targetDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    return this.prisma.dailyLog.findMany({
      where: {
        childId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getDailySummary(childId: string, userId: string, date?: string) {
    const logs = await this.getDailyLogs(childId, userId, date);

    const sleepLogs = logs.filter((l) => l.type === 'SLEEP');
    const feedLogs = logs.filter((l) =>
      ['FEED_BREAST', 'FEED_BOTTLE', 'FEED_SOLID'].includes(l.type),
    );
    const diaperLogs = logs.filter((l) =>
      ['DIAPER_WET', 'DIAPER_DIRTY', 'DIAPER_MIXED'].includes(l.type),
    );

    // Calculate total sleep time
    let totalSleepMinutes = 0;
    sleepLogs.forEach((log) => {
      if (log.startedAt && log.endedAt) {
        const diff = log.endedAt.getTime() - log.startedAt.getTime();
        totalSleepMinutes += Math.round(diff / (1000 * 60));
      }
    });

    return {
      date: date || new Date().toISOString().split('T')[0],
      sleep: {
        count: sleepLogs.length,
        totalMinutes: totalSleepMinutes,
        totalHours: Math.round(totalSleepMinutes / 60 * 10) / 10,
      },
      feeding: {
        count: feedLogs.length,
        breast: feedLogs.filter((l) => l.type === 'FEED_BREAST').length,
        bottle: feedLogs.filter((l) => l.type === 'FEED_BOTTLE').length,
        solid: feedLogs.filter((l) => l.type === 'FEED_SOLID').length,
      },
      diaper: {
        count: diaperLogs.length,
        wet: diaperLogs.filter((l) => l.type === 'DIAPER_WET').length,
        dirty: diaperLogs.filter((l) => l.type === 'DIAPER_DIRTY').length,
        mixed: diaperLogs.filter((l) => l.type === 'DIAPER_MIXED').length,
      },
    };
  }
}
