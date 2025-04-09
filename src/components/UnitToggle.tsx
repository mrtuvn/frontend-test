"use client";

import type React from "react";

type UnitToggleProps = {
  unit: "px" | "%";
  onUnitChange: (unit: "px" | "%") => void;
};

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onUnitChange }) => {
  return (
    <div className="flex flex-row items-center gap-2 justify-between">
      <label className="text-sm text-[#aaaaaa] mb-1">Unit</label>
      <div className="flex overflow-hidden rounded-[8px]">
        <button
          className={`px-4 py-2 w-12 text-center ${
            unit === "%"
              ? "bg-[#3b3b3b] text-white rounded-l-[8px] rounded-r-[8px]"
              : "bg-[#212121] text-[#aaaaaa]"
          }`}
          onClick={() => onUnitChange("%")}
        >
          %
        </button>
        <button
          className={`px-4 py-2 w-12 text-center ${
            unit === "px"
              ? "bg-[#3b3b3b] text-white rounded-l-[8px] rounded-r-[8px]"
              : "bg-[#212121] text-[#aaaaaa]"
          }`}
          onClick={() => onUnitChange("px")}
        >
          px
        </button>
      </div>
    </div>
  );
};

export default UnitToggle;
