"use client";
import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { Alert } from "@prisma/client";

interface UserProfileHeaderProps {
  user: { email?: string } | null;
  data: { alerts?: Alert[] } | undefined;
}

export default function UserProfileHeader({ user, data }: UserProfileHeaderProps) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-yellow-400/30 rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-down">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        {/* Avatar & Basic Info */}
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-1 animate-pulse-slow flex items-center justify-center">
              <UserIcon className="w-12 h-12 text-yellow-400" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 animate-bounce-slow"></div>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl md:text-[30px] font-bold text-yellow-400 animate-fade-in-right">
              {"Welcome Back!"}
            </h1>
            <p className="text-yellow-400/70 text-[13px] md:text-[15px] animate-fade-in-right stagger-1  break-all overflow-hidden">
              {user?.email || "Guest"}
            </p>
            <div className="flex items-center gap-2 animate-fade-in-right stagger-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-[15px] text-green-400 font-medium">
                Active Trader
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
          <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 border border-yellow-400/20 rounded-xl p-4 text-center animate-scale-in stagger-1">
            <div className="text-2xl font-bold text-yellow-400">
              {data?.alerts?.length}
            </div>
            <div className="text-xs text-yellow-400/70">Total Alerts</div>
          </div>
          <div className="bg-gradient-to-br from-green-400/10 to-green-600/5 border border-green-400/20 rounded-xl p-4 text-center animate-scale-in stagger-2">
            <div className="text-2xl font-bold text-green-400">
              {
                data?.alerts?.filter((alert: Alert) => !alert.isTriggered)
                  .length
              }
            </div>
            <div className="text-xs text-green-400/70">Active</div>
          </div>
          <div className="bg-gradient-to-br from-red-400/10 to-red-600/5 border border-red-400/20 rounded-xl p-4 text-center animate-scale-in stagger-3">
            <div className="text-2xl font-bold text-red-400">
              {
                data?.alerts?.filter((alert: Alert) => alert.isTriggered)
                  .length
              }
            </div>
            <div className="text-xs text-red-400/70">Triggered</div>
          </div>
          <div className="bg-gradient-to-br from-blue-400/10 to-blue-600/5 border border-blue-400/20 rounded-xl p-4 text-center animate-scale-in stagger-4">
            {(() => {
              const total = data?.alerts?.length || 0;
              const triggered =
                data?.alerts?.filter((a: Alert) => a.isTriggered).length ||
                0;
              if (triggered === 0)
                return (
                  <p className="text-2xl font-bold text-blue-400/70">0%</p>
                );
              const percent = (triggered / total) * 100;
              return (
                <p className="text-2xl font-bold text-blue-400/70">
                  {percent.toFixed(1)}%
                </p>
              );
            })()}
            <div className="text-xs text-blue-400/70">Reached %</div>
          </div>
        </div>
      </div>
    </div>
  );
}
