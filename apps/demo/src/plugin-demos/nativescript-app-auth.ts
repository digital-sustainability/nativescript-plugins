import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptAppAuth } from '@demo/shared';
import { } from '@digital-sustainability/nativescript-app-auth';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptAppAuth {
	
}
