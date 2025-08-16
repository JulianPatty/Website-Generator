"use client";

import { useState, useEffect } from "react";
import { passkey } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Fingerprint, Trash2, Plus, AlertCircle, Smartphone, Laptop } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface PasskeyDevice {
  id: string;
  name?: string;
  createdAt: string;
  deviceType: string;
  backedUp: boolean;
}

export function PasskeySettings() {
  const [passkeys, setPasskeys] = useState<PasskeyDevice[]>([]);
  const [loading, setLoading] = useState(false);
  const [passkeyName, setPasskeyName] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchPasskeys();
  }, []);

  const fetchPasskeys = async () => {
    try {
      const response = await passkey.listPasskeys();
      if (response.data) {
        setPasskeys(response.data);
      }
    } catch (error) {
      console.error("Error fetching passkeys:", error);
    }
  };

  const handleAddPasskey = async () => {
    setLoading(true);
    setMessage(null);
    
    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        setMessage({ type: "error", text: "Passkeys are not supported on this device" });
        return;
      }

      const response = await passkey.addPasskey({
        name: passkeyName || `Passkey ${new Date().toLocaleDateString()}`
      });

      if (response.data) {
        await fetchPasskeys();
        setShowAddDialog(false);
        setPasskeyName("");
        setMessage({ type: "success", text: "Passkey added successfully" });
      }
    } catch (error: any) {
      console.error("Error adding passkey:", error);
      if (error.message?.includes("User cancelled")) {
        setMessage({ type: "error", text: "Passkey registration cancelled" });
      } else {
        setMessage({ type: "error", text: "Failed to add passkey. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePasskey = async (passkeyId: string) => {
    if (!confirm("Are you sure you want to delete this passkey?")) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await passkey.deletePasskey({
        id: passkeyId
      });

      await fetchPasskeys();
      setMessage({ type: "success", text: "Passkey deleted successfully" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete passkey" });
    } finally {
      setLoading(false);
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    if (deviceType.toLowerCase().includes("mobile") || deviceType.toLowerCase().includes("phone")) {
      return <Smartphone className="h-4 w-4" />;
    }
    return <Laptop className="h-4 w-4" />;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Fingerprint className="h-5 w-5 text-purple-600" />
              <CardTitle>Passkeys</CardTitle>
            </div>
            <Button
              size="sm"
              onClick={() => setShowAddDialog(true)}
              disabled={loading}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Passkey
            </Button>
          </div>
          <CardDescription>
            Sign in with biometrics, face recognition, or a device PIN
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && (
            <Alert variant={message.type === "error" ? "destructive" : "default"}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          {passkeys.length === 0 ? (
            <div className="text-center py-8">
              <Fingerprint className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No passkeys configured</p>
              <Button 
                onClick={() => setShowAddDialog(true)}
                disabled={loading}
              >
                Add Your First Passkey
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {passkeys.map((pk) => (
                <div
                  key={pk.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    {getDeviceIcon(pk.deviceType)}
                    <div>
                      <p className="font-medium">
                        {pk.name || "Unnamed Passkey"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Added on {new Date(pk.createdAt).toLocaleDateString()}
                        {pk.backedUp && " • Backed up"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeletePasskey(pk.id)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Passkey Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a Passkey</DialogTitle>
            <DialogDescription>
              Create a passkey to sign in quickly and securely with your device
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Alert>
              <Fingerprint className="h-4 w-4" />
              <AlertDescription>
                Your device will prompt you to authenticate using biometrics, face recognition, or your device PIN.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="passkey-name">Passkey Name (Optional)</Label>
              <Input
                id="passkey-name"
                placeholder="e.g., MacBook Pro, iPhone"
                value={passkeyName}
                onChange={(e) => setPasskeyName(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                Give this passkey a name to help you identify it later
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddDialog(false);
                setPasskeyName("");
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddPasskey}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Passkey"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}