import { Link } from "react-router-dom";
import { useTasks } from "../context/UseTasks";
import { useAuth } from "../context/UseAuth";
import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import AlertTaskComponent from "../components/AlertTaskComponent";

function TaskPage() {
  const { fetchTasks, manualFetchTasks, tasks } = useTasks();
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();

    const intervalId = setInterval(fetchTasks, 10000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-zinc-700 justify-between py-5 px-10 m-4 rounded-lg">
      <h1 className="text-2xl font-bold">Welcome {user.username}!</h1>
      <div className="flex justify-between mt-4 mb-4">
        <h4 className="text-2xl">List of Tasks ({tasks.length})</h4>
        <div>
        <Link
            onClick={manualFetchTasks}
            className="bg-blue-600 px-4 py-1 rounded-sm mr-2"
          >
            Refresh
          </Link>
          <Link
            to="/tasks/add-task"
            className="bg-green-600 px-4 py-1 rounded-sm"
          >
            Add Task
          </Link>
        </div>
      </div>
      <AlertTaskComponent />
      <div>
        {tasks.length === 0 ? (
          <>
            <p>You have no tasks.</p>
          </>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskPage;
