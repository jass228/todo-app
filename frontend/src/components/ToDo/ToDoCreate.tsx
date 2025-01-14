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
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { APIResponse } from "@/types/api";

interface ToDoCreateProps {
  initialTodos: APIResponse[];
}

const ToDoCreate = ({ initialTodos }: ToDoCreateProps) => {
  const [todos, setTodos] = useState<APIResponse[]>(initialTodos);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createTodo = () => {
    if (newTodoTitle.trim() !== "") {
      setNewTodoTitle("");
      setNewTodoDescription("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Create Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Input type="text" placeholder="Task title..." value={""} />
            <Textarea placeholder="Task description (optional)" value={""} />
            <Button className="w-full">Add Task</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ToDoCreate;
