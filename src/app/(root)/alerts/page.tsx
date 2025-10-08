"use client";
import React, { useState } from "react";
import { Alert } from "@/lib/types/generic";
import { handleAddAlert } from "@/components/functions/alertFunctions";
import { useQuery } from "@tanstack/react-query";
import SkeletonPlaceHolder from "@/components/customized/SkeletonPlaceHolder";
import { getAllAlerts } from "@/components/functions/alertFunctions";
import { toggleAlert } from "@/components/functions/alertFunctions";
import { CheckCircledIcon } from "@radix-ui/react-icons";
export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [toggleTarget, setToggleTarget] = useState<{ [id: string]: boolean }>(
    {}
  );
  const [newFields, setNewFields] = useState({ description: "", target: "" });
  const [newAlert, setNewAlert] = useState({
    name: "",
    description: "",
    target: "",
    isTriggered: false,
  });

  const {
    data: alertsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["alerts", alerts],
    queryFn: () => getAllAlerts(),
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400">
            Alerts Management
          </h1>
          <p className="text-yellow-400/70 mt-2">
            Manage your stock alerts and notifications
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors scale-75"
        >
          {showAddForm ? "Cancel" : "+ New Alert"}
        </button>
      </div>

      {/* Add Alert Form */}
      {showAddForm && (
        <div className="bg-gray-900/50 border border-yellow-400/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            Create New Alert
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-yellow-400/70 text-sm font-medium mb-2">
                Nome
              </label>
              <input
                type="text"
                value={newAlert.name}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, name: e.target.value })
                }
                className="w-full bg-gray-800 border border-yellow-400/30 rounded-lg px-3 py-2 text-yellow-400 focus:outline-none focus:border-yellow-400"
                placeholder="Alert name"
              />
            </div>
            <div>
              <label className="block text-yellow-400/70 text-sm font-medium mb-2">
                Target
              </label>
              <input
                type="text"
                value={newAlert.target}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, target: e.target.value })
                }
                className="w-full bg-gray-800 border border-yellow-400/30 rounded-lg px-3 py-2 text-yellow-400 focus:outline-none focus:border-yellow-400"
                placeholder="Target value"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-yellow-400/70 text-sm font-medium mb-2">
                Descrizione
              </label>
              <textarea
                value={newAlert.description}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, description: e.target.value })
                }
                className="w-full bg-gray-800 border border-yellow-400/30 rounded-lg px-3 py-2 text-yellow-400 focus:outline-none focus:border-yellow-400 h-20 resize-none"
                placeholder="Alert description"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-yellow-400/70 hover:text-yellow-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                handleAddAlert({ newAlert, setNewAlert, setShowAddForm })
              }
              className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Create Alert
            </button>
          </div>
        </div>
      )}

      {/* Alerts Grid */}
      {isLoading && <SkeletonPlaceHolder />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alertsData?.alerts?.map((alert) => (
          <div
            key={alert.id}
            className={`bg-gray-900/50 border rounded-lg p-6 backdrop-blur-sm transition-all hover:scale-105 ${
              alert.isTriggered
                ? "border-red-400/50 shadow-red-400/20 shadow-lg"
                : "border-yellow-400/30"
            }`}
          >
            {/* Alert Status Badge */}
            <div className="flex justify-between items-start mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  alert.isTriggered
                    ? "bg-red-400/20 text-red-400 border border-red-400/30"
                    : "bg-green-400/20 text-green-400 border border-green-400/30"
                }`}
              >
                {alert.isTriggered ? "TRIGGERED" : "ACTIVE"}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() =>{
                    setNewFields({...newFields, target: alert.target, description: alert.description})
                    setToggleTarget((prev) => ({
                      ...prev,
                      [alert.id]: !prev[alert.id],
                    }))
                  }}
                  className="text-yellow-400/70 hover:text-yellow-400 transition-colors"
                  title={
                    alert.isTriggered ? "Mark as inactive" : "Mark as triggered"
                  }
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
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="text-red-400/70 hover:text-red-400 transition-colors"
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
              </div>
            </div>

            {/* Alert Content */}
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400">
                  {alert.name}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-yellow-400/70 text-sm">Target:</span>
                <input
                  value={alert.target}
                  onChange={(e) =>
                    setNewFields({
                      ...newFields,
                      target: e.target.value,
                    })
                  }
                  disabled={!toggleTarget[alert.id]}
                  className="text-yellow-400 font-mono bg-gray-800 px-2 py-1 rounded text-sm border border-yellow-400/30 focus:border-yellow-400 focus:outline-none focus:bg-gray-700 transition-all resize-none w-18 text-center"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-yellow-400/70 text-sm block mb-1"
                >
                  Descrizione:
                </label>
                {toggleTarget[alert.id] ? (
                  <div className="flex justify-start items-center space-x-2">
                    <textarea
                      value={alert.description || undefined}
                      onChange={(e) =>
                        setNewFields({
                          ...newFields,
                          description: e.target.value,
                        })
                      }
                      disabled={!toggleTarget}
                      placeholder="Set new description"
                      className="text-yellow-400/70 text-sm block mb-1 resize-none bg-gray-800 px-2 py-1 rounded border border-yellow-400/30 focus:border-yellow-400 focus:outline-none focus:bg-gray-700 transition-all"
                    />
                    <CheckCircledIcon
                      onClick={() =>
                        toggleAlert({
                          newFields,
                          setNewFields,
                          alert,
                          setToggleTarget,
                        })
                      }
                      className="w-4 h-4 text-green-400"
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
            <div className="mt-4 pt-4 border-t border-yellow-400/20">
              <div className="flex justify-between items-center text-xs text-yellow-400/50">
                <span>ID: {alert.id}</span>
                <span>
                  {alert.isTriggered ? "Last triggered: Now" : "Monitoring..."}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {alerts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-yellow-400/50 mb-4">
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
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            Create First Alert
          </button>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-gray-900/50 border border-yellow-400/30 rounded-lg p-4 text-center backdrop-blur-sm">
          <div className="text-2xl font-bold text-yellow-400">
            {alerts.length}
          </div>
          <div className="text-yellow-400/70 text-sm">Total Alerts</div>
        </div>
        <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-4 text-center backdrop-blur-sm">
          <div className="text-2xl font-bold text-green-400">
            {alerts.filter((a) => !a.isTriggered).length}
          </div>
          <div className="text-green-400/70 text-sm">Active</div>
        </div>
        <div className="bg-gray-900/50 border border-red-400/30 rounded-lg p-4 text-center backdrop-blur-sm">
          <div className="text-2xl font-bold text-red-400">
            {alerts.filter((a) => a.isTriggered).length}
          </div>
          <div className="text-red-400/70 text-sm">Triggered</div>
        </div>
      </div>
    </div>
  );
}
