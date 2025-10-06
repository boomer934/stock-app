import axios from "axios";
import { UserProps } from "@/lib/types/generic";

export async function handleLogout({ user, setUser }: UserProps) {
  try {
    // Clear user state first
    setUser(null);

    // Call logout API
    const response = await axios.post("/api/logout");

    if (response.status === 200) {
      // Navigate to login page using window.location
      window.location.href = "/login";
    } else {
      console.error("Error logging out:", response.data);
      // Even if API fails, redirect to login
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Error logging out:", error);
    // Even if there's an error, redirect to login
    window.location.href = "/login";
  }
}
