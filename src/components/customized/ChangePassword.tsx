"use client";
import React, { useState } from "react";
import {
  handlePasswordSubmit,
  validatePassword,
} from "../functions/handlePasswordSubmit";

export default function ChangePassword({
  setShowPasswordChangeAction,
}: {
  setShowPasswordChangeAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (!validPassword) {
        // Prima fase → validazione password attuale
        await validatePassword({
          password,
          setErrorMessage,
          setValidPassword,
        });
      } else {
        // Seconda fase → aggiornamento password
        const response = await handlePasswordSubmit({
          password: newPassword,
          prevPassword: password,
          setIsSuccess,
          setErrorMessage,
        });
        if(response){
          setTimeout(() => {
            setShowPasswordChangeAction(false);
          }, 2000);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-yellow-400 font-medium">🔑 Change Password</h3>

      <div className="space-y-3">
        {/* Campo password attuale */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter current password"
          disabled={isLoading || isSuccess || validPassword}
          className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${
            errorMessage
              ? "border-red-400"
              : validPassword
              ? "border-green-400"
              : "border-yellow-400/30 focus:border-yellow-400"
          } text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all`}
        />

        {/* Messaggi di stato */}
        {errorMessage && (
          <p className="text-red-400 text-sm animate-fade-in">
            ⚠️ {errorMessage}
          </p>
        )}
        {validPassword && !errorMessage && (
          <p className="text-green-400 text-sm animate-fade-in">
            ✅ Valid password
          </p>
        )}

        {/* Campo nuova password che compare solo dopo validazione */}
        {validPassword && (
          <div className="animate-fade-in mt-2">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              disabled={isLoading || isSuccess}
              className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${
                errorMessage
                  ? "border-red-400"
                  : "border-yellow-400/30 focus:border-yellow-400"
              } text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all`}
            />
          </div>
        )}
      </div>

      {/* Pulsanti */}
      <div className="flex gap-2">
        <button
          onClick={handleClick}
          disabled={isLoading || isSuccess}
          className={`flex-1 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
            isSuccess
              ? "bg-green-400 text-white cursor-not-allowed"
              : isLoading
              ? "bg-yellow-400/70 text-black cursor-not-allowed"
              : "bg-yellow-400 text-black hover:bg-yellow-300 active:scale-95"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : isSuccess ? (
            "Password Updated!"
          ) : !validPassword ? (
            "Validate Password"
          ) : (
            "Update Password"
          )}
        </button>

        <button
          onClick={() => setShowPasswordChangeAction(false)}
          disabled={isLoading}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>

      {/* Messaggio finale */}
      {isSuccess && (
        <div className="p-3 bg-green-900/20 border border-green-400/30 rounded-lg animate-fade-in">
          <p className="text-green-400 text-sm">
            ✅ Password successfully updated!
          </p>
        </div>
      )}
    </div>
  );
}
