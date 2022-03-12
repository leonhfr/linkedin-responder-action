import faker from '@faker-js/faker';
import moment from 'moment';

import Config from './config';
import { SUBTYPE_INMAIL } from './conversation';

export function mockConfig(config?: Partial<Config>): Config {
  return {
    username: 'hello@domain.sub.com',
    password: '***',
    text: 'Hello,\n\nThis is a multiline message.\n\nBest',
    inmailsOnly: true,
    since: moment().subtract(60, 'minutes').unix() * 1000,
    limit: 20,
    dryRun: true,
    ...config,
  };
}

export function mockConversation(): any {
  return {
    conversationId: faker.datatype.uuid(),
    participants: [mockParticipant()],
  };
}

export function mockMessage(subtype = SUBTYPE_INMAIL, createdAt?: number): any {
  return {
    subtype,
    createdAt: createdAt ? createdAt : moment().unix() * 1000,
  };
}

export function mockParticipant(): any {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    profileId: faker.datatype.uuid(),
  };
}
