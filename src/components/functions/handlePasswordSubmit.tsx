import axios from "axios";

export async function handlePasswordSubmit({
  password,
  prevPassword,
  setIsSuccess,
  setErrorMessage,
}: {
  password: string;
  prevPassword: string;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
    try {
      if(password.length < 8){
        setErrorMessage("Password must contain at least 8 characters");
        setIsSuccess(false);
        return null;
      }
      if(prevPassword === password){
        setErrorMessage("Password cannot be the same as the previous one");
        setIsSuccess(false);
        return null;
      }
        const response = await axios.put("/api/user/update-password", { password });
        if (!response) {
            setErrorMessage("Error updating password");
            setIsSuccess(false);
            return null;
        }
        setIsSuccess(true);
        return response.data;
    } catch (error) {
        console.error({error})
        setErrorMessage(error.message)
        return error.message
    }
}


export async function validatePassword({
  password,
  setErrorMessage,
  setValidPassword,
}: {
  password: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setValidPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  try {
    const response = await axios.post("/api/user/validate-password", { password });

    if (!response.data?.valid) {
      setErrorMessage("Password is not valid");
      setValidPassword(false);
      return null;
    }

    setValidPassword(true);
    return response.data;
  } catch (error: any) {
    console.error("Error validating password:", error);

    // Gestione errori da Axios (API)
    if (axios.isAxiosError(error)) {
      setErrorMessage(error.response?.data?.message || "Error validating password.");
    } else {
      setErrorMessage("Unknown error during validation.");
    }

    setValidPassword(false);
    return null;
  }
}
