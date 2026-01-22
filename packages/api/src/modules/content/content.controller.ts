import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get('tip-of-the-day')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get tip of the day for child age' })
  @ApiQuery({ name: 'ageMonths', required: true, example: 12 })
  async getTipOfTheDay(@Query('ageMonths') ageMonths: number) {
    return this.contentService.getTipOfTheDay(ageMonths);
  }

  @Get('tips')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get tips for child age' })
  @ApiQuery({ name: 'ageMonths', required: true, example: 12 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getTips(
    @Query('ageMonths') ageMonths: number,
    @Query('limit') limit?: number,
  ) {
    return this.contentService.getTipsForAge(ageMonths, limit);
  }

  @Get('articles')
  @ApiOperation({ summary: 'Get articles' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'ageMonths', required: false, example: 12 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getArticles(
    @Query('category') category?: string,
    @Query('ageMonths') ageMonths?: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.contentService.getArticles(category, ageMonths, page, limit);
  }

  @Get('articles/:slug')
  @ApiOperation({ summary: 'Get article by slug' })
  async getArticleBySlug(@Param('slug') slug: string) {
    return this.contentService.getArticleBySlug(slug);
  }
}
