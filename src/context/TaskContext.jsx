import PropTypes from "prop-types";
import { useEffect } from "react";
import { createContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from "../api/task";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout();
    }
  }, [message]);

  async function fetchTasks() {
    await getTasksRequest().then((response) => {
      const taskList = response.data.tasks;
      setTasks(taskList);
    });
  }

  async function manualFetchTasks() {
    setMessage("Searching for tasks...");
    await fetchTasks();
  }

  async function fetchTaskById(taskId) {
    var response;

    try {
      response = await getTaskRequest(taskId);
    } catch (err) {
      response = err.response;
    }

    return response;
  }

  async function addTask(task) {
    await createTaskRequest(task).then(async (response) => {
      switch (response.status) {
        case 201:
          setMessage("Task created successfully!");
          await fetchTasks();
          break;
        case 400:
          setMessage("Error: " + response.data.message);
          break;
        case 500:
          setMessage("Error: " + response.data.message);
          break;
        default:
          setMessage("Error: " + response.data.message);
          break;
      }
    });
  }

  async function updateTask(taskId, task) {
    await updateTaskRequest(taskId, task).then(async (response) => {
      switch (response.status) {
        case 200:
          setMessage("Task updated successfully!");
          await fetchTasks();
          break;
        case 400:
          setMessage("Error: " + response.data.message);
          break;
        case 500:
          setMessage("Error: " + response.data.message);
          break;
        default:
          setMessage("Error: " + response.data.message);
          break;
      }
    });
  }

  async function deleteTask(taskId) {
    await deleteTaskRequest(taskId).then(async (response) => {
      switch (response.status) {
        case 204:
          setMessage("Task deleted successfully!");
          await fetchTasks();
          break;
        case 400:
          setMessage("Error: " + response.data.message);
          break;
        case 500:
          setMessage("Error: " + response.data.message);
          break;
        default:
          setMessage("Error: " + response.data.message);
          break;
      }
    });
  }

  async function clearTasks() {
    setTasks([]);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        message,
        fetchTasks,
        manualFetchTasks,
        fetchTaskById,
        addTask,
        updateTask,
        deleteTask,
        clearTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TaskContext;
