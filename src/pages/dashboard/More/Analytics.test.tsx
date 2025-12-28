import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Analytics from "./Analytics";
import { MemoryRouter } from "react-router-dom";

// Mock ResponsiveContainer as it doesn't work well in JSDOM
vi.mock("recharts", async () => {
  const original = await vi.importActual("recharts");
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 800, height: 400 }}>{children}</div>
    ),
  };
});

describe("Analytics Page", () => {
  it("renders the analytics page with title and sections", () => {
    render(
      <MemoryRouter>
        <Analytics />
      </MemoryRouter>
    );

    expect(screen.getByText("Spending Analytics")).toBeDefined();
    expect(screen.getByText("Weekly Spending")).toBeDefined();
    expect(screen.getByText("Category Breakdown")).toBeDefined();
    expect(screen.getByText("Total Income")).toBeDefined();
    expect(screen.getByText("Total Expenses")).toBeDefined();
  });
});
