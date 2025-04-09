import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import UnitToggle from "../components/UnitToggle"

describe("UnitToggle", () => {
  const mockOnUnitChange = vi.fn()

  it("renders with % selected by default", () => {
    render(<UnitToggle unit="%" onUnitChange={mockOnUnitChange} />)

    const percentButton = screen.getByText("%")
    const pxButton = screen.getByText("px")

    expect(percentButton).toHaveClass("bg-[#3b3b3b]")
    expect(pxButton).not.toHaveClass("bg-[#3b3b3b]")
  })

  it("renders with px selected when specified", () => {
    render(<UnitToggle unit="px" onUnitChange={mockOnUnitChange} />)

    const percentButton = screen.getByText("%")
    const pxButton = screen.getByText("px")

    expect(percentButton).not.toHaveClass("bg-[#3b3b3b]")
    expect(pxButton).toHaveClass("bg-[#3b3b3b]")
  })

  it("calls onUnitChange when % button is clicked", async () => {
    render(<UnitToggle unit="px" onUnitChange={mockOnUnitChange} />)

    const percentButton = screen.getByText("%")
    await userEvent.click(percentButton)

    expect(mockOnUnitChange).toHaveBeenCalledWith("%")
  })

  it("calls onUnitChange when px button is clicked", async () => {
    render(<UnitToggle unit="%" onUnitChange={mockOnUnitChange} />)

    const pxButton = screen.getByText("px")
    await userEvent.click(pxButton)

    expect(mockOnUnitChange).toHaveBeenCalledWith("px")
  })
})