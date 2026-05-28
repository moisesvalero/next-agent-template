import { describe, expect, it } from "vitest";

import {
  createPageMetadata,
  createSoftwareApplicationJsonLd,
  createWebsiteJsonLd,
} from "./seo";

describe("seo helpers", () => {
  it("creates canonical metadata from a relative path", () => {
    const metadata = createPageMetadata({
      title: "Contacto",
      description: "Habla con el equipo.",
      path: "/contacto",
    });

    expect(metadata.alternates?.canonical).toBe(
      "http://localhost:3000/contacto",
    );
    expect(metadata.openGraph?.url).toBe("http://localhost:3000/contacto");
  });

  it("creates website json-ld with search action", () => {
    expect(createWebsiteJsonLd().potentialAction).toMatchObject({
      "@type": "SearchAction",
      target: "http://localhost:3000/search?q={search_term_string}",
    });
  });

  it("creates software json-ld for answer engines", () => {
    expect(createSoftwareApplicationJsonLd()).toMatchObject({
      "@type": "SoftwareApplication",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
    });
  });
});
