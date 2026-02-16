/** Matches backend AttachmentType enum values. */
export const AttachmentType = {
  Avatar: 0,
  MangaCover: 1,
  MangaBanner: 2,
  ChapterPage: 3,
  PersonPhoto: 4,
} as const;
export type AttachmentType = (typeof AttachmentType)[keyof typeof AttachmentType];

/** Matches backend AttachmentDto record. */
export interface AttachmentDto {
  id: string;
  url: string;
  thumbnailUrl: string | null;
  contentType: string;
  fileSize: number;
}
