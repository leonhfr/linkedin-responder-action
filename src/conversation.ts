import * as core from '@actions/core';
import { Conversation, MessageEvent } from 'linkedin-private-api';

import Client from './Client';
import Config from './config';

export const SUBTYPE_INMAIL = 'INMAIL';

export async function getConversations(
  client: Client,
  config: Config
): Promise<Conversation[]> {
  const conversations: Conversation[] = [];

  let i = 1;
  while (conversations.length < config.limit) {
    core.debug(`getConversations: getting page ${i} of conversations`);
    const next = await client.getNextConversations();
    conversations.push(...next);
  }

  const filteredConversations = await filterConversations(
    client,
    config,
    conversations
  );

  core.debug(
    `getConversations: ${filteredConversations.length} conversations to respond to`
  );

  return filteredConversations;
}

export async function filterConversations(
  client: Client,
  config: Config,
  conversations: Conversation[]
): Promise<Conversation[]> {
  const conversationData: ConversationData[] = await Promise.all(
    conversations.map(async (conversation) => {
      const messages = await client.getMessages(conversation.conversationId);
      return { conversation, messages };
    })
  );

  return conversationData
    .filter((data) => filterConversation(config, data))
    .map((data) => data.conversation);
}

export function filterConversation(
  config: Config,
  data: ConversationData
): boolean {
  // Skip if there are more than one message
  if (data.messages.length > 1) {
    return false;
  }

  // Skip if it's not an inmail and we want to only respond to them
  if (config.inmailsOnly && data.messages[0].subtype !== SUBTYPE_INMAIL) {
    return false;
  }

  // Skip if it's older than the limit
  if (data.messages[0].createdAt < config.since) {
    return false;
  }

  return true;
}

export interface ConversationData {
  conversation: Conversation;
  messages: MessageEvent[];
}
