"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const roles = ["User", "Vendor", "Admin"];

  useEffect(() => {
    setButtonDisabled(!isFormValid());
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (data: any) => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.password.length > 5 &&
      Object.keys(errors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setApiError("");

      const dataToSend = {
        ...formData,
        role,
      };

      const result = await axios.post("/api/auth/register", dataToSend);

      console.log(result.data);

      setFormData({ name: "", email: "", password: "" });
      setErrors({});
      router.push("/login");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";

      setApiError(message);
    } finally {
      setLoading(false);
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

            {apiError && (
              <div className="mb-3 text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button

                type="submit"
                disabled={loading || buttonDisabled}
                className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <div className="my-4 text-center text-gray-500">OR</div>

            <button
              disabled={loading}
              className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 disabled:opacity-50"
            >
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