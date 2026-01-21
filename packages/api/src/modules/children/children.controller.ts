import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChildrenService } from './children.service';
import { CreateChildDto, UpdateChildDto } from './dto/child.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('children')
@Controller('children')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChildrenController {
  constructor(private childrenService: ChildrenService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new child' })
  async create(@Request() req: any, @Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(req.user.id, createChildDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all children for current user' })
  async findAll(@Request() req: any) {
    return this.childrenService.findAllByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific child' })
  async findOne(@Param('id') id: string, @Request() req: any) {
    return this.childrenService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a child' })
  async update(
    @Param('id') id: string,
    @Request() req: any,
    @Body() updateChildDto: UpdateChildDto,
  ) {
    return this.childrenService.update(id, req.user.id, updateChildDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a child' })
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.childrenService.delete(id, req.user.id);
  }
}
