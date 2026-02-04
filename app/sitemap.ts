import type { MetadataRoute } from "next";

const baseUrl = "https://www.cliffordomari.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/about", changeFrequency: "monthly", priority: 0.9 },
    { path: "/projects", changeFrequency: "weekly", priority: 0.95 },
    { path: "/philosophy", changeFrequency: "monthly", priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.5 },
    { path: "/ev", changeFrequency: "monthly", priority: 0.7 },

    { path: "/de", changeFrequency: "weekly", priority: 0.9 },
    { path: "/about-de", changeFrequency: "monthly", priority: 0.7 },
    { path: "/projects-de", changeFrequency: "weekly", priority: 0.8 },
    { path: "/philosophy-de", changeFrequency: "monthly", priority: 0.65 },
    { path: "/blog-de", changeFrequency: "weekly", priority: 0.65 },
    { path: "/contact-de", changeFrequency: "monthly", priority: 0.65 },
    { path: "/privacy-policy-de", changeFrequency: "yearly", priority: 0.4 },
    { path: "/ev-de", changeFrequency: "monthly", priority: 0.55 },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
