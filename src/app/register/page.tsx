"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");

  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const roles = ["User", "Vendor", "Admin"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const formData = {
        name,
        email,
        password,
        role,
      };

      console.log("Submitted Data:", formData);
      const result = await axios.post("/api/auth/register", formData);
      

    }
    catch (error) {


    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Select Your Role</h2>
            <div className="space-y-3">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`w-full py-2 rounded-lg border ${role === r
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-100"
                    }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              disabled={!role}
              onClick={() => setStep(2)}
              className="mt-6 w-full bg-black text-white py-2 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Create Account ({role})
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border p-2 rounded-lg pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Sign Up
              </button>
            </form>

            <div className="my-4 text-center text-gray-500">OR</div>

            <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 underline">
                Log in
              </Link>
            </div>

            <button
              onClick={() => setStep(1)}
              className="mt-3 text-sm text-blue-500 underline block mx-auto"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}