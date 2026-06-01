import { useState } from "react";

function Dashboard() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Frontend UI",
      description: "Build React screens",
      stage: "Todo"
    },
    {
      id: 2,
      title: "Backend API",
      description: "Create FastAPI routes",
      stage: "In Progress"
    }
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState("Todo");

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const createTask = () => {

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      stage
    };

    setTasks([
      ...tasks,
      newTask
    ]);

    resetForm();
  };

  const editTask = (task) => {

    setEditingId(task.id);

    setTitle(task.title);

    setDescription(task.description);

    setStage(task.stage);
  };

  const updateTask = () => {

    setTasks(
      tasks.map(task =>
        task.id === editingId
          ? {
              ...task,
              title,
              description,
              stage
            }
          : task
      )
    );

    resetForm();
  };

  const deleteTask = (id) => {

    setTasks(
      tasks.filter(
        task => task.id !== id
      )
    );
  };

  const resetForm = () => {

    setTitle("");
    setDescription("");
    setStage("Todo");

    setEditingId(null);

    setError("");
  };

  return (
    <div className="dashboard">

      <h1>My Tasks</h1>

      {error && (
        <p
          style={{
            color: "red"
          }}
        >
          {error}
        </p>
      )}

      <div className="task-form">

        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <select
          value={stage}
          onChange={(e) =>
            setStage(e.target.value)
          }
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <button
          onClick={
            editingId
              ? updateTask
              : createTask
          }
        >
          {
            editingId
              ? "Update Task"
              : "Add Task"
          }
        </button>

      </div>

      <div className="task-list">

        {tasks.map(task => (

          <div
            key={task.id}
            className="task-card"
          >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <span>{task.stage}</span>

            <div
              style={{
                marginTop: "12px"
              }}
            >

              <button
                onClick={() =>
                  editTask(task)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteTask(task.id)
                }
                style={{
                  marginLeft: "8px",
                  background: "#dc2626"
                }}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;