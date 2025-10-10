"use client";
import React from "react";
import ActivitiesSection from "@/components/customized/ActivitiesSection";
import { Activity } from "@/lib/types/generic";

interface OverviewTabProps {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}

export default function OverviewTab({ activities, setActivities }: OverviewTabProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6 animate-fade-in-down">
        📊 Portfolio Overview
      </h2>
      {/* Recent Activity */}
      <div className="animate-fade-in-up stagger-2">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">
          🔔 Recent Activity
        </h3>
        <div className="space-y-3">
          <ActivitiesSection
            activities={activities}
            setActivities={setActivities}
          />
        </div>
      </div>
    </div>
  );
}
