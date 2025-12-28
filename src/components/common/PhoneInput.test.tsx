import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PhoneInput } from "./PhoneInput";

describe("PhoneInput", () => {
  it("renders label correctly", () => {
    render(<PhoneInput label="Phone Number" />);
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
  });

  it("handles phone number changes", () => {
    const handleChange = vi.fn();
    render(<PhoneInput onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "123456789" } });
    expect(handleChange).toHaveBeenCalledWith("+962123456789");
  });

  it("changes country and updates full value", () => {
    const handleChange = vi.fn();
    render(<PhoneInput onChange={handleChange} />);

    // Open dropdown
    const countryButton = screen.getByRole("button", { name: /962/i });
    fireEvent.click(countryButton);

    // Select Nigeria
    const nigeriaButton = screen.getByText("Nigeria");
    fireEvent.click(nigeriaButton);

    expect(screen.getByText("+234")).toBeInTheDocument();

    // Enter phone number
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "8012345678" } });
    expect(handleChange).toHaveBeenCalledWith("+2348012345678");
  });

  it("displays error message", () => {
    render(<PhoneInput error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("initializes with correct country based on value", () => {
    render(<PhoneInput value="+2348012345678" />);
    expect(screen.getByText("🇳🇬")).toBeInTheDocument();
    expect(screen.getByText("+234")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("8012345678");
  });
});
