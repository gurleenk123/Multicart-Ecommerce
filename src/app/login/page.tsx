"use client";
import React, { useEffect, useState } from 'react'

export default function page() {
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setButtonDisabled(!isFormValid());
  }, [formData]);

  const isFormValid = () => {
    return (
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.password.length > 5 &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6">
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">
       Login
      </h2>

      {apiError && (
        <div className="mb-3 text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

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
          {loading ? "Loging In..." : "Login"}
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

    </div>
    </div>
    </div>
  )
}
