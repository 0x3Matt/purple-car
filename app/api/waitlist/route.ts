import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || 'Unknown';
    const ip = headersList.get('x-forwarded-for') || 'Unknown';

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });

    // Append to CSV file
    const csvPath = path.join(dataDir, 'waitlist.csv');
    const csvLine = `"${timestamp}","${email}","${ip}","${userAgent}"\n`;

    // Create file with headers if it doesn't exist
    try {
      await fs.access(csvPath);
    } catch {
      await fs.writeFile(csvPath, '"Timestamp","Email","IP","UserAgent"\n');
    }

    await fs.appendFile(csvPath, csvLine);

    return NextResponse.json(
      { message: 'Successfully joined waitlist!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving email:', error);
    return NextResponse.json(
      { error: 'Failed to save email' },
      { status: 500 }
    );
  }
} 