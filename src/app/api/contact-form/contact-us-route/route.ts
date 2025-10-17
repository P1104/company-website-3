import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.verify();

    // Email to company (styled for HR/corporate)
    const companyMailOptions = {
      from: `"Corporate Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New Contact Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="color: #3498db; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
            <h3 style="color: #3498db; margin-top: 0;">Message</h3>
            <p>${message}</p>
          </div>
          
          <div style="margin-top: 30px; font-size: 12px; color: #7f8c8d;">
            <p>This message was received through the corporate contact form.</p>
          </div>
        </div>
      `,
    };

    // Confirmation email to user (matching professional style)
    const userMailOptions = {
      from: `"EQUILIBRATE AI" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `We've received your message`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Message Received</h1>
          
          <p style="font-size: 16px;"><strong>Dear ${name},</strong></p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
            <p style="margin: 0;">Thank you for contacting us. We've received your message and will respond within 24-48 hours.</p>
          </div>
          
          <p>For reference, here's what you submitted:</p>
          <blockquote style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
            ${message}
          </blockquote>
          
          <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee;">
            <p style="margin-bottom: 5px;">Best regards,</p>
            <p style="margin-top: 0; font-weight: bold;">EQUILIBRATE AI, TEAM</p>
            <p style="margin: 0; font-size: 12px; color: #7f8c8d;">This is an automated message - please do not reply directly to this email.</p>
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error sending email:', error.message);
    } else {
      console.error('Error sending email:', error);
    }
    return NextResponse.json(
      { message: 'Failed to send message' },
      { status: 500 }
    );
  }
}