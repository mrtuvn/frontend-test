"use client";

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ValueStepper from "../components/ValueStepper";

describe("ValueStepper", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders with initial value", () => {
    render(<ValueStepper value={10} onChange={mockOnChange} unit="%" />);
    expect(screen.getByRole("textbox")).toHaveValue("10");
  });

  it("increments value when + button is clicked", async () => {
    render(
      <ValueStepper value={10} onChange={mockOnChange} unit="%" step={1} />
    );

    const incrementButton = screen.getByLabelText("Increase value");
    await userEvent.click(incrementButton);

    expect(mockOnChange).toHaveBeenCalledWith(11);
  });

  it("decrements value when - button is clicked", async () => {
    render(
      <ValueStepper value={10} onChange={mockOnChange} unit="%" step={1} />
    );

    const decrementButton = screen.getByLabelText("Decrease value");
    await userEvent.click(decrementButton);

    expect(mockOnChange).toHaveBeenCalledWith(9);
  });

  it("disables - button when value is at min", () => {
    render(<ValueStepper value={0} onChange={mockOnChange} unit="%" min={0} />);

    const decrementButton = screen.getByLabelText("Decrease value");
    expect(decrementButton).toBeDisabled();
  });

  it("disables + button when value is at max for % unit", () => {
    render(<ValueStepper value={100} onChange={mockOnChange} unit="%" />);

    const incrementButton = screen.getByLabelText("Increase value");
    expect(incrementButton).toBeDisabled();
  });

  it("replaces comma with dot in input", async () => {
    render(<ValueStepper value={10} onChange={mockOnChange} unit="%" />);

    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "12,3");
    fireEvent.blur(input);

    expect(mockOnChange).toHaveBeenCalledWith(12.3);
  });

  it("removes non-numeric characters from input", async () => {
    render(<ValueStepper value={10} onChange={mockOnChange} unit="%" />);

    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "123a");
    fireEvent.blur(input);

    expect(mockOnChange).toHaveBeenCalledWith(123);
  });

  it("sets value to min when input is less than min", async () => {
    render(
      <ValueStepper value={10} onChange={mockOnChange} unit="%" min={0} />
    );

    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "-5");
    fireEvent.blur(input);

    expect(mockOnChange).toHaveBeenCalledWith(0);
  });

  it("sets value to max when input is greater than max for % unit", async () => {
    render(<ValueStepper value={50} onChange={mockOnChange} unit="%" />);

    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "150");
    fireEvent.blur(input);

    expect(mockOnChange).toHaveBeenCalledWith(100);
  });
});
