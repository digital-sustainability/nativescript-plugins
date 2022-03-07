import { ServiceConfiguration } from '.';

export class NativescriptAppAuthCommon {
	protected isServiceConfiguration(obj: unknown): obj is ServiceConfiguration {
		return (
			obj != null &&
			typeof (obj as ServiceConfiguration).authorizationEndpoint === 'string' &&
			typeof (obj as ServiceConfiguration).tokenEndpoint === 'string'
		);
	}
}
