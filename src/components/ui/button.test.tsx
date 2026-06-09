import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button, buttonVariants } from "./button";

describe("Button", () => {
  it("renders its content and handles clicks", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Guardar</Button>);
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("exposes reusable shadcn-style variants", () => {
    expect(buttonVariants({ variant: "outline", size: "sm" })).toContain(
      "border-input",
    );
  });
});
