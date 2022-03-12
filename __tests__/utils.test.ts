import { censorWord, censorEmail } from '../src/utils';

describe('utils', () => {
  describe('censorWord', () => {
    it('should return an empty string when passed one', () => {
      expect(censorWord('')).toBe('');
    });

    it('should return a censored word', () => {
      expect(censorWord('username')).toBe('u*******');
    });
  });

  describe('censorEmail', () => {
    it('should return a censored email', () => {
      expect(censorEmail('hello@domain.co.uk')).toBe('h****@d*****.co.uk');
    });
  });
});
