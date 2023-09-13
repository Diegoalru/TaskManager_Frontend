import { useTasks } from '../context/UseTasks'

function AlertTaskComponent() {
  const { message } = useTasks()

  return (
    <>
      {message && (
        <div className="bg-green-500 text-center text-white px-4 py-2 rounded-md my-2">
          {message}
        </div>
      )}
    </>
  )
}

export default AlertTaskComponent