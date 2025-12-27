import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ResponsiveModal } from "../ResponsiveModal";
import { UiProvider } from "../../../context/UiContext";

describe("ResponsiveModal", () => {
  it("does not render when isOpen is false", () => {
    render(
      <UiProvider>
        <ResponsiveModal isOpen={false} onClose={() => {}}>
          <div>Modal Content</div>
        </ResponsiveModal>
      </UiProvider>
    );
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("renders title and content when isOpen is true", () => {
    render(
      <UiProvider>
        <ResponsiveModal isOpen={true} onClose={() => {}}>
          <div>Modal Content</div>
        </ResponsiveModal>
      </UiProvider>
    );
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("calls onClose when overlay is clicked", () => {
    const handleClose = vi.fn();
    const { container } = render(
      <UiProvider>
        <ResponsiveModal isOpen={true} onClose={handleClose}>
          <div>Modal Content</div>
        </ResponsiveModal>
      </UiProvider>
    );

    // The overlay is the first div inside the outer div
    const overlay = container.querySelector(".absolute.inset-0");
    if (overlay) {
      fireEvent.click(overlay);
    }
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls onClose when "Done" button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <UiProvider>
        <ResponsiveModal isOpen={true} onClose={handleClose}>
          <div>Modal Content</div>
        </ResponsiveModal>
      </UiProvider>
    );

    const doneButton = screen.getByText("Done");
    fireEvent.click(doneButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
