import * as core from '@actions/core';

import Client from './Client';
import { newConfig } from './config';
import { getConversations } from './conversation';
import { sendMessages } from './message';
import { censorEmail } from './utils';

async function run(): Promise<void> {
  try {
    const config = newConfig();
    if (config instanceof Error) {
      core.debug(`could not build configuration`);
      throw config;
    }
    core.debug(
      `config ${JSON.stringify({
        ...config,
        username: censorEmail(config.username),
        password: '***',
      })}`
    );

    core.debug(`connecting to LinkedIn`);
    const client = await Client.create(config.username, config.password);
    const conversations = await getConversations(client, config);
    const sent = await sendMessages(client, config, conversations);

    core.setOutput('sent', sent);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
