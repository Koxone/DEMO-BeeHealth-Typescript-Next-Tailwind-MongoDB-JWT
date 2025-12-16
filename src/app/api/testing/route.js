import { NextResponse } from 'next/server';

/* =========================================================
   1. BASIC ENDPOINT - Return all users
   ========================================================= */
// export async function GET() {
//   try {
//     // Fetch all users
//     const res = await fetch('https://jsonplaceholder.typicode.com/users');
//     const data = await res.json();

//     // Return full response
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error in Server' });
//   }
// }

/* =========================================================
   2. MAP - Return only user names
   ========================================================= */
// export async function GET(){
//   try {
//     const res = await fetch('https://jsonplaceholder.typicode.com/users');
//     const data = await res.json();

//     // Get only names
//     const names = data.map((user) => user.name);

//     return NextResponse.json(names);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error in Server' });
//   }
// }

/* =========================================================
   3. MAP - Return only name and email from each user
   ========================================================= */
// export async function GET(){
//   try {
//     const res = await fetch('https://jsonplaceholder.typicode.com/users');
//     const data = await res.json();

//     // Get name and email only
//     const basic = data.map((user) => ({ name: user.name, email: user.email }));

//     return NextResponse.json(basic);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error in Server' });
//   }
// }

/* =========================================================
   4. FILTER - Return users with ID greater than 5
   ========================================================= */
// export async function GET(){
//   try {
//     const res = await fetch('https://jsonplaceholder.typicode.com/users');
//     const data = await res.json();

//     // Filter by ID > 5
//     const filtered = data.filter((user) => user.id > 5);

//     return NextResponse.json(filtered);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error in Server' });
//   }
// }

/* =========================================================
   5. FIND - Return single user with ID equal to 3
   ========================================================= */
export async function GET() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();

    // Find specific user
    const userFound = data.find((user) => user.id === 8);

    return NextResponse.json(userFound);
  } catch (error) {
    return NextResponse.json({ error: 'Error in Server' });
  }
}

/* =========================================================
   6. PAGINATION - Basic pagination with page and limit
   http://localhost:3000/api/testing?page=1&limit=3
   ========================================================= */
// export async function GET(req) {
//   try {
//     const res = await fetch('https://jsonplaceholder.typicode.com/users');
//     const data = await res.json();

//     // Get query params
//     const { searchParams } = new URL(req.url);
//     const page = Number(searchParams.get('page')) || 1;
//     const limit = Number(searchParams.get('limit')) || 3;

//     // Pagination calculation
//     const start = (page - 1) * limit;
//     const end = start + limit;
//     const paginated = data.slice(start, end);

//     // Return paginated data
//     return NextResponse.json({
//       page,
//       limit,
//       total: data.length,
//       totalPages: Math.ceil(data.length / limit),
//       results: paginated,
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error, message: 'Error in Server' });
//   }
// }

/* =========================================================
   7. PAGINATION + VALIDATION - Reject invalid params
   http://localhost:3000/api/testing?page=o(1&limit=3
   ========================================================= */
// export async function GET(req){
//   try {
//     const res = await fetch('https://jsonplaceholder.typicode.com/users');
//     const data = await res.json();

//     const { searchParams } = new URL(req.url);
//     const page = Number(searchParams.get('page'));
//     const limit = Number(searchParams.get('limit'));

//     // Validate params
//     if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
//       return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
//     }

//     const start = (page - 1) * limit;
//     const end = start + limit;
//     const paginated = data.slice(start, end);

//     return NextResponse.json({
//       page,
//       limit,
//       total: data.length,
//       totalPages: Math.ceil(data.length / limit),
//       results: paginated,
//     });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error in Server' });
//   }
// }

/* =========================================================
   8. COMBINED - Filter + Pagination (minId, page, limit)
   http://localhost:3000/api/testing?page=1&limit=3&minId=4
   ========================================================= */
// export async function GET(req) {
//   try {
//     const res = await fetch('https://jsonplaceholder.typicode.com/users');
//     const data = await res.json();

//     // Get query params
//     const { searchParams } = new URL(req.url);
//     const page = Number(searchParams.get('page')) || 1;
//     const limit = Number(searchParams.get('limit')) || 3;
//     const minId = Number(searchParams.get('minId')) || 0;

//     // Apply filter first
//     const filteredData = data.filter((user) => user.id > minId);

//     // Apply pagination after filter
//     const start = (page - 1) * limit;
//     const end = start + limit;
//     const paginated = filteredData.slice(start, end);

//     // Return final response
//     return NextResponse.json({
//       page,
//       limit,
//       minId,
//       total: filteredData.length,
//       totalPages: Math.ceil(filteredData.length / limit),
//       results: paginated,
//     });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error in Server' });
//   }
// }

export async function POST(req) {
  try {
    const { title, body, userId } = await req.json();
    if (!title || !body || !userId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const externalRes = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { ContentType: 'application/json' },
      body: JSON.stringify({ title, body, userId }),
    });

    const data = await externalRes.json();

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON or server error' }, { status: 400 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
  } catch (error) {}
}
