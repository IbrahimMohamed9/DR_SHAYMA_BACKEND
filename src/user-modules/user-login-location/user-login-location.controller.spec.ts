import { Test, TestingModule } from '@nestjs/testing';
import { UserLoginLocationController } from './user-login-location.controller';
import { UserLoginLocationService } from './user-login-location.service';

describe('UserLoginLocationController', () => {
  let controller: UserLoginLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLoginLocationController],
      providers: [UserLoginLocationService],
    }).compile();

    controller = module.get<UserLoginLocationController>(UserLoginLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
