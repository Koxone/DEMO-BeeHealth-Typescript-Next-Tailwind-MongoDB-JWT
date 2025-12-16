// List events (service account)
import { google } from 'googleapis';
import { getGoogleOAuthClient } from '@/lib/google/googleClient';

export async function GET(req) {
  try {
    // Params
    const { searchParams } = new URL(req.url);
    const specialty = searchParams.get('specialty') || 'weight';

    // Auth
    const auth = getGoogleOAuthClient(); // JWT from GOOGLE_SERVICE_ACCOUNT_KEY
    const calendar = google.calendar({ version: 'v3', auth });

    // Calendar id
    const calendarId =
      specialty === 'weight'
        ? process.env.GOOGLE_CALENDAR_ID_WEIGHT
        : process.env.GOOGLE_CALENDAR_ID_DENTAL;

    // Time window
    const now = new Date();
    const in30d = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Fetch
    const { data } = await calendar.events.list({
      calendarId,
      timeMin: now.toISOString(),
      timeMax: in30d.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 50,
    });

    // Ok
    return Response.json({ success: true, events: data.items || [] });
  } catch (error) {
    // Fail
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
