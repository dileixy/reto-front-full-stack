/**
 * @format
 */
import { SUPABASE_URL } from '@env';

describe('env mock', () => {
  it('should return the mocked SUPABASE_URL', () => {
    expect(SUPABASE_URL).toBe('https://mock.supabase.co');
  });
});