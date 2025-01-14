import React from "react";
import Todo from "./Todo";
import ToDoList from "./ToDoList";
import ToDoCreate from "./ToDoCreate";
import FilterButton from "./FilterButton";

const MainSection = () => {
  return (
    <main className="w-2/3 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="flex space-x-2 w-full sm:w-auto">
          <FilterButton type="all" label="All" />
          <FilterButton type="active" label="Active" />
          <FilterButton type="done" label="Done" />
        </div>
        <ToDoCreate />
      </div>

      <p className="text-center text-gray-500">
        No tasks yet. Add a task to get started!
      </p>
      <ToDoList />
    </main>
  );
};

export default MainSection;
