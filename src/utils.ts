import { Conversation, MiniProfile } from 'linkedin-private-api';

export function getFirstParticipant(conversation: Conversation): MiniProfile {
  return conversation.participants[0];
}

export function getProfileId(miniProfile: MiniProfile): string {
  return miniProfile.profileId;
}

export function getName(miniProfile: MiniProfile): string {
  return `${miniProfile.firstName} ${miniProfile.lastName}`;
}

export function censorWord(word: string): string {
  if (word.length === 0) {
    return word;
  }
  return word[0] + '*'.repeat(word.length - 1);
}

export function censorEmail(email: string): string {
  const [username, domain] = email.split('@');
  const [subdomain, ...tlds] = domain.split('.');
  return (
    censorWord(username) + '@' + censorWord(subdomain) + '.' + tlds.join('.')
  );
}
