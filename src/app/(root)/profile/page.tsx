"use client";
import React, { useState, useEffect } from "react";
import { useUserContext } from "@/components/contextProvider/AppProvider";
import { useQuery } from "@tanstack/react-query";
import { getAllAlerts } from "@/components/functions/alertFunctions";
import { Alert } from "@prisma/client";
import { Activity } from "@/lib/types/generic";
import { UserProfileHeader, ProfileTabs, OverviewTab, InfoTab, SecurityTab } from "@/components/profile";

export default function ProfilePage() {
  const { user, setUser } = useUserContext();
  const [activeTab, setActiveTab] = useState("overview");
  const [activities, setActivities] = useState<Activity[]>([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["alerts"],
    queryFn: () => getAllAlerts(),
  });

  useEffect(() => {
    if (!data?.alerts) return;
    const newActivities = data.alerts.map((alert: Alert) => ({
      type: "alert",
      message: alert.name,
      time: new Date(alert.createdAt).getTime(),
      triggered: alert.isTriggered,
      color: alert.isTriggered === false ? "green" : "red",
      target: alert.target,
    }));
    setActivities(newActivities);
  }, [data?.alerts]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <UserProfileHeader user={user} data={data} />
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-yellow-400/30 rounded-2xl p-6 sm:p-8 animate-fade-in-up">
          {activeTab === "overview" && (
            <OverviewTab activities={activities} setActivities={setActivities} />
          )}

          {activeTab === "info" && (
            <InfoTab user={user} />
          )}

          {activeTab === "security" && (
            <SecurityTab />
          )}
        </div>
      </div>
    </div>
  );
}
