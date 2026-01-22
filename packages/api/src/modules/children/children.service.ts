import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateChildDto, UpdateChildDto } from './dto/child.dto';

@Injectable()
export class ChildrenService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateChildDto) {
    return this.prisma.child.create({
      data: {
        userId,
        name: data.name,
        dateOfBirth: new Date(data.dateOfBirth),
        gender: data.gender,
        avatarUrl: data.avatarUrl,
        color: data.color || '#8B5CF6',
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.child.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string, userId: string) {
    const child = await this.prisma.child.findFirst({
      where: { id, userId },
      include: {
        milestones: {
          orderBy: { achievedAt: 'desc' },
          take: 5,
        },
        growthRecords: {
          orderBy: { recordedAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!child) {
      throw new NotFoundException('Child not found');
    }

    return child;
  }

  async update(id: string, userId: string, data: UpdateChildDto) {
    await this.findOne(id, userId); // Verify ownership

    return this.prisma.child.update({
      where: { id },
      data: {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      },
    });
  }

  async delete(id: string, userId: string) {
    await this.findOne(id, userId); // Verify ownership

    return this.prisma.child.delete({
      where: { id },
    });
  }

  async getAgeInMonths(childId: string): Promise<number> {
    const child = await this.prisma.child.findUnique({
      where: { id: childId },
    });

    if (!child) {
      throw new NotFoundException('Child not found');
    }

    const now = new Date();
    const birth = new Date(child.dateOfBirth);
    const months =
      (now.getFullYear() - birth.getFullYear()) * 12 +
      (now.getMonth() - birth.getMonth());

    return Math.max(0, months);
  }
}
