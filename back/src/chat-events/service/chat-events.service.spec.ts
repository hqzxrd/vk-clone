import { Test, TestingModule } from '@nestjs/testing';
import { ChatEventsService } from './chat-events.service';

describe('ChatEventsService', () => {
  let service: ChatEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatEventsService],
    }).compile();

    service = module.get<ChatEventsService>(ChatEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
