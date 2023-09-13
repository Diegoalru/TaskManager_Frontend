import PropTypes from "prop-types";
import { useTasks } from "../context/UseTasks";
import { Link } from "react-router-dom";

function TaskCard({ task }) {
  const { deleteTask, fetchTasks } = useTasks();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Link to={`/task/edit-task/${task.id}`}>
            edit
          </Link>
          <button
            onClick={() => {
              deleteTask(task.id);
              fetchTasks();
            }}
          >
            delete
          </button>
        </div>
      </header>
      <p className="text-slate-300">
        Date: {new Date(task.date).toLocaleDateString()}
      </p>
      <p className="text-slate-300">{task.description}</p>
      <p className="text-slate-300">
        Status: {task.status ? "Done" : "Pending"}
      </p>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskCard;
