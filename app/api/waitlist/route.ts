import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { supabase } from '@/utils/supabase';

// Add dynamic route configuration
export const dynamic = 'force-dynamic';

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

// Function to check if email exists in Supabase
async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const { data } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();
    
    return !!data;
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
        { error: 'Content-Type must be application/json', type: 'error' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Type check the email field
    if (!body || typeof body.email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required and must be a string', type: 'error' },
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

    // Check if email already exists
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return NextResponse.json(
        { error: 'This email is already on our waitlist!', type: 'info' },
        { status: 409 }
      );
    }

    const timestamp = new Date().toISOString();
    const headersList = await headers();
    const userAgent = parseUserAgent(headersList.get('user-agent') || 'Unknown');
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'Unknown';

    // Get location data from IP
    const ipLocation = await getLocationFromIP(ip);

    // Save to Supabase
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            email: email.toLowerCase(),
            timestamp,
            ip,
            user_agent: userAgent,
            country: ipLocation?.country || 'Unknown',
            region: ipLocation?.region || 'Unknown',
            city: ipLocation?.city || 'Unknown'
          }
        ]);

      if (error) throw error;

      return NextResponse.json(
        { message: 'Successfully joined waitlist!', type: 'success' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error saving to database:', error);
      return NextResponse.json(
        { error: 'Failed to save email to waitlist', type: 'error' },
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