import * as core from '@actions/core';
import { Conversation } from 'linkedin-private-api';

import Client from './Client';
import Config from './config';
import { getFirstParticipant, getProfileId, getName } from './utils';

export async function sendMessages(
  client: Client,
  config: Config,
  conversations: Conversation[]
) {
  const sent: string[] = [];
  try {
    for (const conversation of conversations) {
      const participant = getFirstParticipant(conversation);
      const name = getName(participant);
      const profileId = getProfileId(participant);

      core.debug(`sendMessage: sending message to ${name}`);

      if (!config.dryRun) {
        await client.sendMessage(profileId, config.text);
        sent.push(name);
      }
    }
    return sent;
  } catch (err: any) {
    return err as Error;
  }
}
