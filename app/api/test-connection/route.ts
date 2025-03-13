import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET() {
  try {
    // First test a simple connection
    const { data: testData, error: testError } = await supabase
      .from('waitlist')
      .select('*')
      .limit(1);

    if (testError) {
      console.error('Test query error:', testError);
      return NextResponse.json({
        status: 'error',
        message: 'Database connection test failed',
        error: testError.message,
        details: testError
      }, { status: 500 });
    }

    // If connection successful, get the count
    const { count, error: countError } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact' });

    if (countError) {
      console.error('Count query error:', countError);
      return NextResponse.json({
        status: 'error',
        message: 'Failed to get count',
        error: countError.message,
        details: countError
      }, { status: 500 });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Successfully connected to Supabase',
      count: count || 0,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to connect to database',
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error
      },
      { status: 500 }
    );
  }
} 