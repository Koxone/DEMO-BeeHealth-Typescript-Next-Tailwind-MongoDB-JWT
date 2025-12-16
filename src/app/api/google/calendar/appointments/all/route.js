import { google } from 'googleapis';
import { getGoogleOAuthClient } from '@/lib/google/googleClient';

// @route    GET /api/google/calendar/appointments/all
// @desc     Get all appointments from all specialties (service account)
// @access   Private
export async function GET() {
  try {
    // Auth: service account JWT
    const auth = getGoogleOAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });

    // Time range for next 30 days (Mexico time)
    const now = new Date();
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    const end = new Date(now);
    end.setDate(now.getDate() + 30);
    end.setHours(23, 59, 59, 999);

    // Fetch from both calendars
    const [weightRes, dentalRes] = await Promise.all([
      calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID_WEIGHT,
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: 'America/Mexico_City',
        maxResults: 100,
      }),
      calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID_DENTAL,
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: 'America/Mexico_City',
        maxResults: 100,
      }),
    ]);

    // Return merged results
    return Response.json({
      success: true,
      weightEvents: weightRes.data.items || [],
      dentalEvents: dentalRes.data.items || [],
    });
  } catch (error) {
    console.error('Error listing events:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
