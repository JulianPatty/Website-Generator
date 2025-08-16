"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { twoFactor } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertCircle, Key } from "lucide-react";

export default function TwoFactorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  
  const [code, setCode] = useState("");
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await twoFactor.verifyTOTP({ // TODO Verify OTP Page 
        code: code,
        type: useBackupCode ? "backup-code" : "totp"
      });

      if (response.data) {
        // Successful verification
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setLoading(true);

    try {
      // If using email/SMS OTP, you might have a resend function
      // For TOTP, this doesn't apply
      setError("Please check your authenticator app for the current code");
    } catch (err) {
      setError("Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Card className="border-border">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-center">
              Two-Factor Authentication
            </CardTitle>
            <CardDescription className="text-center">
              {useBackupCode 
                ? "Enter one of your backup codes to continue"
                : "Enter the 6-digit code from your authenticator app"
              }
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleVerify}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="border-destructive/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="code">
                  {useBackupCode ? "Backup Code" : "Verification Code"}
                </Label>
                <Input
                  id="code"
                  type="text"
                  placeholder={useBackupCode ? "Enter backup code" : "000000"}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  disabled={loading}
                  className="text-center text-lg tracking-widest"
                  maxLength={useBackupCode ? 20 : 6}
                  autoComplete="one-time-code"
                  autoFocus
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading || !code}
              >
                {loading ? "Verifying..." : "Verify"}
              </Button>

              <div className="flex flex-col space-y-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setUseBackupCode(!useBackupCode);
                    setCode("");
                    setError("");
                  }}
                  className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4"
                >
                  {useBackupCode ? (
                    <>Use authenticator app instead</>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <Key className="h-3 w-3" />
                      Use backup code instead
                    </span>
                  )}
                </button>

                {!useBackupCode && (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={loading}
                    className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4"
                  >
                    Having trouble?
                  </button>
                )}
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}