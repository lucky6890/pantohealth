import { Test, TestingModule } from '@nestjs/testing';
import { SignalController } from './signal.controller';
import { SignalService } from './signal.service';

// I implemented one mock scenario for example
describe('SignalController', () => {
  let controller: SignalController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignalController],
      providers: [
        {
          provide: SignalService,
          useValue: {
            // Mock methods that your service or controller interacts with
            getAll: () => {
              return {
                data: [
                  {
                    _id: '689d3dee0ef304bb9d30480e',
                    deviceId: '66bb584d4ae73e488c30a072',
                    time: 1735683480000,
                    dataLength: 1,
                    dataVolume: [
                      [
                        762,
                        [51.339764, 12.339223833333334, 1.2038000000000002],
                      ],
                    ],
                  },
                ],
              };
            },
          },
        },
      ],
    }).compile();
    controller = module.get<SignalController>(SignalController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('retrieved data should has a data[0]._id property', async () => {
      expect(await controller.getAllSignals(1, 1)).toHaveProperty(
        'data[0]._id',
      );
    });
  });
});
