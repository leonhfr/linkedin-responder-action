import moment from 'moment';

import { mockConfig, mockConversation, mockMessage } from '../src/mocks';
import {
  filterConversation,
  ConversationData,
  SUBTYPE_INMAIL,
} from '../src/conversation';

describe('conservation', () => {
  describe('filterConversation', () => {
    it('should return false if there are more than one message', () => {
      const config = mockConfig();
      const data: ConversationData = {
        conversation: mockConversation(),
        messages: [mockMessage(), mockMessage()],
      };
      const result = filterConversation(config, data);
      expect(result).toBe(false);
    });

    it("should return false if it's not an inmail", () => {
      const config = mockConfig();
      const data: ConversationData = {
        conversation: mockConversation(),
        messages: [mockMessage('FOO')],
      };
      const result = filterConversation(config, data);
      expect(result).toBe(false);
    });

    it('should return false if the message is older than the limit', () => {
      const config = mockConfig();
      const data: ConversationData = {
        conversation: mockConversation(),
        messages: [
          mockMessage(
            SUBTYPE_INMAIL,
            moment().subtract(100, 'minutes').unix() * 1000
          ),
        ],
      };
      const result = filterConversation(config, data);
      expect(result).toBe(false);
    });

    it('should return true', () => {
      const config = mockConfig();
      const data: ConversationData = {
        conversation: mockConversation(),
        messages: [mockMessage()],
      };
      const result = filterConversation(config, data);
      expect(result).toBe(true);
    });
  });
});
