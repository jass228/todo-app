"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type FilterType = "all" | "active" | "done";

interface FilterButtonProps {
  type: FilterType;
  label: string;
}

const FilterButton = ({ type, label }: FilterButtonProps) => {
  const [filter, setFilter] = useState<FilterType>("all");
  return (
    <Button
      variant={filter === type ? "default" : "outline"}
      onClick={() => setFilter(type)}
    >
      {label}
    </Button>
  );
};

export default FilterButton;
