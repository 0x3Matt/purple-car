import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { headers } from 'next/headers';

// Add dynamic route configuration
export const dynamic = 'force-dynamic';

// Function to ensure directory exists
async function ensureDirectoryExists(dirPath: string) {
  try {
    await fs.access(dirPath);
  } catch {
    // Directory doesn't exist, create it
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
      throw new Error('Failed to create directory');
    }
  }
}

// Improved email validation
function isValidEmail(email: string): boolean {
  // RFC 5322 compliant email regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    // Validate content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Type check the email field
    if (!body || typeof body.email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required and must be a string' },
        { status: 400 }
      );
    }

    const { email } = body;

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || 'Unknown';
    const ip = headersList.get('x-forwarded-for') || 'Unknown';

    // Create base data directory
    const baseDir = path.join(process.cwd(), 'data');
    await ensureDirectoryExists(baseDir);

    const csvPath = path.join(baseDir, 'waitlist.csv');
    // Escape special characters in CSV
    const escapedEmail = email.replace(/"/g, '""');
    const csvLine = `"${timestamp}","${escapedEmail}","${ip}","${userAgent}"\n`;

    // Create or append to CSV file
    try {
      let fileExists = true;
      try {
        await fs.access(csvPath);
      } catch {
        fileExists = false;
      }

      if (!fileExists) {
        // Create new file with headers
        await fs.writeFile(csvPath, '"Timestamp","Email","IP","UserAgent"\n');
      }

      // Append new entry
      await fs.appendFile(csvPath, csvLine);

      return NextResponse.json(
        { message: 'Successfully joined waitlist!' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error writing to file:', error);
      return NextResponse.json(
        { error: 'Failed to save email to waitlist' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
} 