import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MilestonesService } from './milestones.service';
import { CreateMilestoneDto, UpdateMilestoneDto } from './dto/milestone.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MilestoneCategory } from '@prisma/client';

@ApiTags('milestones')
@Controller('milestones')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MilestonesController {
  constructor(private milestonesService: MilestonesService) {}

  @Post('child/:childId')
  @ApiOperation({ summary: 'Create a milestone for a child' })
  async create(
    @Param('childId') childId: string,
    @Request() req: any,
    @Body() createMilestoneDto: CreateMilestoneDto,
  ) {
    return this.milestonesService.create(childId, req.user.id, createMilestoneDto);
  }

  @Get('child/:childId')
  @ApiOperation({ summary: 'Get all milestones for a child' })
  async findAllByChild(@Param('childId') childId: string, @Request() req: any) {
    return this.milestonesService.findAllByChild(childId, req.user.id);
  }

  @Get('child/:childId/upcoming')
  @ApiOperation({ summary: 'Get upcoming milestones for a child' })
  async findUpcoming(@Param('childId') childId: string, @Request() req: any) {
    return this.milestonesService.findUpcoming(childId, req.user.id);
  }

  @Get('child/:childId/progress')
  @ApiOperation({ summary: 'Get milestone progress for a child' })
  async getProgress(@Param('childId') childId: string, @Request() req: any) {
    return this.milestonesService.getProgress(childId, req.user.id);
  }

  @Patch(':id/achieve')
  @ApiOperation({ summary: 'Mark a milestone as achieved' })
  async markAchieved(
    @Param('id') id: string,
    @Request() req: any,
    @Body() updateMilestoneDto: UpdateMilestoneDto,
  ) {
    return this.milestonesService.markAchieved(id, req.user.id, updateMilestoneDto);
  }

  @Get('templates')
  @ApiOperation({ summary: 'Get milestone templates' })
  @ApiQuery({ name: 'category', required: false, enum: MilestoneCategory })
  async getTemplates(@Query('category') category?: MilestoneCategory) {
    return this.milestonesService.getTemplates(category);
  }
}
