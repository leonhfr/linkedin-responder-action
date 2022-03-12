import * as core from '@actions/core';
import * as EmailValidator from 'email-validator';
import moment from 'moment';

import { readFile } from './readfile';

/**
 * Config represents the action configuration
 */
export default interface Config {
  /**
   * LinkedIn username (email)
   */
  username: string;
  /**
   * LinkedIn password
   */
  password: string;
  /**
   * Text of message to send
   */
  text: string;
  /**
   * Only respond to inmails
   */
  inmailsOnly: boolean;
  /**
   * Only respond to new conversations started since timestamp in milliseconds
   */
  since: number;
  /**
   * Only process latest N conversations
   */
  limit: number;
  /**
   * Only log actions, do not actually respond to messages
   */
  dryRun: boolean;
}

/**
 * Build the action configuration.
 * @returns either a Config object or an Error
 */
export function newConfig(): Config | Error {
  const username = core.getInput('username');
  if (username === '') {
    return new Error('username is required');
  } else if (!EmailValidator.validate(username)) {
    return new Error('username should be an email');
  }
  const password = core.getInput('password');
  if (password === '') {
    return new Error('password is required');
  }

  const message = core.getInput('message');
  const path = core.getInput('path');
  const maybeText = getText(message, path);
  if (maybeText instanceof Error) {
    return maybeText;
  }

  const trim = core.getBooleanInput('trim');
  const inmailsOnly = core.getBooleanInput('inmailsOnly');
  const since = parseInt(core.getInput('since')) || 60;
  const limit = parseInt(core.getInput('limit')) || 20;
  const dryRun = core.getBooleanInput('dryRun');

  return {
    username,
    password,
    text: trim ? maybeText.trim() : maybeText,
    inmailsOnly,
    since: getSinceTimestamp(since),
    limit,
    dryRun,
  };
}

/**
 * Get the text to respond with.
 * @param message optional inline message text
 * @param path optional path to the message file
 * @returns either the message text or an error
 */
function getText(message: string, path: string): string | Error {
  if (message !== '') {
    return message;
  } else if (path !== '') {
    return readFile(path);
  } else {
    return new Error('one of message or path should be given');
  }
}

/**
 * Get the maximum timestamp of messages we want to respond to.
 * @param since number of minutes
 * @returns timestamp since epoch in milliseconds
 */
function getSinceTimestamp(since: number): number {
  return moment().subtract(since, 'minutes').unix() * 1000;
}
