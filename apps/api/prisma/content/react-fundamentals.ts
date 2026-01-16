import type { LessonContent } from "./javascript-mastery-types";
import { reactFundamentalsBasics } from "./react-fundamentals-basics";
import { reactFundamentalsHooks } from "./react-fundamentals-hooks";
import { reactFundamentalsPatterns } from "./react-fundamentals-patterns";
import { reactFundamentalsStyling } from "./react-fundamentals-styling";
import { reactFundamentalsForms } from "./react-fundamentals-forms";
import { reactFundamentalsDataFetching } from "./react-fundamentals-data-fetching";

export const reactFundamentalsLessons: Record<string, LessonContent> = {
  ...reactFundamentalsBasics,
  ...reactFundamentalsHooks,
  ...reactFundamentalsPatterns,
  ...reactFundamentalsStyling,
  ...reactFundamentalsForms,
  ...reactFundamentalsDataFetching
};
