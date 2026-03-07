import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { App } from "./app/app";
import { provideIcons } from "@ng-icons/core";
import {
	heroDocumentDuplicate,
	heroPencil,
	heroTrash,
	heroChevronDown,
} from "@ng-icons/heroicons/outline";
import { mergeApplicationConfig } from "@angular/core";

bootstrapApplication(
	App,
	mergeApplicationConfig(appConfig, {
		providers: [
			provideIcons({ heroDocumentDuplicate, heroPencil, heroTrash, heroChevronDown }),
		],
	}),
);
