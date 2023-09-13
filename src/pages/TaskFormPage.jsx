import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/UseTasks";
import { useEffect, useState } from "react";

function TaskFormPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const { addTask, updateTask, fetchTaskById } = useTasks();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTask(id) {
      const response = await fetchTaskById(id);

      switch (response.status) {
        case 200: {
          const task = response.data.task;
          setValue("title", task.title);
          setValue("description", task.description);
          setValue("status", task.status);
          break;
        }
        case 400:
          setError("Error: " + response.data.message);
          break;
        case 500:
          setError("Error: " + response.data.message);
          break;
        default:
          setError("Error: " + response.data.message);
          break;
      }
    }

    if (params.id && params.id !== "add-task") {
      loadTask(params.id);
    }
  }, [params, params.id, setValue, fetchTaskById]);

  useEffect(() => {
    // Show error message for 4 seconds
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 4000);

      return () => clearTimeout();
    }
  }, [error]);

  const onSubmit = handleSubmit((task) => {
    if (!task || !task.title || !task.description) {
      return;
    }

    switch (params.id) {
      case "add-task":
        addTask(task)
          .then(() => {
            navigate("/tasks");
          })
          .catch((error) => {
            setError("Error while adding task");
            console.error(error);
          });
        break;
      default:
        console.log("Updating task...");
        updateTask(params.id, task).then(() => {
          navigate("/tasks");
        })
        .catch((error) => {
          setError("Error while updating task");
          console.error(error);
        });
    }
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-center text-2xl font-bold mb-4">
            {params.id === "add-task" ? "New task" : "Edit Task"}
          </h1>
          {error && (
            <div className="bg-red-500 text-center text-white p-2 rounded-md mb-4">
              {error}
            </div>
          )}
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />

          <textarea
            rows="3"
            placeholder="Description"
            {...register("description", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>
          {params.id !== "add-task" && (
            <div className="bg-zinc-700 grid grid-cols-2 items-center p-2 rounded-sm">
              <label htmlFor="status" className="text-center">
                Is task done?
              </label>
              <input
                type="checkbox"
                {...register("status")}
                className="justify-self-start mx-2"
              />
            </div>
          )}
          <button type="submit">Save</button>
          <br />
          <Link to="/tasks">Back</Link>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
