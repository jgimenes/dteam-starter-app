import { Test, TestingModule } from '@nestjs/testing';
import { VerficationTokenService } from './verfication-token.service';

describe('VerficationTokenService', () => {
  let service: VerficationTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerficationTokenService],
    }).compile();

    service = module.get<VerficationTokenService>(VerficationTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
