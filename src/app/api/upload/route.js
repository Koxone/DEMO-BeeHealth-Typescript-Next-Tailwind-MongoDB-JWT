import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filenameParam = searchParams.get('filename');

    if (!filenameParam) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    // Leer el body como ArrayBuffer
    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convertir a WebP y comprimir
    const optimizedBuffer = await sharp(buffer)
      .webp({ quality: 80 }) // Calidad 0-100
      .toBuffer();

    // Cambiar extensión a .webp
    const filename = filenameParam.replace(/\.\w+$/, '.webp');

    // Subir a Vercel Blob
    const blob = await put(filename, optimizedBuffer, { access: 'public' });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
