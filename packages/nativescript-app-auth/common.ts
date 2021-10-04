import { Observable } from '@nativescript/core';
import { ServiceConfiguration } from '.';

export class NativescriptAppAuthCommon extends Observable {
	protected static isServiceConfiguration (obj: unknown): obj is ServiceConfiguration {
		return obj != null &&
    typeof (obj as ServiceConfiguration).authorizationEndpoint === 'string' &&
    typeof (obj as ServiceConfiguration).tokenEndpoint === 'string'
  }
}
