"use client";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../contextProvider/AppProvider";
import { putUser } from "../functions/putUser";
export default function ChangeEmail({
  setShowEmailChangeAction,
}: {
  setShowEmailChangeAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user, setUser } = useUserContext();
  const [email, setEmail] = useState<string>("");
  return (
    <div className="space-y-4">
      <h3 className="text-yellow-400 font-medium mb-2">📧 Email</h3>
      <input
        type="email"
        value={email || ""}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="w-full bg-gray-800 border border-yellow-400/30 rounded-lg px-4 py-3 text-yellow-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
      />
      <button
        onClick={() => {
          putUser({email,prevEmail:user.email})
          setUser((prev) => ({ ...prev, email }))
        }}
        className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-all button-press"
      >
        Change Email
      </button>
      <button
        onClick={() => setShowEmailChangeAction(false)}
        className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-all button-press"
      >
        Cancel
      </button>
    </div>
  );
}
