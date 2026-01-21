import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { CreateMilestoneDto, UpdateMilestoneDto } from './dto/milestone.dto';
import { MilestoneCategory } from '@prisma/client';

@Injectable()
export class MilestonesService {
  constructor(
    private prisma: PrismaService,
    private childrenService: ChildrenService,
  ) {}

  async create(childId: string, userId: string, data: CreateMilestoneDto) {
    // Verify child belongs to user
    await this.childrenService.findOne(childId, userId);

    return this.prisma.milestone.create({
      data: {
        childId,
        templateId: data.templateId,
        category: data.category,
        title: data.title,
        description: data.description,
        achievedAt: data.achievedAt ? new Date(data.achievedAt) : new Date(),
        notes: data.notes,
        photoUrl: data.photoUrl,
      },
    });
  }

  async findAllByChild(childId: string, userId: string) {
    await this.childrenService.findOne(childId, userId);

    return this.prisma.milestone.findMany({
      where: { childId },
      orderBy: { achievedAt: 'desc' },
      include: {
        template: true,
      },
    });
  }

  async findUpcoming(childId: string, userId: string) {
    const ageMonths = await this.childrenService.getAgeInMonths(childId);

    // Get templates for milestones not yet achieved
    const achievedTemplateIds = await this.prisma.milestone.findMany({
      where: { childId },
      select: { templateId: true },
    });

    const achievedIds = achievedTemplateIds
      .map((m) => m.templateId)
      .filter(Boolean) as string[];

    return this.prisma.milestoneTemplate.findMany({
      where: {
        id: { notIn: achievedIds },
        ageMonthsMin: { lte: ageMonths + 3 },
        ageMonthsMax: { gte: ageMonths },
        isActive: true,
      },
      orderBy: [{ ageMonthsMin: 'asc' }, { order: 'asc' }],
    });
  }

  async markAchieved(id: string, userId: string, data: UpdateMilestoneDto) {
    const milestone = await this.prisma.milestone.findUnique({
      where: { id },
      include: { child: true },
    });

    if (!milestone || milestone.child.userId !== userId) {
      throw new NotFoundException('Milestone not found');
    }

    return this.prisma.milestone.update({
      where: { id },
      data: {
        achievedAt: data.achievedAt ? new Date(data.achievedAt) : new Date(),
        notes: data.notes,
        photoUrl: data.photoUrl,
      },
    });
  }

  async getTemplates(category?: MilestoneCategory) {
    return this.prisma.milestoneTemplate.findMany({
      where: {
        isActive: true,
        ...(category && { category }),
      },
      orderBy: [{ ageMonthsMin: 'asc' }, { order: 'asc' }],
    });
  }

  async getProgress(childId: string, userId: string) {
    await this.childrenService.findOne(childId, userId);
    const ageMonths = await this.childrenService.getAgeInMonths(childId);

    const [achieved, total] = await Promise.all([
      this.prisma.milestone.count({
        where: {
          childId,
          achievedAt: { not: null },
        },
      }),
      this.prisma.milestoneTemplate.count({
        where: {
          ageMonthsMax: { gte: 0 },
          ageMonthsMin: { lte: ageMonths },
          isActive: true,
        },
      }),
    ]);

    return {
      achieved,
      total: Math.max(total, achieved),
      percentage: total > 0 ? Math.round((achieved / total) * 100) : 0,
      ageMonths,
    };
  }
}
