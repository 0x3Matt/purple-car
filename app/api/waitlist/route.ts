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

// Function to get location data from IP
async function getLocationFromIP(ip: string) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    if (data.status === 'success') {
      return {
        country: data.country || 'Unknown',
        region: data.regionName || 'Unknown',
        city: data.city || 'Unknown'
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
}

function parseUserAgent(userAgent: string): string {
  try {
    // Extract the main browser and OS info
    const matches = userAgent.match(/(Chrome|Firefox|Safari|Edge|MSIE|Opera)\/[\d.]+|Windows NT [\d.]+|Mac OS X [\d._]+|Linux/g);
    return matches ? matches[0] : userAgent.split(' ')[0];
  } catch {
    return 'Unknown';
  }
}

// Function to check if email exists in CSV
async function checkEmailExists(csvPath: string, email: string): Promise<boolean> {
  try {
    const fileExists = await fs.access(csvPath).then(() => true).catch(() => false);
    if (!fileExists) return false;

    const content = await fs.readFile(csvPath, 'utf-8');
    const lines = content.split('\n');
    // Skip header and check each line
    return lines.slice(1).some(line => {
      const columns = line.split(',');
      if (columns.length >= 2) {
        const csvEmail = columns[1].replace(/"/g, ''); // Remove quotes
        return csvEmail.toLowerCase() === email.toLowerCase();
      }
      return false;
    });
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
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
        { error: 'Invalid email format', type: 'error' },
        { status: 400 }
      );
    }

    // Create base data directory and ensure it exists
    const baseDir = path.join(process.cwd(), 'data');
    await ensureDirectoryExists(baseDir);
    const csvPath = path.join(baseDir, 'waitlist.csv');

    // Check if email already exists
    const emailExists = await checkEmailExists(csvPath, email);
    if (emailExists) {
      return NextResponse.json(
        { error: 'This email is already on our waitlist!', type: 'info' },
        { status: 409 }
      );
    }

    const timestamp = new Date().toISOString();
    const headersList = headers();
    const userAgent = parseUserAgent(headersList.get('user-agent') || 'Unknown');
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'Unknown';

    // Get location data from IP
    const ipLocation = await getLocationFromIP(ip);

    // Escape special characters in CSV
    const escapedEmail = email.replace(/"/g, '""');
    
    // Create CSV line with location data
    const locationData = ipLocation ? 
      `"${ipLocation.country}","${ipLocation.region}","${ipLocation.city}"` :
      '"Unknown","Unknown","Unknown"';

    // Reorder columns: Timestamp, Email, Location info, IP, UserAgent
    const csvLine = `"${timestamp}","${escapedEmail}",${locationData},"${ip}","${userAgent}"\n`;

    // Create or append to CSV file
    try {
      let fileExists = true;
      try {
        await fs.access(csvPath);
      } catch {
        fileExists = false;
      }

      if (!fileExists) {
        // Headers in the same order as the data
        await fs.writeFile(csvPath, 
          '"Timestamp","Email","Country","Region","City","IP","Browser"\n'
        );
      }

      // Append new entry
      await fs.appendFile(csvPath, csvLine);

      return NextResponse.json(
        { message: 'Successfully joined waitlist!', type: 'success' },
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
      { error: 'Invalid request format', type: 'error' },
      { status: 400 }
    );
  }
} 