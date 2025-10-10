import React, { useEffect, useState } from "react";
import { Activity } from "@/lib/types/generic";
type ActivityWithDiff = Activity & {
  diffDays: number;
  diffHours: number;
  diffMinutes: number;
  diffSeconds: number;
};

export default function ActivitiesSection({
  activities,
  setActivities,
}: {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}) {
  const [activitiesWithDiff, setActivitiesWithDiff] = useState<
    ActivityWithDiff[]
  >([]);
  const now = Date.now();
  useEffect(() => {
    const update: ActivityWithDiff[] = activities.map((a, i) => {
      const time =
        typeof a.time === "number" ? a.time : new Date(a.time).getTime();
      const diffTime = Math.abs(now - time);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      const diffSeconds = Math.floor(diffTime / 1000);
      return { ...a, diffDays, diffHours, diffMinutes, diffSeconds };
    });
    setActivitiesWithDiff(update);
  }, [activities]);

  return (
    <div className="flex flex-col-reverse gap-4">
      {activitiesWithDiff
        .slice(
          activitiesWithDiff.length - 3 < 0 ? 0 : activitiesWithDiff.length - 3,
          activitiesWithDiff.length
        )
        .map((activity, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300 animate-slide-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  activity.color === "green" ? "bg-green-400" : "bg-red-400"
                } animate-pulse`}
              ></div>
              <div className="flex-1 ">
                <p className="text-yellow-400/90">{activity.message}</p>
                <p className="text-yellow-400/50 text-sm">
                  {(() => {
                    if (activity.diffDays > 0)
                      return `${activity.diffDays} days ago`;
                    if (activity.diffHours > 0)
                      return `${activity.diffHours} hours ago`;
                    if (activity.diffMinutes > 0)
                      return `${activity.diffMinutes} minutes ago`;
                    if (activity.diffSeconds > 0)
                      return `${activity.diffSeconds} seconds ago`;
                    return "Just now";
                  })()}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
