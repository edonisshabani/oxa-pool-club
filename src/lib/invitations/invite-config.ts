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
    label: "OXA × Pilates Collab",
    shortLabel: "Pilates Collab",
    metadataTitle: "OXA × Pilates Collab",
    metadataDescription:
      "You are invited to an exclusive OXA Pool Club and pilates studio collaboration.",
  },
};
