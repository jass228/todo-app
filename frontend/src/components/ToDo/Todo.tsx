import React from "react";
import FilterButton from "./FilterButton";

const Todo = () => {
  return (
    <div>
      <div>
        <FilterButton type="all" label="All" />
        <FilterButton type="active" label="Active" />
        <FilterButton type="done" label="Done" />
      </div>
    </div>
  );
};

export default Todo;
