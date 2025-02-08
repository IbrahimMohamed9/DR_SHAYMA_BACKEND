import { Test, TestingModule } from '@nestjs/testing';
import { UserLoginLocationService } from './user-login-location.service';

describe('UserLoginLocationService', () => {
  let service: UserLoginLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLoginLocationService],
    }).compile();

    service = module.get<UserLoginLocationService>(UserLoginLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
