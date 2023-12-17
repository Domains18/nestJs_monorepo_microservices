import ClientEmailTemplate from '@/components/clientemailtemplate';
import { EmailTemplate } from '@/components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Extract necessary information from the request body
    const { name, email, message } = body;

    // Validate the presence of required fields
    if (!name || !email || !message) {
      return new NextResponse("Name, email, and message are required", { status: 400 });
    }

    // Send acknowledgment email directly without storing the result in a variable
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: `Acknowledgment: We received your message ${name}`,
      text: `Thank you for contacting us, ${name} . We have received your message and will get back to you as soon as possible.`,
      react: ClientEmailTemplate({ username: name }),
      
    });

    // Send email to info@sokonike.co.ke with the received message
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: EmailTemplate({ name, email, message }), // You can include additional data in your template
    });

    return NextResponse.json({data}, { headers: corsHeaders });
  } catch (error) {
    console.log("[EMAIL_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
