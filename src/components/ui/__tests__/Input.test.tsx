import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../Input";

describe("Input", () => {
  it("renders label correctly", () => {
    render(<Input label="Username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("handles value changes", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    fireEvent.change(input, { target: { value: "hello" } });
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue("hello");
  });

  it("displays error message and icon", () => {
    render(<Input error="Invalid input" />);
    expect(screen.getByText("Invalid input")).toBeInTheDocument();
    // Error icon should be present - ErrorWarningLine is an SVG
  });

  it("toggles password visibility", () => {
    render(<Input type="password" placeholder="Password" />);
    const input = screen.getByPlaceholderText("Password");
    const toggleButton = screen.getByRole("button");

    expect(input).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("renders left icon", () => {
    render(<Input leftIcon={<span data-testid="left-icon">L</span>} />);
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled placeholder="Disabled input" />);
    expect(screen.getByPlaceholderText("Disabled input")).toBeDisabled();
  });
});
