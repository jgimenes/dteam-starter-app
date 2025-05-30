import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './resources/auth/auth.module';
import { EmailModule } from './services/email/email.module';

@Module({
  imports: [AuthModule, PrismaModule, EmailModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
