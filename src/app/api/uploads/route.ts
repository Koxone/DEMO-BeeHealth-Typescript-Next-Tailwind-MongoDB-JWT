import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filenameParam = searchParams.get('filename');

    if (!filenameParam) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    // Read file data from the request
    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Optimize image using Sharp
    const optimizedBuffer = await sharp(buffer)
      .webp({ quality: 80 }) // Quality 0-100
      .toBuffer();

    // Change extension to .webp
    const filename = filenameParam.replace(/\.\w+$/, '.webp');

    // Upload to Vercel Blob
    const blob = await put(filename, optimizedBuffer, { access: 'public' });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
