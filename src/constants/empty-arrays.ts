// Stable empty array constant — avoids creating new [] references in selectors
export const EMPTY_ARRAY = Object.freeze([]) as readonly never[];
