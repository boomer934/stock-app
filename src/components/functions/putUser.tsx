import axios from "axios";

export async function putUser({ email, prevEmail }: { email: string, prevEmail: string }) {
  try {
    const response = await axios.put("/api/user", { email, prevEmail });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
