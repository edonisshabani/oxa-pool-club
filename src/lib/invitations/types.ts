export interface InvitationCopy {
  headline: string;
  paragraphs: readonly string[];
  validity: string;
  entranceNotice: string;
  inviteLabel?: string;
}

export interface InviteTypeConfig {
  label: string;
  shortLabel: string;
  metadataTitle: string;
  metadataDescription: string;
}
