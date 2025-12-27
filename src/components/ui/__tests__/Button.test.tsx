import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";
import { BrowserRouter } from "react-router-dom";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state and disables button", () => {
    render(<Button isLoading>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    // Loader2 is an SVG, let's check for its existence if possible or just the loading text logic
    // Since Button doesn't change text when loading, we check for children
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it('renders as a link when "to" prop is provided', () => {
    render(
      <BrowserRouter>
        <Button to="/test-path">Link Button</Button>
      </BrowserRouter>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test-path");
    expect(screen.getByText("Link Button")).toBeInTheDocument();
  });

  it("applies fullWidth style when prop is true", () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("renders left and right icons", () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">L</span>}
        rightIcon={<span data-testid="right-icon">R</span>}
      >
        Icons
      </Button>
    );
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });
});
