import axios from "axios";
import React from "react";
import { ToggleAlertParams } from "@/lib/types/generic";
/**
 * Adds a new alert via the API and updates local UI state and cache.
 *
 * @param newAlert - The alert values to submit (target is provided as a string and will be converted to a number).
 * @param setNewAlert - State setter to reset the new-alert form values after successful creation.
 * @param setShowAddForm - State setter to hide the add-alert form after successful creation.
 * @param queryClient - Query client instance used to invalidate the "alerts" cache after creation.
 * @returns The created alert data on success, `undefined` otherwise.
 */
export async function handleAddAlert({
  newAlert,
  setNewAlert,
  setShowAddForm,
  queryClient,
}: {
  newAlert: {
    name: string;
    description: string;
    target: string;
    isTriggered: boolean;
  };
  setNewAlert: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      target: string;
      isTriggered: boolean;
    }>
  >;
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  queryClient: any;
}) {
  try {
    if (!newAlert) {
      return;
    }
    const target = parseFloat(newAlert.target);
    const newAlertWithTarget = { ...newAlert, target };
    const response = await axios.post("/api/alerts", newAlertWithTarget);
    if (response.status === 200) {
      setNewAlert({
        name: "",
        description: "",
        target: "",
        isTriggered: false,
      });
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      setShowAddForm(false);
      return response.data;
    }
  } catch (error) {
    console.error("Error in handleAddAlert:", error);
  }
}

export async function getAllAlerts() {
  try {
    const response = await axios.get("/api/alerts");
    return response.data;
  } catch (error) {
    console.error("Error in getAllAlerts:", error);
  }
}

export async function toggleAlert(
  { newFields, setNewFields, alert, setToggleTarget }: ToggleAlertParams,
  queryClient: any
) {
  try {
    const target = parseFloat(newFields.target);
    const newFieldsWithTarget = { ...newFields, target };
    const response = await axios.put("/api/alerts", {
      id: alert.id,
      description: newFieldsWithTarget.description,
      target: newFieldsWithTarget.target.toString(),
      isTriggered: newFieldsWithTarget.isTriggered,
    });
    if (response.status === 200) {
      setToggleTarget((prev) => ({ ...prev, [alert.id]: !prev[alert.id] }));
      setNewFields({
        description: "",
        target: "",
        isTriggered: false,
      });
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      return response.data;
    }
  } catch (error) {
    console.error("Error in toggleAlert:", error);
  }
}

export async function deleteAlert({
  alertId,
  queryClient,
}: {
  alertId: number;
  queryClient: any;
}) {
  try {
    const response = await axios.delete(`/api/alerts/${alertId}`);

    // Check for success status (2xx range)
    if (response.status >= 200 && response.status < 300) {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      return response.data;
    }

    // Handle non-success responses
    const errorMessage = response.data?.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(`Failed to delete alert: ${errorMessage}`);
  } catch (error) {
    // Re-throw axios errors or custom errors
    if (error instanceof Error) {
      throw error;
    }

    // Handle unexpected errors
    console.error("Unexpected error in deleteAlert:", error);
    throw new Error(`Failed to delete alert: ${error}`);
  }
}