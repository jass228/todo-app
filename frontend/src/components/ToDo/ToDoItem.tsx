"use client";
import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react";
import { APIResponse } from "@/types/api";
import { Card } from "../ui/card";
import ToDoDialogUpdate from "./ToDoDialogUpdate";

interface ToDoItemProps {
  todo: APIResponse;
  onDelete: (id: number) => void;
  onToggle: (todo: APIResponse) => void;
  onUpdate: (todo: APIResponse) => void;
}

const ToDoItem = ({ todo, onDelete, onToggle, onUpdate }: ToDoItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  return (
    <>
      <Card className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                checked={todo.completed}
                className="rounded-lg mr-2"
                onCheckedChange={() => onToggle(todo)}
              />
              <div className="flex items-center">
                <span
                  className={
                    todo.completed
                      ? "line-through text-gray-500"
                      : "font-semibold"
                  }
                >
                  {todo.title}
                </span>
                {todo.description && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setUpdateDialogOpen(true)}
                className="hover:text-blue-600"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(todo.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {expanded && todo.description && (
            <p className="text-sm text-muted-foreground pl-10">
              {todo.description}
            </p>
          )}
        </div>
      </Card>
      <ToDoDialogUpdate
        todo={todo}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        onTaskUpdated={onUpdate}
      />
    </>
  );
};

export default ToDoItem;
