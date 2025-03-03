const API_URL = "https://my-daily-task-server.vercel.app/api/tasks";

export const getTodos = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addTodo = async (todo) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export const deleteTodo = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

export const updateTodo = async (id, updatedTodo) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  });
  return response.json();
};
