"use client";
import React, { useState, useEffect } from "react";
import {
  UserIcon,
  CogIcon,
  ChartBarIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useUserContext } from "@/components/contextProvider/AppProvider";
import { useQuery } from "@tanstack/react-query";
import { getAllAlerts } from "@/components/functions/alertFunctions";
import { Alert } from "@prisma/client";
import { Activity } from "@/lib/types/generic";
import ActivitiesSection from "@/components/customized/ActivitiesSection";
interface UserStats {
  totalAlerts: number;
  activeAlerts: number;
  triggeredAlerts: number;
  portfolioValue: string;
  monthlyGain: string;
  joinDate: string;
}

export default function ProfilePage() {
  const { user, setUser } = useUserContext();
  const [activeTab, setActiveTab] = useState("overview");
  const [userStats, setUserStats] = useState<UserStats>({
    totalAlerts: 0,
    activeAlerts: 0,
    triggeredAlerts: 0,
    portfolioValue: "€0.00",
    monthlyGain: "+0.00%",
    joinDate: new Date().toLocaleDateString(),
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

  const tabs = [
    { id: "overview", name: "Overview", icon: ChartBarIcon },
    { id: "info", name: "Account info", icon: InformationCircleIcon },
    { id: "security", name: "Security", icon: ShieldCheckIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
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
                <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 animate-fade-in-right">
                  {"Welcome Back!"}
                </h1>
                <p className="text-yellow-400/70 text-lg animate-fade-in-right stagger-1">
                  {user?.email || ""}
                </p>
                <div className="flex items-center gap-2 animate-fade-in-right stagger-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400 font-medium">
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
                    data?.alerts?.filter((a: Alert) => !a.isTriggered).length ||
                    0;
                  if (triggered === 0)
                    return (
                      <p className="text-2xl font-bold text-blue-400/70">0%</p>
                    );
                  const percent = (triggered / total) * 100;
                  return (
                    <p className="text-2xl font-bold text-blue-400/70">
                      {percent.toFixed(2)}%
                    </p>
                  );
                })()}
                <div className="text-xs text-blue-400/70">Reached %</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-900/30 backdrop-blur-xl border border-yellow-400/20 rounded-2xl p-2 mb-8 animate-fade-in-up flex justify-center">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 animate-slide-in-right ${
                    activeTab === tab.id
                      ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/30"
                      : "text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-yellow-400/30 rounded-2xl p-6 sm:p-8 animate-fade-in-up">
          {activeTab === "overview" && (
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
          )}

          {activeTab === "info" && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="flex  gap-2 text-2xl font-bold text-yellow-400 mb-6">
                <InformationCircleIcon className="w-5 h-5" /> Account
                Information
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="animate-slide-in-left stagger-1">
                    <label className="block text-yellow-400/70 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      className="w-full bg-gray-800 border border-yellow-400/30 rounded-lg px-4 py-3 text-yellow-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      readOnly
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="animate-slide-in-right stagger-1">
                    <label className="block text-yellow-400/70 text-sm font-medium mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={"passwordsdadsada"}
                      className="w-full bg-gray-800 border border-yellow-400/30 rounded-lg px-4 py-3 text-yellow-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6">
                🔒 Security Settings
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg animate-scale-in stagger-1">
                    <h3 className="text-yellow-400 font-medium mb-2">
                      📧 Email
                    </h3>
                    <p className="text-yellow-400/70 text-sm mb-3">
                      Last changed 30 days ago
                    </p>
                    <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-all button-press">
                      Change Email
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg animate-scale-in stagger-1">
                    <h3 className="text-yellow-400 font-medium mb-2">
                      🔑 Password
                    </h3>
                    <p className="text-yellow-400/70 text-sm mb-3">
                      Last changed 30 days ago
                    </p>
                    <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-all button-press">
                      Change Password
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg animate-scale-in stagger-2">
                    <h3 className="text-yellow-400 font-medium mb-2">
                      📱 Active Sessions
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-400/70 text-sm">
                          Current Device
                        </span>
                        <span className="text-green-400 text-sm">Active</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-400/70 text-sm">
                          iPhone 14
                        </span>
                        <button className="text-red-400 text-sm hover:text-red-300">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6">
                💳 Billing & Subscription
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 border border-yellow-400/30 rounded-xl animate-scale-in">
                  <h3 className="text-yellow-400 font-bold text-xl mb-2">
                    Pro Plan
                  </h3>
                  <p className="text-yellow-400/70 mb-4">
                    Unlimited alerts and premium features
                  </p>
                  <div className="text-3xl font-bold text-yellow-400 mb-4">
                    €9.99<span className="text-lg font-normal">/month</span>
                  </div>
                  <button className="w-full bg-yellow-400 text-black py-3 rounded-lg font-medium hover:bg-yellow-300 transition-all button-press">
                    Manage Subscription
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg animate-slide-in-right">
                    <h3 className="text-yellow-400 font-medium mb-2">
                      💳 Payment Method
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <span className="text-yellow-400/70">
                        •••• •••• •••• 1234
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg animate-slide-in-right stagger-1">
                    <h3 className="text-yellow-400 font-medium mb-2">
                      📄 Billing History
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-yellow-400/70">Dec 2024</span>
                        <span className="text-yellow-400">€9.99</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-yellow-400/70">Nov 2024</span>
                        <span className="text-yellow-400">€9.99</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
