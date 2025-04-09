"use client";

import type React from "react";
import { useState, useEffect } from "react";
import UnitToggle from "./UnitToggle";
import ValueStepper from "./ValueStepper";

type ValueControlProps = {
  initialValue?: number;
  initialUnit?: "px" | "%";
  onChange?: (value: number, unit: "px" | "%") => void;
  label?: string;
};

const ValueControl: React.FC<ValueControlProps> = ({
  initialValue = 0,
  initialUnit = "%",
  onChange,
  label = "Value",
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const [unit, setUnit] = useState<"px" | "%">(initialUnit);

  useEffect(() => {
    // If unit changes from px to % and value > 100, update to 100
    if (unit === "%" && value > 100) {
      setValue(100);
    }
  }, [unit, value]);

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
    onChange?.(newValue, unit);
  };

  const handleUnitChange = (newUnit: "px" | "%") => {
    // If switching from px to % and value > 100, update to 100
    if (newUnit === "%" && value > 100) {
      setValue(100);
      onChange?.(100, newUnit);
    } else {
      onChange?.(value, newUnit);
    }
    setUnit(newUnit);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-[#303030] rounded-md w-fit">
      <UnitToggle unit={unit} onUnitChange={handleUnitChange} />
      <ValueStepper
        value={value}
        onChange={handleValueChange}
        unit={unit}
        label={label}
        max={unit === "%" ? 100 : undefined}
      />
    </div>
  );
};

export default ValueControl;
