import type { MetadataRoute } from "next";

const BASE_URL = "https://unex.uz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${BASE_URL}/uz`,
      lastModified: now,
      changeFrequency: "weekly",
      alternates: {
        languages: {
          uz: `${BASE_URL}/uz`,
          ru: `${BASE_URL}/ru`,
        },
      },
    },
    {
      url: `${BASE_URL}/ru`,
      lastModified: now,
      changeFrequency: "weekly",
      alternates: {
        languages: {
          uz: `${BASE_URL}/uz`,
          ru: `${BASE_URL}/ru`,
        },
      },
    },
    {
      url: `${BASE_URL}/uz/calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      alternates: {
        languages: {
          uz: `${BASE_URL}/uz/calculator`,
          ru: `${BASE_URL}/ru/calculator`,
        },
      },
    },
    {
      url: `${BASE_URL}/ru/calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      alternates: {
        languages: {
          uz: `${BASE_URL}/uz/calculator`,
          ru: `${BASE_URL}/ru/calculator`,
        },
      },
    },
  ];
}
