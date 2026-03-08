import { bootstrapApplication } from "@angular/platform-browser";
import { provideIcons } from "@ng-icons/core";
import {
  heroDocumentDuplicate,
  heroPencil,
  heroTrash,
  heroChevronDown,
  heroXMark,
} from "@ng-icons/heroicons/outline";
import { mergeApplicationConfig } from "@angular/core";

import { appConfig } from "./app/app.config";
import { App } from "./app/app";

bootstrapApplication(
  App,
  mergeApplicationConfig(appConfig, {
    providers: [
      provideIcons({ heroDocumentDuplicate, heroPencil, heroTrash, heroChevronDown, heroXMark }),
    ],
  }),
);
