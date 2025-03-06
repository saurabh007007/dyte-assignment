import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { toast } from "react-hot-toast";
import { Mail, Lock, User } from "lucide-react";

type AuthMode = "signin" | "signup" | "reset";

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Successfully signed in!");
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Registration successful! Please check your email.");
      } else if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        toast.success("Password reset instructions sent to your email.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {mode === "signin"
              ? "Sign In"
              : mode === "signup"
              ? "Create Account"
              : "Reset Password"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            {mode !== "reset" && (
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading
                ? "Processing..."
                : mode === "signin"
                ? "Sign In"
                : mode === "signup"
                ? "Sign Up"
                : "Reset Password"}
            </button>
          </div>
        </form>

        <div className="flex flex-col space-y-2 text-sm text-center">
          {mode === "signin" && (
            <>
              <button
                onClick={() => setMode("signup")}
                className="text-indigo-600 hover:text-indigo-500"
              >
                Create new account
              </button>
              <button
                onClick={() => setMode("reset")}
                className="text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </button>
            </>
          )}
          {(mode === "signup" || mode === "reset") && (
            <button
              onClick={() => setMode("signin")}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
