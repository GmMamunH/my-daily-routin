import axios from "axios";
import React, { useEffect, useState } from "react";
const API_URL = "http://localhost:4040/api/tasks";
// const API_URL = "https://my-daily-task-server.vercel.app/api/tasks";

export const AddTasks = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Fetched Todos:", response.data);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post(API_URL, { title: newTodo });
      console.log("Added Todo:", response.data);
      setTodos([response.data, ...todos]); //if ...todos write fist the post add last
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Start editing
  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.title);
  };

  // Update todo
  const updateTodo = async (id) => {
    try {
      const todoToUpdate = todos.find((todo) => todo._id === id);
      if (!todoToUpdate) return;

      const response = await axios.patch(`${API_URL}/${id}`, {
        title: editText,
        completed: todoToUpdate.completed,
      });
      // console.log("Updated Todo:", response.data);

      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingId(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Toggle complete
  const toggleComplete = async (id) => {
    try {
      const todoToToggle = todos.find((t) => t._id === id);
      if (!todoToToggle) return;

      // console.log("Before Toggle:", todoToToggle);
      const response = await axios.patch(`${API_URL}/${id}`, {
        title: todoToToggle.title,
        completed: !todoToToggle.completed,
      });
      // console.log("After Toggle:", response.data);

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response.data : todo))
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>

      <form onSubmit={addTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a new todo..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center p-3 bg-white rounded shadow"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id)}
              className="mr-3"
            />

            {editingId === todo._id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-1 border rounded"
                />
                <button
                  onClick={() => updateTodo(todo._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span
                  className={`flex-1 ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => startEditing(todo)}
                  className="text-blue-500 mr-2 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
