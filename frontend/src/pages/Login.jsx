import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const res = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}

        <div className="hidden md:flex bg-slate-900 text-white p-10 flex-col justify-center">

          <h1 className="text-5xl font-bold mb-4">
            TaskFlow
          </h1>

          <p className="text-slate-300 text-lg">
            Organize your tasks, boost productivity
            and manage your work efficiently.
          </p>

        </div>

        {/* Right Side */}

        <div className="p-10">

          <h2 className="text-3xl font-bold mb-2">
            Welcome Back 
          </h2>

          <p className="text-slate-500 mb-8">
            Sign in to continue
          </p>

          <form onSubmit={handleSubmit}>

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
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl transition"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6 text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;