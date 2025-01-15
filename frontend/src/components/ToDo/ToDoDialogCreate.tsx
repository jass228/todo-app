"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ToastPopup from "../../types/toast-popup";
import { API_ENDPOINTS } from "@/config/api";
import { APIResponse } from "@/types/api";

interface ToDoDialogCreateProps {
  initialTodos: (task: APIResponse) => void;
}

const ToDoDialogCreate = ({ initialTodos }: ToDoDialogCreateProps) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setNewTodoTitle("");
    setNewTodoDescription("");
    setIsDialogOpen(false);
  };

  const createTodo = async () => {
    if (newTodoTitle.trim() !== "") {
      setIsLoading(true);

      try {
        const response = await fetch(`${API_ENDPOINTS}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newTodoTitle.trim(),
            description: newTodoDescription.trim(),
          }),
        });

        if (!response.ok) throw new Error("Failed to add task");

        const data = await response.json();
        initialTodos(data);
        handleClose();
        ToastPopup("Task created successfully", "success");
      } catch (error) {
        const errorText = "Failed to create task";
        console.error(`${errorText}:`, error);
        // Here to show an error message to the user
        ToastPopup(errorText, "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto">
            <PlusCircle className="h-4 w-4" /> Create Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Input
              type="text"
              placeholder="Task title"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
            />
            <Textarea
              placeholder="Task description (optional)"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                disabled={isLoading}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                onClick={createTodo}
                disabled={isLoading || !newTodoTitle.trim()}
              >
                {isLoading ? "Adding..." : "Add Task"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ToDoDialogCreate;
