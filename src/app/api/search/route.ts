import { type NextRequest } from 'next/server';
import { MOCK_INVOICE_EXCEPTIONS, type InvoiceException } from '@/lib/data';

// Re-usable CORS headers for common methods
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || ''; // Optional: can be used to filter by exceptionType

  let results: InvoiceException[] = [];

  if (!query) {
    // If query is empty, return the first 5 items
    results = MOCK_INVOICE_EXCEPTIONS.slice(0, 5);
  } else {
    const lowerCaseQuery = query.toLowerCase();
    results = MOCK_INVOICE_EXCEPTIONS.filter((item: InvoiceException) => {
      const matchInvoiceId = item.invoiceId.toLowerCase().includes(lowerCaseQuery);
      const matchVendor = item.vendor.toLowerCase().includes(lowerCaseQuery);
      const matchDescription = item.description.toLowerCase().includes(lowerCaseQuery);
      const matchExceptionType = item.exceptionType.toLowerCase().includes(lowerCaseQuery);

      let typeMatch = true;
      if (type) {
        // If 'type' param is provided, filter by matching exceptionType exactly
        typeMatch = item.exceptionType.toLowerCase() === type.toLowerCase();
      }

      return (matchInvoiceId || matchVendor || matchDescription || matchExceptionType) && typeMatch;
    });

    // Limit to a maximum of 20 results
    results = results.slice(0, 20);
  }

  return new Response(JSON.stringify({
    ok: true,
    data: {
      results: results,
      total: results.length,
      query: query,
    },
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