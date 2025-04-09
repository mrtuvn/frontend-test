"use client";

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ValueControl from "../components/ValueControl";

describe("ValueControl", () => {
  const mockOnChange = vi.fn();

  it("renders with default values", () => {
    render(<ValueControl />);

    expect(screen.getByRole("textbox")).toHaveValue("0");
    expect(screen.getByText("%")).toHaveClass("bg-[#3b3b3b]");
  });

  it("renders with initial values", () => {
    render(<ValueControl initialValue={50} initialUnit="px" />);

    expect(screen.getByRole("textbox")).toHaveValue("50");
    expect(screen.getByText("px")).toHaveClass("bg-[#3b3b3b]");
  });

  it("updates value when stepper changes", async () => {
    render(<ValueControl initialValue={50} onChange={mockOnChange} />);

    const incrementButton = screen.getByLabelText("Increase value");
    await userEvent.click(incrementButton);

    expect(mockOnChange).toHaveBeenCalledWith(50.1, "%");
  });

  it("updates unit when toggle changes", async () => {
    render(<ValueControl initialValue={50} onChange={mockOnChange} />);

    const pxButton = screen.getByText("px");
    await userEvent.click(pxButton);

    expect(mockOnChange).toHaveBeenCalledWith(50, "px");
  });

  it("caps value at 100 when switching from px to %", async () => {
    render(
      <ValueControl
        initialValue={150}
        initialUnit="px"
        onChange={mockOnChange}
      />
    );

    const percentButton = screen.getByText("%");
    await userEvent.click(percentButton);

    expect(mockOnChange).toHaveBeenCalledWith(100, "%");
  });
});
