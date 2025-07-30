// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
    
//     // Validate required fields
//     if (!body.name || !body.email || !body.message) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }
    
//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(body.email)) {
//       return NextResponse.json(
//         { error: 'Invalid email format' },
//         { status: 400 }
//       );
//     }
    
//     // Here you would typically:
//     // 1. Send an email notification
//     // 2. Store the contact request in your database
//     // 3. Or integrate with a CRM
    
//     // Simulate processing delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     return NextResponse.json(
//       { success: true },
//       { status: 200 }
//     );
    
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { ZodError, z } from 'zod';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { validateEmail } from '@/lib/email-utils';
import { logger } from '@/lib/logger';

// Rate limiter configuration (5 requests per minute per IP)
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60, // 1 minute
});

// TypeScript types
type ContactFormData = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: Request) {
  // Set CORS headers if needed
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || '*');
  headers.set('Access-Control-Allow-Methods', 'POST');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Rate limiting check
    const clientIp = request.headers.get('x-forwarded-for') || '127.0.0.1';
    try {
      await rateLimiter.consume(clientIp);
    } catch (rateLimitError) {
      logger.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429, headers }
      );
    }

    // Validate request method
    if (request.method !== 'POST') {
      return NextResponse.json(
        { success: false, message: 'Method not allowed' },
        { status: 405, headers }
      );
    }

    // Parse and validate request body
    const body: ContactFormData = await request.json();

    // Additional email validation
    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address', errors: { email: 'Invalid email format' } },
        { status: 400, headers }
      );
    }

    // Zod validation
    const validatedData = contactSchema.parse(body);

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM, etc.
    // For now, we'll just log and return success

    logger.info(`New contact submission from ${validatedData.email}`);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      { success: true, message: 'Thank you for your message! We will get back to you soon.' },
      { status: 200, headers }
    );

  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      const errors = error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {} as Record<string, string>);

      return NextResponse.json(
        { success: false, message: 'Validation failed', errors },
        { status: 400, headers }
      );
    }

    // Log unexpected errors
    logger.error('Contact form submission error:', error);

    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again later.' },
      { status: 500, headers }
    );
  }
}

// Add OPTIONS method for CORS preflight
export async function OPTIONS() {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || '*');
  headers.set('Access-Control-Allow-Methods', 'POST');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  return new NextResponse(null, {
    status: 204,
    headers
  });
}