// API Configuration
// This file contains the API endpoint configuration for the NSRC Entry System

export const API_CONFIG = {
  // SAM-managed HTTP API in the HSRC account (274672405337)
  BASE_URL: "https://wzflfa60ij.execute-api.eu-west-1.amazonaws.com",

  // Previous endpoints, both dead:
  //   hx8lk8jh57 — hand-created HTTP API, its Lambda deleted
  //   c64ult16k5 — REST API deployed to the wrong account in Sept 2025
} as const;

// Helper function to construct API URLs
export function getApiUrl(path: string): string {
  return `${API_CONFIG.BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
