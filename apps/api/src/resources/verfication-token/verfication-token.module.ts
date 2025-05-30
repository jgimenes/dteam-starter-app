import { Module } from '@nestjs/common';
import { VerficationTokenService } from './verfication-token.service';
import { VerficationTokenController } from './verfication-token.controller';

@Module({
  controllers: [VerficationTokenController],
  providers: [VerficationTokenService],
})
export class VerficationTokenModule {}
