"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import {newPasswordSchema} from '../../lib/validationSchema';

// Password Input Component with Eye Icon
  const PasswordInput = ({ 
    value, 
    onChange, 
    placeholder, 
    showPassword, 
    setShowPassword 
  }) => (
    <div className="relative mb-3">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-lg border pr-10"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );

export default function PasswordSettings() {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordStep, setPasswordStep] = useState(1);
  const [forgotFlow, setForgotFlow] = useState(false);

  // Form data
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Loader + error
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Step 1 API: Verify current email & password
  const handleVerifyCredentials = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        `https://appsailmockdata-10102165915.development.catalystappsail.com/api/userList/login`,
        { email, password: currentPassword }
      );
      console.log(response);

      if (response.status === 200 && response.data) {
        const response2 = await axios.post(
        `https://appsailmockdata-10102165915.development.catalystappsail.com/api/userList/generateOTPOLD`,
        {Email: email}
      );
      console.log(response2);
        setPasswordStep(2); // Go to OTP step
      } else {
        setMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Verify credentials error:", error);
      setMessage("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2 API: Verify OTP
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response3 = await axios.post(
        `https://appsailmockdata-10102165915.development.catalystappsail.com/api/userList/verifyOTPOLD`,
        { Email: email, OTP: otp }
      );
      console.log(response3);

      if (response3.status === 200 && response3.data) {
        setPasswordStep(3); // Go to new password step
      } else {
        setMessage("Invalid OTP. Try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setMessage("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 3 API: Change Password
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response4 = await axios.patch(
        `https://appsailmockdata-10102165915.development.catalystappsail.com/api/userList/updatePasswordOLD`,
        { Email: email, OTP: otp, Password: newPassword }
      );
      console.log(response4);

      if (response4.status === 200 && response4.data) {
        setMessage("Password updated successfully!");
        setIsEditingPassword(false);
        setPasswordStep(1);
        // Reset visibility states
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
      } else {
        setMessage("Password update failed");
      }
    } catch (error) {
      console.error("Password update error:", error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Forgot password: Send OTP to email
  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response5 = await axios.post(
        `https://appsailmockdata-10102165915.development.catalystappsail.com/api/userList/generateOTPOLD`,
        { Email: email }
      );
      console.log(response5);

      if (response5.status === 200 && response5.data) {
        setPasswordStep(2);
        setMessage("OTP sent to your email");
      } else {
        setMessage("Email not found");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessage("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Password Setting Card */}
      <div
        className="p-6 rounded-2xl shadow-lg bg-[var(--background)]"
        style={{ boxShadow: "0 4px 8px var(--shadow-color)" }}
      >
        <h2 className="text-lg font-semibold mb-4 text-[var(--foreground)]">
          Password
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-[var(--foreground)]">********</p>
            <p className="text-sm text-[var(--muted-foreground)]">
              Last changed 2 months ago
            </p>
          </div>
          <button
            onClick={() => setIsEditingPassword(true)}
            className="px-4 py-2 rounded-lg bg-[var(--color-secondary)] text-[var(--color-on-secondary)] hover:bg-[var(--color-secondary-hover)] transition"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      <AnimatePresence>
        {isEditingPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-background p-6 rounded-2xl shadow-lg w-full max-w-md relative mx-4"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsEditingPassword(false);
                  setPasswordStep(1);
                  setForgotFlow(false);
                  // Reset visibility states
                  setShowCurrentPassword(false);
                  setShowNewPassword(false);
                  setShowConfirmPassword(false);
                }}
                className="absolute top-3 right-3 text-[var(--muted-foreground)] hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Show message */}
              {message && (
                <p className={`text-sm mb-3 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                  {message}
                </p>
              )}

              {/* === Path A: Normal Flow === */}
              {!forgotFlow && (
                <>
                  {passwordStep === 1 && (
                    <>
                      <h2 className="text-lg font-semibold mb-4">
                        Verify Identity
                      </h2>
                      <input
                        type="email"
                        placeholder="Current Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border mb-3"
                      />
                      
                      <PasswordInput
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Current Password"
                        showPassword={showCurrentPassword}
                        setShowPassword={setShowCurrentPassword}
                      />
                      
                      <button
                        className="text-[var(--color-primary)] text-sm mb-4 hover:underline"
                        onClick={() => setForgotFlow(true)}
                      >
                        Forgot Password?
                      </button>

                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setIsEditingPassword(false)}
                          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleVerifyCredentials}
                          disabled={loading}
                          className="px-4 py-2 rounded-lg bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)]"
                        >
                          {loading ? "Verifying..." : "Continue"}
                        </button>
                      </div>
                    </>
                  )}

                  {passwordStep === 2 && (
                    <>
                      <h2 className="text-lg font-semibold mb-4">Verify OTP</h2>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border mb-4"
                      />
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setPasswordStep(1)}
                          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleVerifyOtp}
                          disabled={loading}
                          className="px-4 py-2 rounded-lg bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)]"
                        >
                          {loading ? "Verifying..." : "Verify"}
                        </button>
                      </div>
                    </>
                  )}

                  {passwordStep === 3 && (
                    <>
                      <h2 className="text-lg font-semibold mb-4">
                        Set New Password
                      </h2>
                      
                      <PasswordInput
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        showPassword={showNewPassword}
                        setShowPassword={setShowNewPassword}
                      />
                      
                      <PasswordInput
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm New Password"
                        showPassword={showConfirmPassword}
                        setShowPassword={setShowConfirmPassword}
                      />
                      
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setPasswordStep(2)}
                          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleChangePassword}
                          disabled={loading}
                          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                        >
                          {loading ? "Updating..." : "Update Password"}
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* === Path B: Forgot Password Flow === */}
              {forgotFlow && (
                <>
                  {passwordStep === 1 && (
                    <>
                      <h2 className="text-lg font-semibold mb-4">
                        Reset Password
                      </h2>
                      <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border mb-4"
                      />
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => {
                            setForgotFlow(false);
                            setIsEditingPassword(false);
                          }}
                          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleForgotPassword}
                          disabled={loading}
                          className="px-4 py-2 rounded-lg bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)]"
                        >
                          {loading ? "Sending..." : "Send Code"}
                        </button>
                      </div>
                    </>
                  )}

                  {passwordStep === 2 && (
                    <>
                      <h2 className="text-lg font-semibold mb-4">Verify OTP</h2>
                      <input
                        type="text"
                        placeholder="Enter Verification Code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border mb-4"
                      />
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setPasswordStep(1)}
                          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleVerifyOtp}
                          disabled={loading}
                          className="px-4 py-2 rounded-lg bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)]"
                        >
                          {loading ? "Verifying..." : "Verify"}
                        </button>
                      </div>
                    </>
                  )}

                  {passwordStep === 3 && (
                    <>
                      <h2 className="text-lg font-semibold mb-4">
                        Set New Password
                      </h2>
                      
                      <PasswordInput
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        showPassword={showNewPassword}
                        setShowPassword={setShowNewPassword}
                      />
                      
                      <PasswordInput
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        showPassword={showConfirmPassword}
                        setShowPassword={setShowConfirmPassword}
                      />
                      
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setPasswordStep(2)}
                          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleChangePassword}
                          disabled={loading}
                          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                        >
                          {loading ? "Updating..." : "Update Password"}
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}