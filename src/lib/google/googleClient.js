// Service account only
import { google } from 'googleapis';

export function getGoogleOAuthClient() {
  // Parse env
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY missing');
  const creds = JSON.parse(raw);

  // JWT auth
  return new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
}
