import React from "react";
import { Button } from "@/components/ui/button";
import { FilterType } from "@/types/filter";

interface ToDoFilterButtonProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const ToDoFilterButton = ({
  currentFilter,
  onFilterChange,
}: ToDoFilterButtonProps) => {
  const filters: { type: FilterType; label: string }[] = [
    { type: "all", label: "All" },
    { type: "active", label: "Active" },
    { type: "completed", label: "Completed" },
  ];
  return (
    <>
      {filters.map(({ type, label }) => (
        <Button
          key={type}
          variant={currentFilter === type ? "default" : "outline"}
          onClick={() => onFilterChange(type)}
        >
          {label}
        </Button>
      ))}
    </>
  );
};

export default ToDoFilterButton;
