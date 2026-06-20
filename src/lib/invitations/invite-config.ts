import type { InviteType } from "../types";
import type { InviteTypeConfig } from "./types";

export const INVITE_TYPE_CONFIG: Record<InviteType, InviteTypeConfig> = {
  "pool-club": {
    label: "Oxa Pool Club",
    shortLabel: "Pool Club",
    metadataTitle: "Oxa Pool Club",
    metadataDescription:
      "You are cordially invited to an exclusive event at Oxa Pool Club.",
  },
  "pilates-collab": {
    label: "Oxa Pool Club x Nomi Wellness Studio",
    shortLabel: "Pilates Collab",
    metadataTitle: "Oxa Pool Club x Nomi Wellness Studio",
    metadataDescription:
      "You're invited to a special morning at Oxa Pool Club x Nomi Wellness Studio on 26 June at 09:00.",
  },
};
