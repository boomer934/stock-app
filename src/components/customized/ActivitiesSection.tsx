import React, { useEffect } from "react";
import { Activity } from "@/lib/types/generic";

export default function ActivitiesSection({
  activities,
  setActivities,
}: {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}) {
  const now = new Date();
  useEffect(() => {
    console.log(now.getTime());
    console.log(new Date(activities[0]?.time).getUTCDate());
  }, [activities]);
  return (
    <div>
      {activities
        .slice(activities.length - 3, activities.length)
        .map((activity, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300 animate-slide-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-3 h-3 rounded-full bg-${activity.color}-400 animate-pulse`}
              ></div>
              <div className="flex-1">
                <p className="text-yellow-400/90">{activity.message}</p>
                <p className="text-yellow-400/50 text-sm">
                  {  now.getUTCDate() - new Date(activity.time).getUTCDate()  == 0 ? "More than 30 days ago"  : Math.floor(
                    (now.getUTCDate() - new Date(activity.time).getUTCDate())
                  ) + " days ago"}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
