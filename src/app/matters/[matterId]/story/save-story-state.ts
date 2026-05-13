export type SaveStoryState = {
  error: string | null;
  success: string | null;
  storyId: string | null;
};

export const SAVE_STORY_INITIAL: SaveStoryState = {
  error: null,
  success: null,
  storyId: null,
};
