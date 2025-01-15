"use client";
import React, { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import ToDoDialogCreate from "./ToDoDialogCreate";
import ToDoFilterButton from "./ToDoFilterButton";
import { APIResponse } from "@/types/api";
import { FilterType } from "@/types/filter";
import { Card } from "../ui/card";
import ToastPopup from "@/types/toast-popup";
import { API_ENDPOINTS } from "@/config/api";

const ToDoList = () => {
  const [todos, setTodos] = useState<APIResponse[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoading, setIsLoading] = useState(true);

  const filteredTodos = todos
    .sort((a, b) => {
      if (!a.completed && b.completed) return -1;
      if (a.completed && !b.completed) return 1;
      return 0;
    })
    .filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });

  // Get todo data
  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS}/`);

      if (!response.ok) throw new Error("Failed to fetch task");

      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
      // Here to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleTaskAdded = (newTask: APIResponse) => {
    setTodos([...todos, newTask]);
  };

  // Update completed todo
  const toggleTodo = async (todo: APIResponse) => {
    try {
      const response = await fetch(`${API_ENDPOINTS}/${todo.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: todo.title,
          completed: !todo.completed,
        }),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      const data = await response.json();
      setTodos(todos.map((t) => (t.id === data.id ? data : t)));
      ToastPopup("Task updated successfully", "success");
    } catch (error) {
      const errorText = "Failed to update task";
      console.error(`${errorText}:`, error);
      // Here to show an error message to the user
      ToastPopup(errorText, "error");
    }
  };

  const updateTodo = (updatedTodo: APIResponse) => {
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
  };

  // Delete task
  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINTS}/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");

      setTodos(todos.filter((todo) => todo.id !== id));
      ToastPopup("Task deleted successfully", "success");
    } catch (error) {
      const errorText = "Failed to delete task";
      console.error(`${errorText}:`, error);
      // Here to show an error message to the user
      ToastPopup(errorText, "error");
    }
  };

  return (
    <div className="w-2/3 max-w-2xl mx-auto p-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
        {todos.length > 0 && (
          <div className="flex space-x-2 w-full sm:w-auto">
            <ToDoFilterButton
              currentFilter={filter}
              onFilterChange={setFilter}
            />
          </div>
        )}
        <ToDoDialogCreate initialTodos={handleTaskAdded} />
      </div>

      {isLoading ? (
        <Card className="p-6">
          <p className="text-center text-muted-foreground">Loading tasks...</p>
        </Card>
      ) : filteredTodos.length === 0 ? (
        <Card className="p-6">
          <p className="text-center text-gray-500">
            {todos.length === 0
              ? "No tasks yet. Add one to get started!"
              : "No tasks match the current filter."}
          </p>
        </Card>
      ) : (
        filteredTodos.map((todo) => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTask}
            onToggle={toggleTodo}
            onUpdate={updateTodo}
          />
        ))
      )}
    </div>
  );
};

export default ToDoList;
