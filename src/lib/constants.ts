import type { EventDetails } from "./types";

export const COLORS = {
  sand: "#F5E6D3",
  sandDark: "#E8D5B7",
  mediterranean: "#1A4B7C",
  mediterraneanLight: "#2E6B9E",
  mediterraneanDeep: "#0D3B66",
  white: "#FFFFFF",
  cream: "#FAF7F2",
  sunYellow: "#F4C430",
  sunYellowLight: "#FFD54F",
  gold: "#C9A962",
  goldDark: "#A68B4B",
} as const;

/** @deprecated kept for type compatibility — use MEMBERSHIP_CARD_COPY */
export const EVENT_DETAILS: EventDetails = {
  title: "Summer Soirée",
  date: "Saturday, 19 July 2026",
  time: "6:00 PM — Late",
  location: "Oxa Pool Club",
  locationAddress: "French Riviera, Côte d'Azur",
};

export const MEMBERSHIP_CARD_COPY = {
  headline: "WELCOME TO OXA POOL CLUB",
  paragraphs: [
    "This Special Guest Membership Card grants complimentary access to Oxa Pool Club throughout the 2026 season.",
    "As a valued guest of OXA, you are invited to enjoy exclusive access, premium hospitality, and unforgettable summer experiences inspired by the French Riviera lifestyle.",
    "Thank you for being part of Oxa Pool Club!",
  ],
  validity: "Valid for the entire 2026 season.",
} as const;

export const STORAGE_KEY = "oxa-guests";
export const ADMIN_SESSION_KEY = "oxa-admin-session";