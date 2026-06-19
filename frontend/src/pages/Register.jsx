import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/auth/register",
        formData
      );

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}

        <div className="hidden md:flex bg-slate-900 text-white p-10 flex-col justify-center">

          <h1 className="text-5xl font-bold mb-4">
            Join TaskFlow
          </h1>

          <p className="text-indigo-100 text-lg">
            Create your account and start managing
            tasks like a professional.
          </p>

        </div>

        {/* Right Side */}

        <div className="p-10">

          <h2 className="text-3xl font-bold mb-2">
            Create Account 
          </h2>

          <p className="text-slate-500 mb-8">
            Get started in seconds
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full border border-slate-300 rounded-xl p-3 mb-4"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border border-slate-300 rounded-xl p-3 mb-4"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-slate-300 rounded-xl p-3 mb-5"
              onChange={handleChange}
              required
            />

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition"
            >
              Create Account
            </button>

          </form>

          <p className="text-center mt-6 text-slate-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-indigo-600 font-medium"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;