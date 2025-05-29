import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './resources/auth/auth.service';

@Module({
  imports: [PrismaModule],
  providers: [PrismaService, AuthService],
})
export class AppModule {}
