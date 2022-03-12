import { mockConfig, mockConversation } from '../src/mocks';
import { sendMessages } from '../src/message';
import { getFirstParticipant, getName, getProfileId } from '../src/utils';

describe('message', () => {
  describe('sendMessages', () => {
    it('should send messages', async () => {
      const client: any = { sendMessage: jest.fn(async () => {}) };
      const config = mockConfig({ dryRun: false });
      const conversation = mockConversation();

      const output = await sendMessages(client, config, [conversation]);
      expect(client.sendMessage).toHaveBeenCalledTimes(1);
      expect(client.sendMessage).toHaveBeenCalledWith(
        getProfileId(getFirstParticipant(conversation)),
        config.text
      );
      expect(output).toEqual([getName(getFirstParticipant(conversation))]);
    });

    it('should not send messages when dryRun is true', async () => {
      const client: any = { sendMessage: jest.fn(async () => {}) };
      const config = mockConfig({ dryRun: true });
      const conversation = mockConversation();

      const output = await sendMessages(client, config, [conversation]);
      expect(client.sendMessage).not.toHaveBeenCalled();
      expect(output).toEqual([]);
    });

    it('should return an error', async () => {
      const client: any = {
        sendMessage: jest.fn(async () => {
          throw new Error('test');
        }),
      };
      const config = mockConfig({ dryRun: false });
      const output = await sendMessages(client, config, [mockConversation()]);

      expect(output).toBeInstanceOf(Error);
    });
  });
});
