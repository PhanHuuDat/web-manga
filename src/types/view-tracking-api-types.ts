export type ViewTargetType = 'Series' | 'Chapter';

/** Maps string target type to enum value expected by backend */
export const VIEW_TARGET_TYPE_MAP: Record<ViewTargetType, number> = {
  Series: 0,
  Chapter: 1,
};
