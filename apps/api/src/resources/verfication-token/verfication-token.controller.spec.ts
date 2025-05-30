import { Test, TestingModule } from '@nestjs/testing';
import { VerficationTokenController } from './verfication-token.controller';
import { VerficationTokenService } from './verfication-token.service';

describe('VerficationTokenController', () => {
  let controller: VerficationTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerficationTokenController],
      providers: [VerficationTokenService],
    }).compile();

    controller = module.get<VerficationTokenController>(VerficationTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
