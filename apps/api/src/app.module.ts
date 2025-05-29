import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './resources/auth/auth.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
