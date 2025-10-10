"use client";
import React, { useState } from "react";
import ChangeEmail from "../customized/ChangeEmail";
import ChangePassword from "../customized/ChangePassword";
export default function SecurityTab() {
  const [showEmailChange, setShowEmailChange] = useState<boolean>(false);
  const [showPasswordChange, setShowPasswordChange] = useState<boolean>(false);
  return (
    <div className="space-y-6 animate-fade-in-up ">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        🔒 Security Settings
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {/* Colonna sinistra */}
        <div className="space-y-4">
          {/* Sezione email */}
          <div className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg animate-scale-in stagger-1">
            {showEmailChange ? (
              <ChangeEmail setShowEmailChangeAction={setShowEmailChange} />
            ) : (
              <>
                <h3 className="text-yellow-400 font-medium mb-2">📧 Email</h3>
                <p className="text-yellow-400/70 text-sm mb-3">
                💡 Fun fact: People send over 300 billion emails every day!
                </p>              
                <button
                  onClick={() => setShowEmailChange(true)}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-all button-press"
                >
                  Change Email
                </button>
              </>
            )}
          </div>

          {/* Sezione password */}
          <div className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg animate-scale-in stagger-2">
            {showPasswordChange ? (
              <ChangePassword
                setShowPasswordChangeAction={setShowPasswordChange}
              />
            ) : (
              <>
                <h3 className="text-yellow-400 font-medium mb-2">
                  🔑 Password
                </h3>
                <p className="text-yellow-400/70 text-sm mb-3">
                💡 Fun fact: ‘123456’ is still the most common password!
                </p>
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-all button-press"
                >
                  Change Password
                </button>
              </>
            )}
          </div>
        </div>

        {/* Colonna destra */}
        {/* <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg animate-scale-in stagger-3">
            <h3 className="text-yellow-400 font-medium mb-2">
              📱 Active Sessions
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-yellow-400/70 text-sm">
                  Current Device
                </span>
                <span className="text-green-400 text-sm">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-400/70 text-sm">iPhone 14</span>
                <button className="text-red-400 text-sm hover:text-red-300">
                  Revoke
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
