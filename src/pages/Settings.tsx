import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Bell, Shield, Palette, Save } from "lucide-react";

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    twoFactorAuth: false,
    autoBackup: true,
    analytics: true
  });

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been successfully updated.",
    });
  };

  return (
    <div className="flex h-screen bg-gradient-dark">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-heading text-foreground mb-2">
                Settings
              </h1>
              <p className="text-muted-foreground">
                Customize your application preferences and security settings.
              </p>
            </div>

            <div className="space-y-6">
              {/* Notifications */}
              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Bell className="mr-2 h-5 w-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications" className="text-foreground">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications" className="text-foreground">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Appearance */}
              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Palette className="mr-2 h-5 w-5" />
                    Appearance
                  </CardTitle>
                  <CardDescription>Customize the look and feel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode" className="text-foreground">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Use dark theme throughout the application</p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Shield className="mr-2 h-5 w-5" />
                    Security
                  </CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor" className="text-foreground">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      id="two-factor"
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Data & Privacy */}
              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <SettingsIcon className="mr-2 h-5 w-5" />
                    Data & Privacy
                  </CardTitle>
                  <CardDescription>Control your data and privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-backup" className="text-foreground">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">Automatically backup your data daily</p>
                    </div>
                    <Switch
                      id="auto-backup"
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analytics" className="text-foreground">Usage Analytics</Label>
                      <p className="text-sm text-muted-foreground">Help improve the app by sharing usage data</p>
                    </div>
                    <Switch
                      id="analytics"
                      checked={settings.analytics}
                      onCheckedChange={(checked) => handleSettingChange("analytics", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-gradient-hero text-white hover:opacity-90">
                  <Save className="mr-2 h-4 w-4" />
                  Save All Settings
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;