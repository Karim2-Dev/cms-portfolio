/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { Switch } from "@/components/ui/switch";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import "./style.css";
import LanguageDropMode from "./LanguageDropMode";
import { useEffect, useState } from "react";

export default function DashboardPreferences() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 border border-border w-full rounded-lg p-5 bg-card transition-all duration-200 ease-in-out"
    >
      <h1 className="text-2xl font-semibold pb-4 border-border border-b">
        Dashboard Preferences
      </h1>
      <div className="space-y-6">
        <div className="flex items-center justify-between mt-4 gap-2">
          <div className="space-y-1">
            <h3 className="font-medium">Enable Dark Mode</h3>
            <p className="text-muted-foreground text-sm">
              Automatically switch to dark mode based on your system
              preferences.
            </p>
          </div>
          <Switch
            checked={mounted ? resolvedTheme === "dark" : false}
            onCheckedChange={(e) => {
              setTheme(e ? "dark" : "light");
            }}
            id="dark-mode"
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="space-y-1">
            <h3 className="font-medium">Email Notifications</h3>
            <p className="text-muted-foreground text-sm">
              Receive email notifications for important updates and activities.
            </p>
          </div>
          <Switch id="email-notifications" defaultChecked />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="space-y-1">
            <h3 className="font-medium">Two-Factor Authentication</h3>
            <p className="text-muted-foreground text-sm">
              Add an extra layer of security to your account.
            </p>
          </div>
          <Switch id="two-factor-auth" />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="space-y-1">
            <h3 className="font-medium">Language</h3>
            <p className="text-muted-foreground text-sm">
              Select your preferred language for the dashboard.
            </p>
          </div>
          <LanguageDropMode />
        </div>
      </div>
    </motion.div>
  );
}
