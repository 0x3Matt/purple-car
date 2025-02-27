import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { headers } from 'next/headers';

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
      throw new Error(`Failed to create directory: ${dirPath}`);
    }
  }
}

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

    // Create base data directory
    const baseDir = path.join(process.cwd(), 'data');
    await ensureDirectoryExists(baseDir);

    const csvPath = path.join(baseDir, 'waitlist.csv');
    const csvLine = `"${timestamp}","${email}","${ip}","${userAgent}"\n`;

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
      throw new Error(`Failed to write to CSV file: ${error.message}`);
    }
  } catch (error) {
    console.error('Error saving email:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save email' },
      { status: 500 }
    );
  }
} 