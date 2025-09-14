// API Configuration
// This file contains the API endpoint configuration for the NSRC Entry System

export const API_CONFIG = {
  // New SAM-managed API Gateway endpoint
  BASE_URL: "https://c64ult16k5.execute-api.eu-west-1.amazonaws.com/prod",

  // Legacy endpoint (for reference/rollback)
  // LEGACY_BASE_URL: "https://hx8lk8jh57.execute-api.eu-west-1.amazonaws.com",
} as const;

// Helper function to construct API URLs
export function getApiUrl(path: string): string {
  return `${API_CONFIG.BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
