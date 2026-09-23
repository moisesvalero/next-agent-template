import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { LanguageSwitcher } from "./language-switcher";

const mockRefresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

describe("LanguageSwitcher", () => {
  it("renders the current locale in uppercase and sets appropriate aria-label for Spanish", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher currentLocale="es" />);

    const button = screen.getByRole("button", { name: "Cambiar a inglés" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("ES");

    await user.click(button);
    expect(document.cookie).toContain("NEXT_LOCALE=en");
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("sets appropriate aria-label when current locale is English", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher currentLocale="en" />);

    const button = screen.getByRole("button", { name: "Switch to Spanish" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("EN");

    await user.click(button);
    expect(document.cookie).toContain("NEXT_LOCALE=es");
    expect(mockRefresh).toHaveBeenCalled();
  });
});
