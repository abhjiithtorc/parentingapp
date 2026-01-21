import { Module } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { ChildrenModule } from '../children/children.module';

@Module({
  imports: [ChildrenModule],
  controllers: [TrackingController],
  providers: [TrackingService],
  exports: [TrackingService],
})
export class TrackingModule {}
