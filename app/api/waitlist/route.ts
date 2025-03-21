import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { supabase } from '@/utils/supabase';

// Add dynamic route configuration
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// Add CORS preflight handler
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Improved email validation
function isValidEmail(email: string): boolean {
  // RFC 5322 compliant email regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

// Function to get location data from IP - made optional
async function getLocationFromIP(ip: string) {
  if (!ip || ip === 'Unknown') return null;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
    
    const response = await fetch(`https://ip-api.com/json/${ip}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) return null;
    
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
  if (!userAgent) return 'Unknown';
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
  if (!email) return false;
  
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();
    
    if (error) {
      console.error('Error checking email:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
}

export async function POST(request: Request) {
  // Add CORS headers to the response
  const response = await handlePostRequest(request);
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

// Move the main logic to a separate function
async function handlePostRequest(request: Request) {
  try {
    // Validate content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid content type:', contentType);
      return NextResponse.json(
        { error: 'Content-Type must be application/json', type: 'error' },
        { status: 400 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error('Failed to parse request body:', e);
      return NextResponse.json(
        { error: 'Invalid JSON in request body', type: 'error' },
        { status: 400 }
      );
    }
    
    // Type check the email field
    if (!body || typeof body.email !== 'string') {
      console.error('Invalid email in body:', body);
      return NextResponse.json(
        { error: 'Email is required and must be a string', type: 'error' },
        { status: 400 }
      );
    }

    const { email } = body;

    // Validate email format
    if (!isValidEmail(email)) {
      console.error('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email format', type: 'error' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      console.log('Email already exists:', email);
      return NextResponse.json(
        { error: 'This email is already on our waitlist!', type: 'info' },
        { status: 409 }
      );
    }

    const timestamp = new Date().toISOString();
    console.log('Getting headers...');
    const headersList = await headers();
    console.log('Headers received');
    
    const userAgent = parseUserAgent(headersList.get('user-agent') || 'Unknown');
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'Unknown';
    console.log('Parsed headers:', { userAgent, ip });

    // Get location data from IP (with timeout)
    console.log('Getting location data...');
    const ipLocation = await getLocationFromIP(ip);
    console.log('Location data:', ipLocation);

    // Save to Supabase
    try {
      console.log('Saving to Supabase...');
      const { error: insertError } = await supabase
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

      if (insertError) {
        console.error('Database insert error:', insertError);
        throw insertError;
      }

      console.log('Successfully saved email:', email);
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