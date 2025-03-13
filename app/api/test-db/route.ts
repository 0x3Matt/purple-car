import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from('waitlist')
      .select('created_at')
      .limit(1);

    if (connectionError) {
      console.error('Connection test failed:', connectionError);
      return NextResponse.json({
        status: 'error',
        message: 'Database connection failed',
        error: connectionError.message,
        details: {
          code: connectionError.code,
          hint: connectionError.hint,
          details: connectionError.details
        }
      }, { status: 500 });
    }

    // Test count query
    const { count, error: countError } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Count query failed:', countError);
      return NextResponse.json({
        status: 'error',
        message: 'Count query failed',
        error: countError.message,
        details: {
          code: countError.code,
          hint: countError.hint,
          details: countError.details
        }
      }, { status: 500 });
    }

    console.log('Database connection successful');
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      details: {
        count,
        hasRecords: connectionTest !== null,
        url: supabase.supabaseUrl,
        timestamp: new Date().toISOString()
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Test endpoint failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 