"use client";
import React, { useRef, useState } from "react";
import { Alert } from "@/lib/types/generic";
import { handleAddAlert } from "@/components/functions/alertFunctions";
import { useQuery } from "@tanstack/react-query";
import {
  toggleAlert,
  deleteAlert,
  getAllAlerts,
} from "@/components/functions/alertFunctions";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import "./style.css";
import SymbolAutocomplete from "@/components/customized/SymbolAutocomplete";
export default function Alerts() {
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = useState(false);
  const [toggleTarget, setToggleTarget] = useState<{ [id: string]: boolean }>(
    {}
  );
  const [newFields, setNewFields] = useState({
    description: "",
    target: "",
    isTriggered: false,
  });
  const [newAlert, setNewAlert] = useState({
    name: "",
    description: "",
    target: "",
    isTriggered: false,
  });
  const [searchSymbol, setSearchSymbol] = useState("");

  const ref = useRef<HTMLButtonElement>(null);
  const [isTriggered, setIsTriggered] = useState<boolean>(false);
  const {
    data: alertsData,
    error,
  } = useQuery({
    queryKey: ["alerts"],
    queryFn: () => getAllAlerts(),
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in-down">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 tracking-tight">
            Alerts Management
          </h1>
          <p className="text-yellow-400/70 mt-2 text-sm sm:text-base">
            Manage your stock alerts and notifications
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-all button-press hover:shadow-lg hover:shadow-yellow-400/50 w-full sm:w-auto"
        >
          {showAddForm ? "✕ Cancel" : "+ New Alert"}
        </button>
      </div>

      {/* Add Alert Form */}
      {showAddForm && (
        <div className="bg-gray-900/50 border border-yellow-400/30 rounded-lg p-6 animate-scale-in animate-shimmer">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">✨</span>
            Create New Alert
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="animate-fade-in-up stagger-1 relative" style={{ zIndex: 100 }}>
              <label className="block text-yellow-400/70 text-sm font-medium mb-2">
                Stock Symbol
              </label>
              <SymbolAutocomplete
                value={searchSymbol}
                onChange={setSearchSymbol}
                onSymbolSelect={(symbol) => {
                  setNewAlert({ ...newAlert, name: symbol });
                  setSearchSymbol(symbol);
                }}
                placeholder="Type a symbol"
                className="mb-2"
              />
              {searchSymbol && (
                <p className="text-xs text-yellow-400/60">
                  Selected: <span className="font-medium text-yellow-400">{newAlert.name || "None"}</span>
                </p>
              )}
            </div>
            <div className="animate-fade-in-up stagger-3">
              <label className="block text-yellow-400/70 text-sm font-medium mb-2">
                Target Price
              </label>
              <input
                type="text"
                value={newAlert.target}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, target: e.target.value })
                }
                className="w-full bg-gray-800 border border-yellow-400/30 rounded-lg px-3 py-2 text-yellow-400 focus:outline-none focus:border-yellow-400 input-focus"
                placeholder="Target price (e.g., 150.00)"
              />
            </div>
            <div className="animate-fade-in-up stagger-4">
              <label className="block text-yellow-400/70 text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={newAlert.description}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, description: e.target.value })
                }
                className="w-full bg-gray-800 border border-yellow-400/30 rounded-lg px-3 py-2 text-yellow-400 focus:outline-none focus:border-yellow-400 h-20 resize-none input-focus"
                placeholder="Alert description (optional)"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-3">
            <button
              onClick={() => {
                setShowAddForm(false);
                setSearchSymbol("");
                setNewAlert({
                  name: "",
                  description: "",
                  target: "",
                  isTriggered: false,
                });
              }}
              className="px-4 py-2 text-yellow-400/70 hover:text-yellow-400 transition-all button-press hover:bg-yellow-400/10 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                handleAddAlert({
                  newAlert,
                  setNewAlert,
                  setShowAddForm,
                  queryClient,
                })
              }
              className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-all button-press hover:shadow-lg hover:shadow-yellow-400/50"
            >
              Create Alert
            </button>
          </div>
        </div>
      )}

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {error && (
          <p className="text-red-400 animate-fade-in-up">{error.message}</p>
        )}
        {alertsData?.alerts?.map((alert: Alert, index: number) => (
          <div
            key={alert.id}
            className={`backdrop-blur-sm transition-all card-hover rounded-lg p-6 animate-scale-in ${
              alert.isTriggered
                ? "bg-red-900/20 border-2 border-red-400/60 shadow-red-400/30 shadow-xl glow-effect-red"
                : "bg-green-900/15 border-2 border-green-400/50 shadow-green-400/20 shadow-lg glow-effect-green"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Alert Status Badge */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                {toggleTarget[alert.id] ? (
                  <select
                    value={newFields.isTriggered.toString()}
                    onChange={(e) =>
                      setNewFields({
                        ...newFields,
                        isTriggered: e.target.value === "true",
                      })
                    }
                    className="px-2 py-1 rounded text-xs font-semibold bg-gray-800 text-yellow-400 border border-yellow-400/30 focus:border-yellow-400 focus:outline-none transition-all input-focus"
                  >
                    <option value="false">Active</option>
                    <option value="true">Triggered</option>
                  </select>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      alert.isTriggered
                        ? "bg-red-400/20 text-red-400 border border-red-400/30 animate-pulse-slow"
                        : "bg-green-400/20 text-green-400 border border-green-400/30"
                    }`}
                  >
                    {alert.isTriggered ? "🚨 TRIGGERED" : "✓ ACTIVE"}
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                {!toggleTarget[alert.id] && (
                  <button
                    onClick={() => {
                      setToggleTarget((prev) => ({
                        ...prev,
                        [alert.id]: !prev[alert.id],
                      }));
                      setNewFields({
                        ...newFields,
                        target: alert.target,
                        description: alert.description,
                        isTriggered: alert.isTriggered,
                      });
                    }}
                    className="text-yellow-400/70 hover:text-yellow-400 transition-all button-press hover:bg-yellow-400/10 p-2 rounded-lg"
                    title={alert.isTriggered ? "Edit alert" : "Edit alert"}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                )}
                <button
                  onClick={() =>
                    deleteAlert({
                      alertId: Number(alert.id),
                      queryClient: queryClient,
                    })
                  }
                  className="text-red-400/70 hover:text-red-400 transition-all button-press hover:bg-red-400/10 p-2 rounded-lg"
                  title="Delete alert"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                {toggleTarget[alert.id] && (
                  <>
                    <CheckCircledIcon
                      onClick={() => {
                        setIsTriggered((prev) => !prev);
                        toggleAlert(
                          {
                            newFields,
                            setNewFields,
                            alert,
                            setToggleTarget,
                          },
                          queryClient
                        );
                      }}
                      className="w-5 h-5 text-green-400 hover:text-green-300 transition-all cursor-pointer button-press hover:bg-green-400/10 rounded-lg p-1 box-content"
                    />
                    <button
                      onClick={() => {
                        setIsTriggered((prev) => !prev);
                        setToggleTarget((prev) => ({
                          ...prev,
                          [alert.id]: false,
                        }));
                        setNewFields({
                          description: "",
                          target: "",
                          isTriggered: false,
                        });
                      }}
                      className="w-5 h-5 text-red-400 hover:text-red-300 transition-all button-press hover:bg-red-400/10 rounded-lg p-1 box-content"
                      title="Cancel changes"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Alert Content */}
            <div
              onKeyDown={(e) =>
                e.key === "Enter" &&
                toggleTarget[alert.id] &&
                toggleAlert(
                  { newFields, setNewFields, alert, setToggleTarget },
                  queryClient
                )
              }
              className="space-y-3"
            >
              <div>
                <h3 className="text-lg font-semibold text-yellow-400">
                  {alert.name}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-yellow-400/70 text-sm">Target:</span>
                {toggleTarget[alert.id] ? (
                  <input
                    value={
                      toggleTarget[alert.id] ? newFields.target : alert.target
                    }
                    onChange={(e) =>
                      setNewFields({
                        ...newFields,
                        target: e.target.value,
                      })
                    }
                    disabled={!toggleTarget[alert.id]}
                    className="text-yellow-400 font-mono bg-gray-800 px-2 py-1 rounded text-sm border border-yellow-400/30 focus:border-yellow-400 focus:outline-none focus:bg-gray-700 transition-all resize-none w-18 text-center input-focus"
                  />
                ) : (
                  <span className="text-yellow-400 font-mono text-sm font-bold">
                    {alert.target}€
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-yellow-400/70 text-sm block mb-1"
                >
                  Description:
                </label>
                {toggleTarget[alert.id] ? (
                  <div className="flex justify-start items-center space-x-2">
                    <textarea
                      value={
                        toggleTarget[alert.id]
                          ? newFields.description
                          : alert.description
                      }
                      onChange={(e) =>
                        setNewFields({
                          ...newFields,
                          description: e.target.value,
                        })
                      }
                      disabled={!toggleTarget[alert.id]}
                      placeholder="Enter description"
                      className="text-yellow-400/70 text-sm block mb-1 resize-none bg-gray-800 px-2 py-1 rounded border border-yellow-400/30 focus:border-yellow-400 focus:outline-none focus:bg-gray-700 transition-all flex-1 input-focus"
                    />
                  </div>
                ) : (
                  <p className="text-yellow-400/90 text-sm leading-relaxed">
                    {alert.description}
                  </p>
                )}
              </div>
            </div>

            {/* Alert Actions */}
            <div
              className={`mt-4 pt-4 border-t transition-all ${
                alert.isTriggered ? "border-red-400/30" : "border-green-400/25"
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                <span
                  className={`${
                    alert.isTriggered ? "text-red-300/80" : "text-green-400/70"
                  } font-mono font-semibold`}
                >
                  ID: {alert.id}
                </span>
                <div
                  className={`text-left sm:text-right space-y-1 ${
                    alert.isTriggered ? "text-red-300/80" : "text-green-300/80"
                  }`}
                >
                  <div
                    className={`font-bold ${
                      alert.isTriggered ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    🎯 Target: {alert.target}€
                  </div>
                  <div
                    className={`font-medium ${
                      alert.isTriggered
                        ? "text-red-300/90"
                        : "text-green-300/90"
                    }`}
                  >
                    {alert.isTriggered
                      ? `🚨 Alert Active - Price target reached`
                      : `🔄 Monitoring - Waiting for ${alert.target}€`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!alertsData?.alerts && (
        <div className="text-center py-12 animate-fade-in-up">
          <div className="text-yellow-400/50 mb-4 animate-bounce-slow">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1 0-15 0v5h5l-5 5-5-5h5V7a10 10 0 1 1 20 0v10z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-yellow-400/70 mb-2">
            No alerts configured
          </h3>
          <p className="text-yellow-400/50 mb-4">
            Create your first alert to get started
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-all button-press hover:shadow-lg hover:shadow-yellow-400/50"
          >
            Create First Alert
          </button>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-gray-900/50 border border-yellow-400/30 rounded-lg p-4 text-center backdrop-blur-sm stat-card animate-fade-in-up stagger-1">
          <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-1">
            {alertsData?.alerts.length || 0}
          </div>
          <div className="text-yellow-400/70 text-sm">Total Alerts</div>
        </div>
        <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-4 text-center backdrop-blur-sm stat-card animate-fade-in-up stagger-2">
          <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-1">
            {alertsData?.alerts.filter((a: Alert) => !a.isTriggered).length ||
              0}
          </div>
          <div className="text-green-400/70 text-sm">Active</div>
        </div>
        <div className="bg-gray-900/50 border border-red-400/30 rounded-lg p-4 text-center backdrop-blur-sm stat-card animate-fade-in-up stagger-3">
          <div className="text-3xl sm:text-4xl font-bold text-red-400 mb-1">
            {alertsData?.alerts.filter((a: Alert) => a.isTriggered).length || 0}
          </div>
          <div className="text-red-400/70 text-sm">Triggered</div>
        </div>
      </div>
    </div>
  );
}
