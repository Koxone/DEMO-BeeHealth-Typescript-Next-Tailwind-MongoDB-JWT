import { google } from 'googleapis';

// @route    GET /api/google/callback
// @desc     Test Google Calendar Service Account connection
// @access   Private
export async function GET() {
  try {
    // Parse credentials from environment
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n'));

    // Create GoogleAuth with service account credentials
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    // Initialize Calendar API
    const calendar = google.calendar({ version: 'v3', auth });

    // Fetch accessible calendars (to test connection)
    const res = await calendar.calendarList.list();

    return Response.json({
      success: true,
      calendars: res.data.items?.map((c) => c.summary),
    });
  } catch (err) {
    console.error('Error testing calendar:', err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
