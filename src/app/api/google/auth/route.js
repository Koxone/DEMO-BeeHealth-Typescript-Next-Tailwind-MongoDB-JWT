import { google } from 'googleapis';

// @route    GET /api/google/auth
// @desc     Test Google Service Account Authentication
// @access   Private
export async function GET() {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n'));

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Prueba simple: obtener la lista de calendarios accesibles
    const res = await calendar.calendarList.list();

    return Response.json({
      success: true,
      calendars: res.data.items?.map((c) => c.summary),
    });
  } catch (err) {
    console.error('Error testing Google Auth:', err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
