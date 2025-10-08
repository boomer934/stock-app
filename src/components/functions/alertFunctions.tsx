import axios from "axios";
import React from "react";
import { Alert } from "@/lib/types/generic";
import { ToggleAlertParams } from "@/lib/types/generic";

export async function handleAddAlert({
  newAlert,
  setNewAlert,
  setShowAddForm
}: {
  newAlert: {
    name: string;
    description: string;
    target: string;
    isTriggered: boolean;
  };
  setNewAlert:React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    target: string;
    isTriggered: boolean;
  }>>;
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    try {
        if(!newAlert){
            return
        }
        const target = parseFloat(newAlert.target)
        const newAlertWithTarget = {...newAlert, target}
        const response = await axios.post("/api/alerts",newAlertWithTarget)
    if(response.status === 200){
        setNewAlert({
            name: "",
            description: "",
            target: "",
            isTriggered: false
        })
        setShowAddForm(false)
        return response.data
    }
    } catch (error) {
        console.log(error)
    }
}

export async function getAllAlerts(){
    try {
        const response = await axios.get("/api/alerts")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function toggleAlert({newFields,setNewFields,alert, setToggleTarget}: ToggleAlertParams){
    try {
        const target = parseFloat(newFields.target)
        const newFieldsWithTarget = {...newFields, target}
        const response = await axios.put("/api/alerts",{newFieldsWithTarget})
        if(response.status === 200){
            setToggleTarget(prev => ({...prev, [alert.id]: !prev[alert.id]}))
            setNewFields({
                description: "",
                target: ""
            })
        }
    } catch (error) {
        console.log(error)
    }
}
    
    