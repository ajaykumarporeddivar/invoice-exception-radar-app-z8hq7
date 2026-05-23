import { type NextRequest } from 'next/server';
import { MOCK_INVOICE_EXCEPTIONS, MOCK_ANALYTICS_STATS } from '@/lib/data';

// Re-usable CORS headers for common methods
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(): Promise<Response> {
  return new Response(JSON.stringify({
    ok: true,
    data: {
      invoiceExceptions: MOCK_INVOICE_EXCEPTIONS,
      stats: MOCK_ANALYTICS_STATS,
    },
    total: MOCK_INVOICE_EXCEPTIONS.length,
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

export async function POST(request: NextRequest): Promise<Response> {
  let receivedBody: unknown;
  try {
    receivedBody = await request.json();
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, message: 'Invalid JSON body' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  return new Response(JSON.stringify({
    ok: true,
    message: 'Demo mode — data not persisted',
    received: receivedBody,
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}