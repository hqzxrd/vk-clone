import { Test, TestingModule } from '@nestjs/testing';
import { ChatEventsGateway } from './chat-events.gateway';
import { ChatEventsService } from './service/chat-events.service';

describe('ChatEventsGateway', () => {
  let gateway: ChatEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatEventsGateway, ChatEventsService],
    }).compile();

    gateway = module.get<ChatEventsGateway>(ChatEventsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
