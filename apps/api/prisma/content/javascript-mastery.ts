import type { LessonContent } from "./javascript-mastery-types";
import { javascriptMasteryCore } from "./javascript-mastery-core";
import { javascriptMasteryControlFlow } from "./javascript-mastery-control-flow";
import { javascriptMasteryFunctions } from "./javascript-mastery-functions";
import { javascriptMasteryObjectsArrays } from "./javascript-mastery-objects-arrays";
import { javascriptMasteryScopeClosures } from "./javascript-mastery-scope-closures";
import { javascriptMasteryAsync } from "./javascript-mastery-async";
import { javascriptMasteryBrowserApis } from "./javascript-mastery-browser-apis";

export const javascriptMasteryLessons: Record<string, LessonContent> = {
  ...javascriptMasteryCore,
  ...javascriptMasteryControlFlow,
  ...javascriptMasteryFunctions,
  ...javascriptMasteryObjectsArrays,
  ...javascriptMasteryScopeClosures,
  ...javascriptMasteryAsync,
  ...javascriptMasteryBrowserApis
};
