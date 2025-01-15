"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { APIResponse } from "@/types/api";
import ToastPopup from "@/types/toast-popup";
import { API_ENDPOINTS } from "@/config/api";

interface ToDoDialogUpdateProps {
  todo: APIResponse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskUpdated: (task: APIResponse) => void;
}

const ToDoDialogUpdate = ({
  todo,
  open,
  onOpenChange,
  onTaskUpdated,
}: ToDoDialogUpdateProps) => {
  const [titleUpdateTodo, setTitleUpdateTodo] = useState(todo.title);
  const [descriptionUpdate, setDescriptionUpdate] = useState(todo.description);
  const [completedUpdate, setCompletedUpdate] = useState(todo.completed);
  const [isLoading, setIsLoading] = useState(false);

  // Update local state when todo prop changes
  useEffect(() => {
    setTitleUpdateTodo(todo.title);
    setDescriptionUpdate(todo.description);
    setCompletedUpdate(todo.completed);
  }, [todo]);

  // Cancel Update Button
  const cancelUpdate = () => {
    setTitleUpdateTodo(todo.title);
    setDescriptionUpdate(todo.description);
    setCompletedUpdate(todo.completed);
    onOpenChange(false);
  };

  const updateTodo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS}/${todo.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titleUpdateTodo.trim(),
          description: descriptionUpdate.trim(),
          completed: completedUpdate,
        }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      const data = await response.json();
      onTaskUpdated(data);
      onOpenChange(false);
      ToastPopup("Task updated successfully", "success");
    } catch (error) {
      const errorText = "Failed to update task";
      console.error(`${errorText}:`, error);
      // Here to show an error message to the user
      ToastPopup(errorText, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          onInteractOutside={(e) => {
            if (isLoading) {
              e.preventDefault();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Task title..."
              value={titleUpdateTodo}
              onChange={(e) => setTitleUpdateTodo(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
            <Textarea
              placeholder="Task description (optional)"
              value={descriptionUpdate}
              onChange={(e) => setDescriptionUpdate(e.target.value)}
              disabled={isLoading}
              rows={3}
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="completed"
                checked={completedUpdate}
                className="rounded-lg"
                onCheckedChange={(checked) =>
                  setCompletedUpdate(checked as boolean)
                }
              />{" "}
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {" "}
                Mark as completed
              </span>
            </div>
            <div className="flex space-x-2 justify-end">
              <Button
                variant="outline"
                onClick={cancelUpdate}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={updateTodo}
                disabled={isLoading || !titleUpdateTodo.trim()}
              >
                {isLoading ? "Updating..." : "Update Task"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ToDoDialogUpdate;
