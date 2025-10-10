"use client";
import React from "react";

interface InfoTabProps {
  user: { email?: string } | null;
}

export default function InfoTab({ user }: InfoTabProps) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="flex gap-2 text-2xl font-bold text-yellow-400 mb-6">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Account Information
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
  );
}
