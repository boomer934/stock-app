"use client";
import React from "react";
import { ChartBarIcon, InformationCircleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileTabs({ activeTab, setActiveTab }: ProfileTabsProps) {
  const tabs = [
    { id: "overview", name: "Overview", icon: ChartBarIcon },
    { id: "info", name: "Account info", icon: InformationCircleIcon },
    { id: "security", name: "Security", icon: ShieldCheckIcon },
  ];

  return (
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
  );
}
