import { Client, Conversation, MessageEvent } from 'linkedin-private-api';
import { ConversationScroller } from 'linkedin-private-api/dist/src/scrollers/conversation.scroller';

export default class LinkedInClient {
  private client: Client;
  private conversationScroller: ConversationScroller;

  private constructor(client: Client) {
    this.client = client;
    this.conversationScroller = client.conversation.getConversations();
  }

  static async create(
    username: string,
    password: string
  ): Promise<LinkedInClient> {
    const client = new Client();
    await client.login.userPass({
      username,
      password,
    });
    return new LinkedInClient(client);
  }

  async getNextConversations(): Promise<Conversation[]> {
    return await this.conversationScroller.scrollNext();
  }

  async getMessages(conversationId: string): Promise<MessageEvent[]> {
    return await this.client.message
      .getMessages({ conversationId })
      .scrollNext();
  }

  async sendMessage(profileId: string, text: string): Promise<void> {
    await this.client.message.sendMessage({
      profileId,
      text,
    });
  }
}
