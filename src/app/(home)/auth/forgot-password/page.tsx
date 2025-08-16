"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { ArrowLeft, Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setError('');
    setIsLoading(true);

    try {
      // TODO: Implement password reset email sending
      // 1. Call API endpoint to trigger password reset email
      // 2. The API should:
      //    - Generate a secure reset token
      //    - Store token in database with expiration (e.g., 1 hour)
      //    - Send email via Nodemailer with reset link
      //    - Reset link format: /auth/reset-password?token=xxx&email=xxx
      
      // Temporary mock implementation
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send reset email');
      }

      // Success - show confirmation message
      setIsSubmitted(true);
      toast.success('Reset email sent!', {
        description: 'Check your inbox for password reset instructions.',
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reset email';
      setError(errorMessage);
      toast.error(errorMessage, {
        description: 'Please try again or contact support.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If email was successfully sent, show confirmation
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="border-border">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
              <CardDescription>
                We've sent password reset instructions to{' '}
                <span className="font-medium text-foreground">{form.getValues('email')}</span>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  If you don't see the email, check your spam folder or make sure you entered the correct email address.
                </AlertDescription>
              </Alert>
              
              <div className="text-sm text-muted-foreground text-center">
                Didn't receive the email?{' '}
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    form.reset();
                  }}
                  className="text-primary hover:underline"
                >
                  Try again
                </button>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <Link href="/auth/sign-in">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Forgot your password?
            </CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="border-destructive/50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* TODO: Add rate limiting information */}
                <p className="text-xs text-muted-foreground">
                  For security reasons, you can only request a password reset once every 5 minutes.
                </p>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending reset email...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send reset email
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="text-muted-foreground">Remember your password?</span>
                  <Link 
                    href="/auth/sign-in" 
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {/* Additional help section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Having trouble?{' '}
            <Link href="/support" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// TODO: Create API endpoint /api/auth/forgot-password
// The endpoint should:
// 1. Validate the email exists in the database
// 2. Generate a secure reset token (crypto.randomBytes or uuid)
// 3. Store token with expiration time (1 hour recommended)
// 4. Send email using Nodemailer with:
//    - From: noreply@yourapp.com
//    - Subject: "Reset your password"
//    - HTML template with reset link
//    - Text alternative for email clients that don't support HTML
// 5. Return success even if email doesn't exist (security best practice)
//
// Example Nodemailer setup:
// ```typescript
// import nodemailer from 'nodemailer';
// 
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: true,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });
//
// const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}&email=${email}`;
// 
// await transporter.sendMail({
//   from: '"Your App" <noreply@yourapp.com>',
//   to: email,
//   subject: 'Reset your password',
//   html: `
//     <h1>Password Reset Request</h1>
//     <p>Click the link below to reset your password:</p>
//     <a href="${resetUrl}">Reset Password</a>
//     <p>This link will expire in 1 hour.</p>
//     <p>If you didn't request this, please ignore this email.</p>
//   `,
//   text: `Reset your password: ${resetUrl}`,
// });
// ```