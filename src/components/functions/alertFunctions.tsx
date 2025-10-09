import axios from "axios";
import React from "react";
import { ToggleAlertParams } from "@/lib/types/generic";
import { useQueryClient } from "@tanstack/react-query";

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
    console.log(error);
  }
}

export async function getAllAlerts() {
  try {
    const response = await axios.get("/api/alerts");
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(alertId);
    const response = axios.delete(`/api/alerts/${alertId}`);
    if (!response) {
      console.log({ error: (await response).data });
      return (await response).data;
    }
    queryClient.invalidateQueries({ queryKey: ["alerts"] });
    return (await response).data;
  } catch (error) {
    console.error({ error: error });
    return error;
  }
}
