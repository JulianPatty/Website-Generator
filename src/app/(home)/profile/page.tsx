"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { getSession, signOut, updateUser } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Settings, 
  LogOut, 
  Key,
  Smartphone,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Copy,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { format } from "date-fns";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [sessionData, setSessionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSessionDetails, setShowSessionDetails] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/sign-in");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    fetchSessionData();
  }, [user]);

  const fetchSessionData = async () => {
    try {
      const session = await getSession();
      setSessionData(session);
    } catch (error) {
      console.error("Failed to fetch session:", error);
      toast.error("Failed to load session data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      toast.loading("Signing you out...");
      await signOut();
      toast.dismiss();
      toast.success("Signed out successfully");
      router.push("/");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to sign out");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || user.email?.[0]?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Column - User Info Card */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                  <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                </Avatar>
                <CardTitle>{user.name || "User"}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">User ID</span>
                    <button
                      onClick={() => copyToClipboard(user.id, "User ID")}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <span className="font-mono text-xs">{user.id.slice(0, 8)}...</span>
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Email Verified</span>
                    {user.emailVerified ? (
                      <Badge variant="default" className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <XCircle className="h-3 w-3" />
                        Unverified
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Account Created</span>
                    <span className="text-xs">
                      {user.createdAt ? format(new Date(user.createdAt), "MMM d, yyyy") : "N/A"}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Link href="/settings">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Account Settings
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing & Plans
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tabs */}
          <div className="md:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="session">Session</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Your profile details and account status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-sm text-muted-foreground">Full Name</Label>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{user.name || "Not set"}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <Label className="text-sm text-muted-foreground">Email Address</Label>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm text-muted-foreground">Phone</Label>
                        <div className="flex items-center gap-2">
                          {/* <Smartphone className="h-4 w-4 text-muted-foreground" />
                          <span>{user.phone || "Not set"}</span> */}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm text-muted-foreground">Member Since</Label>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {user.createdAt ? format(new Date(user.createdAt), "MMMM yyyy") : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-3">Account Activity</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {sessionData?.session?.expiresAt ? "Active" : "Inactive"}
                          </div>
                          <div className="text-xs text-muted-foreground">Session Status</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {user.emailVerified ? "Verified" : "Pending"}
                          </div>
                          <div className="text-xs text-muted-foreground">Email Status</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">Free</div>
                          <div className="text-xs text-muted-foreground">Plan Type</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/settings" className="w-full">
                      <Button className="w-full">
                        Edit Profile
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security and authentication methods</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        Your account is protected with email and password authentication.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Key className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Password</div>
                            <div className="text-sm text-muted-foreground">Last changed: Never</div>
                          </div>
                        </div>
                        <Link href="/auth/change-password">
                          <Button variant="outline" size="sm">Change</Button>
                        </Link>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Two-Factor Authentication</div>
                            <div className="text-sm text-muted-foreground">Not enabled</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" disabled>
                          Setup
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Passkeys</div>
                            <div className="text-sm text-muted-foreground">Secure passwordless sign-in</div>
                          </div>
                        </div>
                        <Link href="/settings">
                          <Button variant="outline" size="sm">Manage</Button>
                        </Link>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-3">Connected Accounts</h4>
                      <div className="space-y-2">
                        {sessionData?.session?.user?.accounts?.map((account: any) => (
                          <div key={account.id} className="flex items-center justify-between p-2 border rounded">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{account.provider}</Badge>
                              <span className="text-sm text-muted-foreground">
                                Connected on {format(new Date(account.createdAt), "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>
                        )) || (
                          <p className="text-sm text-muted-foreground">No connected accounts</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Session Tab */}
              <TabsContent value="session" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Session Information</CardTitle>
                    <CardDescription>Current session details and raw data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {sessionData?.session ? (
                      <>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-1">
                            <Label className="text-sm text-muted-foreground">Session ID</Label>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs">
                                {sessionData.session.id?.slice(0, 16)}...
                              </span>
                              <button
                                onClick={() => copyToClipboard(sessionData.session.id, "Session ID")}
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-sm text-muted-foreground">Expires At</Label>
                            <span className="text-sm">
                              {sessionData.session.expiresAt 
                                ? format(new Date(sessionData.session.expiresAt), "PPpp")
                                : "N/A"}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-sm text-muted-foreground">Created At</Label>
                            <span className="text-sm">
                              {sessionData.session.createdAt
                                ? format(new Date(sessionData.session.createdAt), "PPpp")
                                : "N/A"}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-sm text-muted-foreground">IP Address</Label>
                            <span className="text-sm font-mono">
                              {sessionData.session.ipAddress || "Unknown"}
                            </span>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium">Raw Session Data</h4>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowSessionDetails(!showSessionDetails)}
                            >
                              {showSessionDetails ? "Hide" : "Show"} Details
                            </Button>
                          </div>
                          
                          {showSessionDetails && (
                            <pre className="p-4 bg-muted rounded-lg overflow-auto max-h-96 text-xs">
                              {JSON.stringify(sessionData, null, 2)}
                            </pre>
                          )}
                        </div>
                      </>
                    ) : (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          No active session found. Please sign in again.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for labels
function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}