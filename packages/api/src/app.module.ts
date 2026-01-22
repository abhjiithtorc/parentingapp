import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ChildrenModule } from './modules/children/children.module';
import { MilestonesModule } from './modules/milestones/milestones.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { ContentModule } from './modules/content/content.module';
import { PrismaModule } from './common/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ChildrenModule,
    MilestonesModule,
    TrackingModule,
    ContentModule,
  ],
})
export class AppModule {}
