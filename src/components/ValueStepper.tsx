"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";

type ValueStepperProps = {
  value: number;
  onChange: (value: number) => void;
  unit: "px" | "%";
  step?: number;
  min?: number;
  max?: number;
  label?: string;
};

const ValueStepper: React.FC<ValueStepperProps> = ({
  value,
  onChange,
  unit,
  step = 0.1,
  min = 0,
  max,
  label = "Value",
}) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  // Set max based on unit if not provided
  const effectiveMax = max ?? (unit === "%" ? 100 : Number.MAX_SAFE_INTEGER);

  useEffect(() => {
    // Update input value when prop value changes
    setInputValue(value.toString());
  }, [value]);

  useEffect(() => {
    // If unit changes from px to % and value > 100, update to 100
    if (unit === "%" && value > 100) {
      onChange(100);
    }
  }, [unit, value, onChange]);

  const sanitizeInput = (input: string): string => {
    // Replace comma with dot
    let sanitized = input.replace(",", ".");

    // Remove all characters except digits and decimal point
    sanitized = sanitized.replace(/[^\d.]/g, "");

    // Ensure only one decimal point
    const parts = sanitized.split(".");
    if (parts.length > 2) {
      sanitized = parts[0] + "." + parts.slice(1).join("");
    }

    return sanitized;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    const sanitized = sanitizeInput(rawInput);
    setInputValue(sanitized);
  };

  const validateAndUpdateValue = () => {
    let newValue: number;

    if (inputValue === "" || inputValue === ".") {
      newValue = min;
    } else {
      newValue = Number.parseFloat(inputValue);
    }

    // Apply constraints
    if (isNaN(newValue) || newValue < min) {
      newValue = min;
    } else if (newValue > effectiveMax) {
      newValue = effectiveMax;
    }

    // Update both local state and parent
    setInputValue(newValue.toString());
    onChange(newValue);
  };

  const increment = () => {
    const newValue = Math.min(value + step, effectiveMax);
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
  };

  const handleBlur = () => {
    validateAndUpdateValue();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      validateAndUpdateValue();
      inputRef.current?.blur();
    }
  };

  return (
    <div className="flex flex-row items-center gap-2 justify-between">
      <label className="text-sm text-[#aaaaaa] mb-1">{label}</label>
      <div className="flex items-center bg-[var(--input-bg)] rounded-[var(--stepper-btn-border-radius)]">
        <button
          className="p-[var(--stepper-padding)] rounded-l-[var(--stepper-btn-border-radius)] cursor-pointer w-8 h-8 flex items-center justify-center text-white bg-[var(--input-bg)] hover:bg-[var(--active-bg)] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={decrement}
          disabled={value <= min}
          aria-label="Decrease value"
        >
          <span className="text-lg">−</span>
        </button>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-16 h-8 bg-[var(--input-bg)] text-white text-center focus:outline-none border-x border-[var(--stepper-border-color)]"
          aria-label={`${label} input`}
        />
        <button
          className="p-[var(--stepper-padding)] rounded-r-[var(--stepper-btn-border-radius)] cursor-pointer w-8 h-8 flex items-center justify-center text-white bg-[var(--input-bg)] hover:bg-[var(--active-bg)] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={increment}
          disabled={value >= effectiveMax}
          aria-label="Increase value"
        >
          <span className="text-lg">+</span>
        </button>
      </div>
    </div>
  );
};

export default ValueStepper;
