import axios from "./axios";


export async function getTasksRequest() {
    return await axios.get("/task/tasks");
}

export async function getTaskRequest(id) {
    return await axios.get(`/task/task/${id}`);
}

export async function createTaskRequest(task) {
    return await axios.post("/task/task", task);
}

export async function updateTaskRequest(id, task) {
    return await axios.put(`/task/task/${id}`, task);
}

export async function updateTaskStatusRequest(id, task) {
    return await axios.put(`/task/task/status/${id}`, task);
}

export async function deleteTaskRequest(id) {
    return await axios.delete(`/task/task/${id}`);
}
