import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async getTipOfTheDay(ageMonths: number) {
    const tips = await this.prisma.tip.findMany({
      where: {
        ageMonthsMin: { lte: ageMonths },
        ageMonthsMax: { gte: ageMonths },
        isActive: true,
      },
    });

    if (tips.length === 0) {
      return this.getDefaultTip();
    }

    // Select a "random" tip based on the day
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24),
    );
    const index = dayOfYear % tips.length;

    return tips[index];
  }

  async getTipsForAge(ageMonths: number, limit = 10) {
    return this.prisma.tip.findMany({
      where: {
        ageMonthsMin: { lte: ageMonths },
        ageMonthsMax: { gte: ageMonths },
        isActive: true,
      },
      take: limit,
    });
  }

  async getArticles(category?: string, ageMonths?: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const where: any = {
      isPublished: true,
    };

    if (category) {
      where.category = category;
    }

    if (ageMonths !== undefined) {
      where.OR = [
        {
          ageMonthsMin: { lte: ageMonths },
          ageMonthsMax: { gte: ageMonths },
        },
        {
          ageMonthsMin: null,
          ageMonthsMax: null,
        },
      ];
    }

    const [articles, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.article.count({ where }),
    ]);

    return {
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getArticleBySlug(slug: string) {
    return this.prisma.article.findUnique({
      where: { slug, isPublished: true },
    });
  }

  private getDefaultTip() {
    return {
      id: 'default',
      title: 'Welcome to LittleSteps!',
      content:
        "Every child develops at their own pace. Celebrate the small wins and enjoy this beautiful journey of parenthood!",
      category: 'general',
      iconName: 'heart',
      ageMonthsMin: 0,
      ageMonthsMax: 60,
    };
  }
}
