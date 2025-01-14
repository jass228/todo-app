import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";

const ToDoList = () => {
  return (
    <>
      <ul className="space-y-2">
        <li className="flex items-center justify-between p-2 bg-gray-100 rounded">
          <div className="flex items-center flex-1">
            <Checkbox className="rounded-lg mr-2" />
            <span>Title</span>
          </div>
          <div className="flex">
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </li>
      </ul>
    </>
  );
};

export default ToDoList;
