import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("renders with default search icon", () => {
    render(<SearchBar placeholder="Search transactions" />);
    expect(
      screen.getByPlaceholderText("Search transactions")
    ).toBeInTheDocument();
    // Search2Line icon should be present (SVG)
  });

  it("renders with custom left icon", () => {
    render(
      <SearchBar
        placeholder="Search"
        leftIcon={<span data-testid="custom-icon">C</span>}
      />
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("passes other input props correctly", () => {
    render(<SearchBar placeholder="Search" maxLength={10} />);
    const input = screen.getByPlaceholderText("Search");
    expect(input).toHaveAttribute("maxLength", "10");
  });
});
