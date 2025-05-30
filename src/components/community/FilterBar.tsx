// src/components/community/FilterBar.tsx
import React from "react";

const FilterBar = ({ selected, onSelect }) => {
  const filters = ["experience", "discussion", "companion", "accommodation"];

  return (
    <div className="flex justify-center flex-wrap gap-3 mt-6">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onSelect(filter)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            selected === filter
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {filter === "experience" && "Visa Experience"}
          {filter === "discussion" && "Discussions"}
          {filter === "companion" && "Travel Companions"}
          {filter === "accommodation" && "Accommodations"}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;