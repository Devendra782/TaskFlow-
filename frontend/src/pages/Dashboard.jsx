import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchStats();
    fetchTasks();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/tasks/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", formData);

      setFormData({
        title: "",
        description: "",
      });

      fetchTasks();
      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      fetchTasks();
      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (id) => {
    try {
      await api.put(`/tasks/${id}`);

      fetchTasks();
      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}

      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              TaskFlow
            </h1>

            <p className="text-sm text-slate-500">
              Task Management Platform
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-xl transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Welcome */}

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900">
            Welcome back,
            <span className="text-indigo-600">
              {" "}
              {user?.name || "User"} 👋
            </span>
          </h2>

          <p className="text-slate-500 mt-2">
            Organize, track and manage your daily tasks.
          </p>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-slate-500 text-sm">
              Total Tasks
            </p>

            <h3 className="text-4xl font-bold mt-3">
              {stats.totalTasks}
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-slate-500 text-sm">
              Completed
            </p>

            <h3 className="text-4xl font-bold text-emerald-600 mt-3">
              {stats.completedTasks}
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-slate-500 text-sm">
              Pending
            </p>

            <h3 className="text-4xl font-bold text-orange-500 mt-3">
              {stats.pendingTasks}
            </h3>
          </div>

        </div>

        {/* Add Task */}

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-10">

          <h2 className="text-2xl font-bold mb-5">
            Create New Task
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <textarea
              name="description"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-slate-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
            >
              Add Task
            </button>
          </form>

        </div>

        {/* Tasks */}

        <div>

          <h2 className="text-2xl font-bold mb-5">
            My Tasks
          </h2>

          {tasks.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
              <h3 className="text-xl font-semibold">
                No Tasks Yet
              </h3>

              <p className="text-slate-500 mt-2">
                Create your first task to get started.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition mb-5"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h3 className="text-xl font-bold">
                      {task.title}
                    </h3>

                    <p className="text-slate-600 mt-2">
                      {task.description}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      task.status === "Completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {task.status}
                  </span>

                </div>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() =>
                      updateTaskStatus(task._id)
                    }
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl transition"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(task._id)
                    }
                    className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl transition"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;