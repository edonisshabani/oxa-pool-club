import type { InvitationCopy } from "./types";

export const PILATES_COLLAB_COPY: InvitationCopy = {
  inviteLabel: "You are invited to",
  headline: "OXA × PILATES COLLAB",
  paragraphs: [
    "Join us for an exclusive collaboration between Oxa Pool Club and our pilates studio partner.",
    "Enjoy a curated wellness experience that blends Riviera poolside hospitality with mindful movement, premium recovery, and an elevated summer atmosphere.",
    "We look forward to welcoming you to this special collab event.",
  ],
  validity: "Valid for the scheduled collab event date.",
  entranceNotice: "Please bring this invitation and show your ID at arrival.",
};

export const PILATES_EVENT_DETAILS = {
  title: "OXA × Pilates Collab Experience",
  date: "Saturday, 26 July 2026",
  time: "10:00 AM — 2:00 PM",
  location: "Oxa Pool Club & Partner Studio",
  locationAddress: "French Riviera, Côte d'Azur",
} as const;
