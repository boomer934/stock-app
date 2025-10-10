"use client";
import React, { useState } from "react";
import { useUserContext } from "../contextProvider/AppProvider";
import { putUser } from "../functions/putUser";

export default function ChangeEmail({
  setShowEmailChangeAction,
}: {
  setShowEmailChangeAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user, setUser } = useUserContext();
  const [email, setEmail] = useState<string>(user?.email || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (): boolean => {
    if (!email) {
      setErrorMessage("Email cannot be empty");
      return false;
    }
    if (email === user?.email) {
      setErrorMessage("Please enter a new email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setErrorMessage(""); // reset
    if (!validateEmail()) return;

    setIsLoading(true);
    try {
      const result = await putUser({ email, prevEmail: user?.email || "" });

      if (result) {
        setUser((prev) => ({ ...prev, email }));
        setIsSuccess(true);

        // auto chiusura del form dopo 2 secondi
        setTimeout(() => {
          setIsSuccess(false);
          setShowEmailChangeAction(false);
        }, 2000);
      } else {
        setErrorMessage("Failed to update email. Please try again.");
      }
    } catch (error) {
      console.error("Error updating email:", error);
      setErrorMessage("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-yellow-400 font-medium">📧 Change Email</h3>

      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter new email address"
          disabled={isLoading || isSuccess}
          className={`w-full px-4 py-3 rounded-lg ring-2 focus:outline-none focus:ring-2
             ring-yellow-400/50 focus:ring-yellow-400  transition-all text-yellow-400 ${
            errorMessage
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
              : "border-yellow-400/30 focus:border-yellow-400 focus:ring-yellow-400/20"
          }`}
        />
        {errorMessage && (
          <p className="text-red-400 text-sm mt-1">{errorMessage}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={isLoading || isSuccess}
          className={`flex-1 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
            isSuccess
              ? "bg-green-400 text-white cursor-not-allowed"
              : isLoading
              ? "bg-yellow-400/70 text-black cursor-not-allowed"
              : "bg-yellow-400 text-black hover:bg-yellow-300 active:scale-95"
          }`}
        >
          {isLoading
            ? "Updating..."
            : isSuccess
            ? "Email Updated!"
            : "Update Email"}
        </button>

        <button
          onClick={() => setShowEmailChangeAction(false)}
          disabled={isLoading}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>

      {isSuccess && (
        <div className="p-3 bg-green-900/20 border border-green-400/30 rounded-lg mt-2">
          <p className="text-green-400 text-sm">
            ✅ Email successfully updated! A verification email has been sent.
          </p>
        </div>
      )}
    </div>
  );
}
