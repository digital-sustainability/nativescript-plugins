declare module net {
	export module openid {
		export module appauth {
			export class AdditionalParamsProcessor {
				public static class: java.lang.Class<net.openid.appauth.AdditionalParamsProcessor>;
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class AppAuthConfiguration {
				public static class: java.lang.Class<net.openid.appauth.AppAuthConfiguration>;
				public static DEFAULT: net.openid.appauth.AppAuthConfiguration;
				public getSkipIssuerHttpsCheck(): boolean;
				public getConnectionBuilder(): net.openid.appauth.connectivity.ConnectionBuilder;
				public getBrowserMatcher(): net.openid.appauth.browser.BrowserMatcher;
			}
			export module AppAuthConfiguration {
				export class Builder {
					public static class: java.lang.Class<net.openid.appauth.AppAuthConfiguration.Builder>;
					public constructor();
					public setBrowserMatcher(param0: net.openid.appauth.browser.BrowserMatcher): net.openid.appauth.AppAuthConfiguration.Builder;
					public setConnectionBuilder(param0: net.openid.appauth.connectivity.ConnectionBuilder): net.openid.appauth.AppAuthConfiguration.Builder;
					public setSkipIssuerHttpsCheck(param0: java.lang.Boolean): net.openid.appauth.AppAuthConfiguration.Builder;
					public build(): net.openid.appauth.AppAuthConfiguration;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class AsciiStringListUtil {
				public static class: java.lang.Class<net.openid.appauth.AsciiStringListUtil>;
				public static iterableToString(param0: java.lang.Iterable<string>): string;
				public static stringToSet(param0: string): java.util.Set<string>;
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class AuthState {
				public static class: java.lang.Class<net.openid.appauth.AuthState>;
				public static EXPIRY_TIME_TOLERANCE_MS: number;
				public constructor(param0: net.openid.appauth.AuthorizationResponse, param1: net.openid.appauth.TokenResponse, param2: net.openid.appauth.AuthorizationException);
				public jsonSerialize(): org.json.JSONObject;
				public setNeedsTokenRefresh(param0: boolean): void;
				public performActionWithFreshTokens(param0: net.openid.appauth.AuthorizationService, param1: net.openid.appauth.AuthState.AuthStateAction): void;
				public getIdToken(): string;
				public getAuthorizationServiceConfiguration(): net.openid.appauth.AuthorizationServiceConfiguration;
				public performActionWithFreshTokens(param0: net.openid.appauth.AuthorizationService, param1: java.util.Map<string,string>, param2: net.openid.appauth.AuthState.AuthStateAction): void;
				public update(param0: net.openid.appauth.AuthorizationResponse, param1: net.openid.appauth.AuthorizationException): void;
				public getScopeSet(): java.util.Set<string>;
				public update(param0: net.openid.appauth.TokenResponse, param1: net.openid.appauth.AuthorizationException): void;
				public getClientSecret(): string;
				public constructor();
				public createTokenRefreshRequest(): net.openid.appauth.TokenRequest;
				public getClientSecretExpirationTime(): java.lang.Long;
				public performActionWithFreshTokens(param0: net.openid.appauth.AuthorizationService, param1: net.openid.appauth.ClientAuthentication, param2: java.util.Map<string,string>, param3: net.openid.appauth.AuthState.AuthStateAction): void;
				public getRefreshToken(): string;
				public jsonSerializeString(): string;
				public getAccessTokenExpirationTime(): java.lang.Long;
				public getLastTokenResponse(): net.openid.appauth.TokenResponse;
				public createTokenRefreshRequest(param0: java.util.Map<string,string>): net.openid.appauth.TokenRequest;
				public update(param0: net.openid.appauth.RegistrationResponse): void;
				public getLastRegistrationResponse(): net.openid.appauth.RegistrationResponse;
				public hasClientSecretExpired(): boolean;
				public getClientAuthentication(): net.openid.appauth.ClientAuthentication;
				public isAuthorized(): boolean;
				public performActionWithFreshTokens(param0: net.openid.appauth.AuthorizationService, param1: net.openid.appauth.ClientAuthentication, param2: net.openid.appauth.AuthState.AuthStateAction): void;
				public constructor(param0: net.openid.appauth.RegistrationResponse);
				public static jsonDeserialize(param0: org.json.JSONObject): net.openid.appauth.AuthState;
				public getScope(): string;
				public static jsonDeserialize(param0: string): net.openid.appauth.AuthState;
				public constructor(param0: net.openid.appauth.AuthorizationServiceConfiguration);
				public constructor(param0: net.openid.appauth.AuthorizationResponse, param1: net.openid.appauth.AuthorizationException);
				public getNeedsTokenRefresh(): boolean;
				public getAccessToken(): string;
				public getAuthorizationException(): net.openid.appauth.AuthorizationException;
				public getLastAuthorizationResponse(): net.openid.appauth.AuthorizationResponse;
			}
			export module AuthState {
				export class AuthStateAction {
					public static class: java.lang.Class<net.openid.appauth.AuthState.AuthStateAction>;
					/**
					 * Constructs a new instance of the net.openid.appauth.AuthState$AuthStateAction interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						execute(param0: string, param1: string, param2: net.openid.appauth.AuthorizationException): void;
					});
					public constructor();
					public execute(param0: string, param1: string, param2: net.openid.appauth.AuthorizationException): void;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class AuthorizationException {
				public static class: java.lang.Class<net.openid.appauth.AuthorizationException>;
				public static EXTRA_EXCEPTION: string;
				public static PARAM_ERROR: string;
				public static PARAM_ERROR_DESCRIPTION: string;
				public static PARAM_ERROR_URI: string;
				public static TYPE_GENERAL_ERROR: number;
				public static TYPE_OAUTH_AUTHORIZATION_ERROR: number;
				public static TYPE_OAUTH_TOKEN_ERROR: number;
				public static TYPE_RESOURCE_SERVER_AUTHORIZATION_ERROR: number;
				public static TYPE_OAUTH_REGISTRATION_ERROR: number;
				public type: number;
				public code: number;
				public error: string;
				public errorDescription: string;
				public errorUri: globalAndroid.net.Uri;
				public static fromTemplate(param0: net.openid.appauth.AuthorizationException, param1: java.lang.Throwable): net.openid.appauth.AuthorizationException;
				public static fromJson(param0: string): net.openid.appauth.AuthorizationException;
				public static fromIntent(param0: globalAndroid.content.Intent): net.openid.appauth.AuthorizationException;
				public toString(): string;
				public toJsonString(): string;
				public constructor(param0: number, param1: number, param2: string, param3: string, param4: globalAndroid.net.Uri, param5: java.lang.Throwable);
				public toJson(): org.json.JSONObject;
				public hashCode(): number;
				public equals(param0: any): boolean;
				public static fromOAuthTemplate(param0: net.openid.appauth.AuthorizationException, param1: string, param2: string, param3: globalAndroid.net.Uri): net.openid.appauth.AuthorizationException;
				public static fromOAuthRedirect(param0: globalAndroid.net.Uri): net.openid.appauth.AuthorizationException;
				public toIntent(): globalAndroid.content.Intent;
				public static fromJson(param0: org.json.JSONObject): net.openid.appauth.AuthorizationException;
			}
			export module AuthorizationException {
				export class AuthorizationRequestErrors {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationException.AuthorizationRequestErrors>;
					public static INVALID_REQUEST: net.openid.appauth.AuthorizationException;
					public static UNAUTHORIZED_CLIENT: net.openid.appauth.AuthorizationException;
					public static ACCESS_DENIED: net.openid.appauth.AuthorizationException;
					public static UNSUPPORTED_RESPONSE_TYPE: net.openid.appauth.AuthorizationException;
					public static INVALID_SCOPE: net.openid.appauth.AuthorizationException;
					public static SERVER_ERROR: net.openid.appauth.AuthorizationException;
					public static TEMPORARILY_UNAVAILABLE: net.openid.appauth.AuthorizationException;
					public static CLIENT_ERROR: net.openid.appauth.AuthorizationException;
					public static OTHER: net.openid.appauth.AuthorizationException;
					public static STATE_MISMATCH: net.openid.appauth.AuthorizationException;
					public static byString(param0: string): net.openid.appauth.AuthorizationException;
					public constructor();
				}
				export class GeneralErrors {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationException.GeneralErrors>;
					public static INVALID_DISCOVERY_DOCUMENT: net.openid.appauth.AuthorizationException;
					public static USER_CANCELED_AUTH_FLOW: net.openid.appauth.AuthorizationException;
					public static PROGRAM_CANCELED_AUTH_FLOW: net.openid.appauth.AuthorizationException;
					public static NETWORK_ERROR: net.openid.appauth.AuthorizationException;
					public static SERVER_ERROR: net.openid.appauth.AuthorizationException;
					public static JSON_DESERIALIZATION_ERROR: net.openid.appauth.AuthorizationException;
					public static TOKEN_RESPONSE_CONSTRUCTION_ERROR: net.openid.appauth.AuthorizationException;
					public static INVALID_REGISTRATION_RESPONSE: net.openid.appauth.AuthorizationException;
					public static ID_TOKEN_PARSING_ERROR: net.openid.appauth.AuthorizationException;
					public static ID_TOKEN_VALIDATION_ERROR: net.openid.appauth.AuthorizationException;
					public constructor();
				}
				export class RegistrationRequestErrors {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationException.RegistrationRequestErrors>;
					public static INVALID_REQUEST: net.openid.appauth.AuthorizationException;
					public static INVALID_REDIRECT_URI: net.openid.appauth.AuthorizationException;
					public static INVALID_CLIENT_METADATA: net.openid.appauth.AuthorizationException;
					public static CLIENT_ERROR: net.openid.appauth.AuthorizationException;
					public static OTHER: net.openid.appauth.AuthorizationException;
					public static byString(param0: string): net.openid.appauth.AuthorizationException;
					public constructor();
				}
				export class TokenRequestErrors {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationException.TokenRequestErrors>;
					public static INVALID_REQUEST: net.openid.appauth.AuthorizationException;
					public static INVALID_CLIENT: net.openid.appauth.AuthorizationException;
					public static INVALID_GRANT: net.openid.appauth.AuthorizationException;
					public static UNAUTHORIZED_CLIENT: net.openid.appauth.AuthorizationException;
					public static UNSUPPORTED_GRANT_TYPE: net.openid.appauth.AuthorizationException;
					public static INVALID_SCOPE: net.openid.appauth.AuthorizationException;
					public static CLIENT_ERROR: net.openid.appauth.AuthorizationException;
					public static OTHER: net.openid.appauth.AuthorizationException;
					public static byString(param0: string): net.openid.appauth.AuthorizationException;
					public constructor();
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class AuthorizationManagementActivity {
				public static class: java.lang.Class<net.openid.appauth.AuthorizationManagementActivity>;
				public onCreate(param0: globalAndroid.os.Bundle): void;
				public onResume(): void;
				public onNewIntent(param0: globalAndroid.content.Intent): void;
				public static createStartForResultIntent(param0: globalAndroid.content.Context, param1: net.openid.appauth.AuthorizationManagementRequest, param2: globalAndroid.content.Intent): globalAndroid.content.Intent;
				public static createResponseHandlingIntent(param0: globalAndroid.content.Context, param1: globalAndroid.net.Uri): globalAndroid.content.Intent;
				public static createStartIntent(param0: globalAndroid.content.Context, param1: net.openid.appauth.AuthorizationManagementRequest, param2: globalAndroid.content.Intent, param3: globalAndroid.app.PendingIntent, param4: globalAndroid.app.PendingIntent): globalAndroid.content.Intent;
				public onSaveInstanceState(param0: globalAndroid.os.Bundle): void;
				public constructor();
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class AuthorizationManagementRequest {
				public static class: java.lang.Class<net.openid.appauth.AuthorizationManagementRequest>;
				/**
				 * Constructs a new instance of the net.openid.appauth.AuthorizationManagementRequest interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					jsonSerialize(): org.json.JSONObject;
					jsonSerializeString(): string;
					getState(): string;
					toUri(): globalAndroid.net.Uri;
				});
				public constructor();
				public jsonSerialize(): org.json.JSONObject;
				public getState(): string;
				public toUri(): globalAndroid.net.Uri;
				public jsonSerializeString(): string;
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export abstract class AuthorizationManagementResponse {
				public static class: java.lang.Class<net.openid.appauth.AuthorizationManagementResponse>;
				public jsonSerialize(): org.json.JSONObject;
				public getState(): string;
				public jsonSerializeString(): string;
				public toIntent(): globalAndroid.content.Intent;
				public constructor();
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class AuthorizationManagementUtil {
				public static class: java.lang.Class<net.openid.appauth.AuthorizationManagementUtil>;
				public static REQUEST_TYPE_AUTHORIZATION: string;
				public static REQUEST_TYPE_END_SESSION: string;
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class AuthorizationRequest extends net.openid.appauth.AuthorizationManagementRequest {
				public static class: java.lang.Class<net.openid.appauth.AuthorizationRequest>;
				public static CODE_CHALLENGE_METHOD_S256: string;
				public static CODE_CHALLENGE_METHOD_PLAIN: string;
				public configuration: net.openid.appauth.AuthorizationServiceConfiguration;
				public clientId: string;
				public display: string;
				public loginHint: string;
				public prompt: string;
				public uiLocales: string;
				public responseType: string;
				public redirectUri: globalAndroid.net.Uri;
				public scope: string;
				public state: string;
				public nonce: string;
				public codeVerifier: string;
				public codeVerifierChallenge: string;
				public codeVerifierChallengeMethod: string;
				public responseMode: string;
				public claims: org.json.JSONObject;
				public claimsLocales: string;
				public additionalParameters: java.util.Map<string,string>;
				public getPromptValues(): java.util.Set<string>;
				public jsonSerialize(): org.json.JSONObject;
				public getState(): string;
				public static jsonDeserialize(param0: string): net.openid.appauth.AuthorizationRequest;
				public toUri(): globalAndroid.net.Uri;
				public jsonSerializeString(): string;
				public getUiLocales(): java.util.Set<string>;
				public getScopeSet(): java.util.Set<string>;
				public getClaimsLocales(): java.util.Set<string>;
				public static jsonDeserialize(param0: org.json.JSONObject): net.openid.appauth.AuthorizationRequest;
			}
			export module AuthorizationRequest {
				export class Builder {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationRequest.Builder>;
					public setPromptValues(param0: native.Array<string>): net.openid.appauth.AuthorizationRequest.Builder;
					public constructor(param0: net.openid.appauth.AuthorizationServiceConfiguration, param1: string, param2: string, param3: globalAndroid.net.Uri);
					public setUiLocales(param0: string): net.openid.appauth.AuthorizationRequest.Builder;
					public setCodeVerifier(param0: string): net.openid.appauth.AuthorizationRequest.Builder;
					public setAdditionalParameters(param0: java.util.Map<string,string>): net.openid.appauth.AuthorizationRequest.Builder;
					public setClaimsLocalesValues(param0: java.lang.Iterable<string>): net.openid.appauth.AuthorizationRequest.Builder;
					public setAuthorizationServiceConfiguration(param0: net.openid.appauth.AuthorizationServiceConfiguration): net.openid.appauth.AuthorizationRequest.Builder;
					public setPromptValues(param0: java.lang.Iterable<string>): net.openid.appauth.AuthorizationRequest.Builder;
					public setClaims(param0: org.json.JSONObject): net.openid.appauth.AuthorizationRequest.Builder;
					public setUiLocalesValues(param0: native.Array<string>): net.openid.appauth.AuthorizationRequest.Builder;
					public setScope(param0: string): net.openid.appauth.AuthorizationRequest.Builder;
					public setUiLocalesValues(param0: java.lang.Iterable<string>): net.openid.appauth.AuthorizationRequest.Builder;
					public setResponseType(param0: string): net.openid.appauth.AuthorizationRequest.Builder;
					public setScopes(param0: native.Array<string>): net.openid.appauth.AuthorizationRequest.Builder;
					public setCodeVerifier(param0: string, param1: string, param2: string): net.openid.appauth.AuthorizationRequest.Builder;
					public setDisplay(param0: string): net.openid.appauth.AuthorizationRequest.Builder;
					public setScopes(param0: java.lang.Iterable<string>): net.openid.appauth.AuthorizationRequest.Builder;
					public setPrompt(param0: string): net.openid.appauth.AuthorizationRequest.Builder;
					public setClientId(param0: string): net.openid.appauth.AuthorizationRequest.Builder;
					public setNonce(param0: string): net.openid.appauth.AuthorizationRequest.Builder;
					public build(): net.openid.appauth.AuthorizationRequest;
					public setLoginHint(param0: string): net.openid.appauth.AuthorizationRequest.Builder;
					public setState(param0: string): net.openid.appauth.AuthorizationRequest.Builder;
					public setResponseMode(param0: string): net.openid.appauth.AuthorizationRequest.Builder;
					public setClaimsLocales(param0: string): net.openid.appauth.AuthorizationRequest.Builder;
					public setRedirectUri(param0: globalAndroid.net.Uri): net.openid.appauth.AuthorizationRequest.Builder;
					public setClaimsLocalesValues(param0: native.Array<string>): net.openid.appauth.AuthorizationRequest.Builder;
				}
				export class Display {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationRequest.Display>;
					public static PAGE: string;
					public static POPUP: string;
					public static TOUCH: string;
					public static WAP: string;
					public constructor();
				}
				export class Prompt {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationRequest.Prompt>;
					public static NONE: string;
					public static LOGIN: string;
					public static CONSENT: string;
					public static SELECT_ACCOUNT: string;
					public constructor();
				}
				export class ResponseMode {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationRequest.ResponseMode>;
					public static QUERY: string;
					public static FRAGMENT: string;
					public constructor();
				}
				export class Scope {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationRequest.Scope>;
					public static ADDRESS: string;
					public static EMAIL: string;
					public static OFFLINE_ACCESS: string;
					public static OPENID: string;
					public static PHONE: string;
					public static PROFILE: string;
					public constructor();
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class AuthorizationResponse extends net.openid.appauth.AuthorizationManagementResponse {
				public static class: java.lang.Class<net.openid.appauth.AuthorizationResponse>;
				public static EXTRA_RESPONSE: string;
				public static TOKEN_TYPE_BEARER: string;
				public request: net.openid.appauth.AuthorizationRequest;
				public state: string;
				public tokenType: string;
				public authorizationCode: string;
				public accessToken: string;
				public accessTokenExpirationTime: java.lang.Long;
				public idToken: string;
				public scope: string;
				public additionalParameters: java.util.Map<string,string>;
				public jsonSerialize(): org.json.JSONObject;
				public getState(): string;
				public createTokenExchangeRequest(): net.openid.appauth.TokenRequest;
				public createTokenExchangeRequest(param0: java.util.Map<string,string>): net.openid.appauth.TokenRequest;
				public static jsonDeserialize(param0: org.json.JSONObject): net.openid.appauth.AuthorizationResponse;
				public static jsonDeserialize(param0: string): net.openid.appauth.AuthorizationResponse;
				public hasAccessTokenExpired(): boolean;
				public getScopeSet(): java.util.Set<string>;
				public static fromIntent(param0: globalAndroid.content.Intent): net.openid.appauth.AuthorizationResponse;
				public toIntent(): globalAndroid.content.Intent;
			}
			export module AuthorizationResponse {
				export class Builder {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationResponse.Builder>;
					public setAccessToken(param0: string): net.openid.appauth.AuthorizationResponse.Builder;
					public constructor(param0: net.openid.appauth.AuthorizationRequest);
					public setIdToken(param0: string): net.openid.appauth.AuthorizationResponse.Builder;
					public setState(param0: string): net.openid.appauth.AuthorizationResponse.Builder;
					public setAccessTokenExpiresIn(param0: java.lang.Long, param1: net.openid.appauth.Clock): net.openid.appauth.AuthorizationResponse.Builder;
					public setTokenType(param0: string): net.openid.appauth.AuthorizationResponse.Builder;
					public setScopes(param0: native.Array<string>): net.openid.appauth.AuthorizationResponse.Builder;
					public setAccessTokenExpiresIn(param0: java.lang.Long): net.openid.appauth.AuthorizationResponse.Builder;
					public setAccessTokenExpirationTime(param0: java.lang.Long): net.openid.appauth.AuthorizationResponse.Builder;
					public fromUri(param0: globalAndroid.net.Uri): net.openid.appauth.AuthorizationResponse.Builder;
					public setScopes(param0: java.lang.Iterable<string>): net.openid.appauth.AuthorizationResponse.Builder;
					public build(): net.openid.appauth.AuthorizationResponse;
					public setAuthorizationCode(param0: string): net.openid.appauth.AuthorizationResponse.Builder;
					public setAdditionalParameters(param0: java.util.Map<string,string>): net.openid.appauth.AuthorizationResponse.Builder;
					public setScope(param0: string): net.openid.appauth.AuthorizationResponse.Builder;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class AuthorizationService {
				public static class: java.lang.Class<net.openid.appauth.AuthorizationService>;
				public createCustomTabsIntentBuilder(param0: native.Array<globalAndroid.net.Uri>): androidx.browser.customtabs.CustomTabsIntent.Builder;
				public performAuthorizationRequest(param0: net.openid.appauth.AuthorizationRequest, param1: globalAndroid.app.PendingIntent, param2: globalAndroid.app.PendingIntent): void;
				public getEndSessionRequestIntent(param0: net.openid.appauth.EndSessionRequest, param1: androidx.browser.customtabs.CustomTabsIntent): globalAndroid.content.Intent;
				public getBrowserDescriptor(): net.openid.appauth.browser.BrowserDescriptor;
				public performEndSessionRequest(param0: net.openid.appauth.EndSessionRequest, param1: globalAndroid.app.PendingIntent, param2: globalAndroid.app.PendingIntent, param3: androidx.browser.customtabs.CustomTabsIntent): void;
				public performRegistrationRequest(param0: net.openid.appauth.RegistrationRequest, param1: net.openid.appauth.AuthorizationService.RegistrationResponseCallback): void;
				public getCustomTabManager(): net.openid.appauth.browser.CustomTabManager;
				public performEndSessionRequest(param0: net.openid.appauth.EndSessionRequest, param1: globalAndroid.app.PendingIntent, param2: androidx.browser.customtabs.CustomTabsIntent): void;
				public performEndSessionRequest(param0: net.openid.appauth.EndSessionRequest, param1: globalAndroid.app.PendingIntent, param2: globalAndroid.app.PendingIntent): void;
				public performTokenRequest(param0: net.openid.appauth.TokenRequest, param1: net.openid.appauth.AuthorizationService.TokenResponseCallback): void;
				public performTokenRequest(param0: net.openid.appauth.TokenRequest, param1: net.openid.appauth.ClientAuthentication, param2: net.openid.appauth.AuthorizationService.TokenResponseCallback): void;
				public constructor(param0: globalAndroid.content.Context, param1: net.openid.appauth.AppAuthConfiguration);
				public getAuthorizationRequestIntent(param0: net.openid.appauth.AuthorizationRequest): globalAndroid.content.Intent;
				public getEndSessionRequestIntent(param0: net.openid.appauth.EndSessionRequest): globalAndroid.content.Intent;
				public performAuthorizationRequest(param0: net.openid.appauth.AuthorizationRequest, param1: globalAndroid.app.PendingIntent, param2: globalAndroid.app.PendingIntent, param3: androidx.browser.customtabs.CustomTabsIntent): void;
				public getAuthorizationRequestIntent(param0: net.openid.appauth.AuthorizationRequest, param1: androidx.browser.customtabs.CustomTabsIntent): globalAndroid.content.Intent;
				public constructor(param0: globalAndroid.content.Context);
				public performAuthorizationRequest(param0: net.openid.appauth.AuthorizationRequest, param1: globalAndroid.app.PendingIntent, param2: androidx.browser.customtabs.CustomTabsIntent): void;
				public dispose(): void;
				public performAuthorizationRequest(param0: net.openid.appauth.AuthorizationRequest, param1: globalAndroid.app.PendingIntent): void;
				public performEndSessionRequest(param0: net.openid.appauth.EndSessionRequest, param1: globalAndroid.app.PendingIntent): void;
			}
			export module AuthorizationService {
				export class RegistrationRequestTask extends globalAndroid.os.AsyncTask<java.lang.Void,java.lang.Void,org.json.JSONObject> {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationService.RegistrationRequestTask>;
					public onPostExecute(param0: org.json.JSONObject): void;
					public doInBackground(param0: native.Array<java.lang.Void>): org.json.JSONObject;
				}
				export class RegistrationResponseCallback {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationService.RegistrationResponseCallback>;
					/**
					 * Constructs a new instance of the net.openid.appauth.AuthorizationService$RegistrationResponseCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onRegistrationRequestCompleted(param0: net.openid.appauth.RegistrationResponse, param1: net.openid.appauth.AuthorizationException): void;
					});
					public constructor();
					public onRegistrationRequestCompleted(param0: net.openid.appauth.RegistrationResponse, param1: net.openid.appauth.AuthorizationException): void;
				}
				export class TokenRequestTask extends globalAndroid.os.AsyncTask<java.lang.Void,java.lang.Void,org.json.JSONObject> {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationService.TokenRequestTask>;
					public onPostExecute(param0: org.json.JSONObject): void;
					public doInBackground(param0: native.Array<java.lang.Void>): org.json.JSONObject;
				}
				export class TokenResponseCallback {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationService.TokenResponseCallback>;
					/**
					 * Constructs a new instance of the net.openid.appauth.AuthorizationService$TokenResponseCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onTokenRequestCompleted(param0: net.openid.appauth.TokenResponse, param1: net.openid.appauth.AuthorizationException): void;
					});
					public constructor();
					public onTokenRequestCompleted(param0: net.openid.appauth.TokenResponse, param1: net.openid.appauth.AuthorizationException): void;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class AuthorizationServiceConfiguration {
				public static class: java.lang.Class<net.openid.appauth.AuthorizationServiceConfiguration>;
				public static WELL_KNOWN_PATH: string;
				public static OPENID_CONFIGURATION_RESOURCE: string;
				public authorizationEndpoint: globalAndroid.net.Uri;
				public tokenEndpoint: globalAndroid.net.Uri;
				public endSessionEndpoint: globalAndroid.net.Uri;
				public registrationEndpoint: globalAndroid.net.Uri;
				public discoveryDoc: net.openid.appauth.AuthorizationServiceDiscovery;
				public toJsonString(): string;
				public static fromJson(param0: org.json.JSONObject): net.openid.appauth.AuthorizationServiceConfiguration;
				public static fromJson(param0: string): net.openid.appauth.AuthorizationServiceConfiguration;
				public constructor(param0: globalAndroid.net.Uri, param1: globalAndroid.net.Uri, param2: globalAndroid.net.Uri);
				public toJson(): org.json.JSONObject;
				public static fetchFromIssuer(param0: globalAndroid.net.Uri, param1: net.openid.appauth.AuthorizationServiceConfiguration.RetrieveConfigurationCallback): void;
				public constructor(param0: globalAndroid.net.Uri, param1: globalAndroid.net.Uri);
				public constructor(param0: net.openid.appauth.AuthorizationServiceDiscovery);
				public static fetchFromUrl(param0: globalAndroid.net.Uri, param1: net.openid.appauth.AuthorizationServiceConfiguration.RetrieveConfigurationCallback): void;
				public constructor(param0: globalAndroid.net.Uri, param1: globalAndroid.net.Uri, param2: globalAndroid.net.Uri, param3: globalAndroid.net.Uri);
				public static fetchFromIssuer(param0: globalAndroid.net.Uri, param1: net.openid.appauth.AuthorizationServiceConfiguration.RetrieveConfigurationCallback, param2: net.openid.appauth.connectivity.ConnectionBuilder): void;
				public static fetchFromUrl(param0: globalAndroid.net.Uri, param1: net.openid.appauth.AuthorizationServiceConfiguration.RetrieveConfigurationCallback, param2: net.openid.appauth.connectivity.ConnectionBuilder): void;
			}
			export module AuthorizationServiceConfiguration {
				export class ConfigurationRetrievalAsyncTask extends globalAndroid.os.AsyncTask<java.lang.Void,java.lang.Void,net.openid.appauth.AuthorizationServiceConfiguration> {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationServiceConfiguration.ConfigurationRetrievalAsyncTask>;
					public doInBackground(param0: native.Array<java.lang.Void>): net.openid.appauth.AuthorizationServiceConfiguration;
					public onPostExecute(param0: net.openid.appauth.AuthorizationServiceConfiguration): void;
				}
				export class RetrieveConfigurationCallback {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationServiceConfiguration.RetrieveConfigurationCallback>;
					/**
					 * Constructs a new instance of the net.openid.appauth.AuthorizationServiceConfiguration$RetrieveConfigurationCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onFetchConfigurationCompleted(param0: net.openid.appauth.AuthorizationServiceConfiguration, param1: net.openid.appauth.AuthorizationException): void;
					});
					public constructor();
					public onFetchConfigurationCompleted(param0: net.openid.appauth.AuthorizationServiceConfiguration, param1: net.openid.appauth.AuthorizationException): void;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class AuthorizationServiceDiscovery {
				public static class: java.lang.Class<net.openid.appauth.AuthorizationServiceDiscovery>;
				public docJson: org.json.JSONObject;
				public constructor(param0: org.json.JSONObject);
				public getRequestObjectSigningAlgorithmValuesSupported(): java.util.List<string>;
				public getTokenEndpointAuthSigningAlgorithmValuesSupported(): java.util.List<string>;
				public getRequestObjectEncryptionAlgorithmValuesSupported(): java.util.List<string>;
				public getClaimsSupported(): java.util.List<string>;
				public getOpPolicyUri(): globalAndroid.net.Uri;
				public getEndSessionEndpoint(): globalAndroid.net.Uri;
				public getGrantTypesSupported(): java.util.List<string>;
				public getServiceDocumentation(): globalAndroid.net.Uri;
				public getAcrValuesSupported(): java.util.List<string>;
				public getResponseTypesSupported(): java.util.List<string>;
				public getDisplayValuesSupported(): java.util.List<string>;
				public getUiLocalesSupported(): java.util.List<string>;
				public getIdTokenEncryptionEncodingValuesSupported(): java.util.List<string>;
				public getUserinfoEncryptionEncodingValuesSupported(): java.util.List<string>;
				public isRequestParameterSupported(): boolean;
				public getClaimTypesSupported(): java.util.List<string>;
				public getRegistrationEndpoint(): globalAndroid.net.Uri;
				public getSubjectTypesSupported(): java.util.List<string>;
				public getTokenEndpointAuthMethodsSupported(): java.util.List<string>;
				public requireRequestUriRegistration(): boolean;
				public getScopesSupported(): java.util.List<string>;
				public getClaimsLocalesSupported(): java.util.List<string>;
				public getAuthorizationEndpoint(): globalAndroid.net.Uri;
				public getUserinfoEndpoint(): globalAndroid.net.Uri;
				public isRequestUriParameterSupported(): boolean;
				public getOpTosUri(): globalAndroid.net.Uri;
				public isClaimsParameterSupported(): boolean;
				public getIssuer(): string;
				public getRequestObjectEncryptionEncodingValuesSupported(): java.util.List<string>;
				public getIdTokenSigningAlgorithmValuesSupported(): java.util.List<string>;
				public getResponseModesSupported(): java.util.List<string>;
				public getTokenEndpoint(): globalAndroid.net.Uri;
				public getJwksUri(): globalAndroid.net.Uri;
				public getIdTokenEncryptionAlgorithmValuesSupported(): java.util.List<string>;
				public getUserinfoEncryptionAlgorithmValuesSupported(): java.util.List<string>;
				public getUserinfoSigningAlgorithmValuesSupported(): java.util.List<string>;
			}
			export module AuthorizationServiceDiscovery {
				export class MissingArgumentException {
					public static class: java.lang.Class<net.openid.appauth.AuthorizationServiceDiscovery.MissingArgumentException>;
					public constructor(param0: string);
					public getMissingField(): string;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class BuildConfig {
				public static class: java.lang.Class<net.openid.appauth.BuildConfig>;
				public static DEBUG: boolean;
				public static LIBRARY_PACKAGE_NAME: string;
				public static BUILD_TYPE: string;
				public constructor();
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class ClientAuthentication {
				public static class: java.lang.Class<net.openid.appauth.ClientAuthentication>;
				/**
				 * Constructs a new instance of the net.openid.appauth.ClientAuthentication interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					getRequestHeaders(param0: string): java.util.Map<string,string>;
					getRequestParameters(param0: string): java.util.Map<string,string>;
				});
				public constructor();
				public getRequestHeaders(param0: string): java.util.Map<string,string>;
				public getRequestParameters(param0: string): java.util.Map<string,string>;
			}
			export module ClientAuthentication {
				export class UnsupportedAuthenticationMethod {
					public static class: java.lang.Class<net.openid.appauth.ClientAuthentication.UnsupportedAuthenticationMethod>;
					public constructor(param0: string);
					public getUnsupportedAuthenticationMethod(): string;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class ClientSecretBasic extends net.openid.appauth.ClientAuthentication {
				public static class: java.lang.Class<net.openid.appauth.ClientSecretBasic>;
				public static NAME: string;
				public getRequestHeaders(param0: string): java.util.Map<string,string>;
				public getRequestParameters(param0: string): java.util.Map<string,string>;
				public constructor(param0: string);
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class ClientSecretPost extends net.openid.appauth.ClientAuthentication {
				public static class: java.lang.Class<net.openid.appauth.ClientSecretPost>;
				public static NAME: string;
				public getRequestHeaders(param0: string): java.util.Map<string,string>;
				public getRequestParameters(param0: string): java.util.Map<string,string>;
				public constructor(param0: string);
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class Clock {
				public static class: java.lang.Class<net.openid.appauth.Clock>;
				/**
				 * Constructs a new instance of the net.openid.appauth.Clock interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					getCurrentTimeMillis(): number;
				});
				public constructor();
				public getCurrentTimeMillis(): number;
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class CodeVerifierUtil {
				public static class: java.lang.Class<net.openid.appauth.CodeVerifierUtil>;
				public static MIN_CODE_VERIFIER_LENGTH: number;
				public static MAX_CODE_VERIFIER_LENGTH: number;
				public static DEFAULT_CODE_VERIFIER_ENTROPY: number;
				public static MIN_CODE_VERIFIER_ENTROPY: number;
				public static MAX_CODE_VERIFIER_ENTROPY: number;
				public static generateRandomCodeVerifier(param0: java.security.SecureRandom, param1: number): string;
				public static checkCodeVerifier(param0: string): void;
				public static deriveCodeVerifierChallenge(param0: string): string;
				public static getCodeVerifierChallengeMethod(): string;
				public static generateRandomCodeVerifier(): string;
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class EndSessionRequest extends net.openid.appauth.AuthorizationManagementRequest {
				public static class: java.lang.Class<net.openid.appauth.EndSessionRequest>;
				public configuration: net.openid.appauth.AuthorizationServiceConfiguration;
				public idTokenHint: string;
				public postLogoutRedirectUri: globalAndroid.net.Uri;
				public state: string;
				public uiLocales: string;
				public additionalParameters: java.util.Map<string,string>;
				public jsonSerialize(): org.json.JSONObject;
				public getState(): string;
				public static jsonDeserialize(param0: org.json.JSONObject): net.openid.appauth.EndSessionRequest;
				public toUri(): globalAndroid.net.Uri;
				public jsonSerializeString(): string;
				public getUiLocales(): java.util.Set<string>;
				public static jsonDeserialize(param0: string): net.openid.appauth.EndSessionRequest;
			}
			export module EndSessionRequest {
				export class Builder {
					public static class: java.lang.Class<net.openid.appauth.EndSessionRequest.Builder>;
					public setState(param0: string): net.openid.appauth.EndSessionRequest.Builder;
					public setUiLocalesValues(param0: java.lang.Iterable<string>): net.openid.appauth.EndSessionRequest.Builder;
					public setIdTokenHint(param0: string): net.openid.appauth.EndSessionRequest.Builder;
					public setUiLocales(param0: string): net.openid.appauth.EndSessionRequest.Builder;
					public setAuthorizationServiceConfiguration(param0: net.openid.appauth.AuthorizationServiceConfiguration): net.openid.appauth.EndSessionRequest.Builder;
					public setPostLogoutRedirectUri(param0: globalAndroid.net.Uri): net.openid.appauth.EndSessionRequest.Builder;
					public build(): net.openid.appauth.EndSessionRequest;
					public setAdditionalParameters(param0: java.util.Map<string,string>): net.openid.appauth.EndSessionRequest.Builder;
					public constructor(param0: net.openid.appauth.AuthorizationServiceConfiguration);
					public setUiLocalesValues(param0: native.Array<string>): net.openid.appauth.EndSessionRequest.Builder;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class EndSessionResponse extends net.openid.appauth.AuthorizationManagementResponse {
				public static class: java.lang.Class<net.openid.appauth.EndSessionResponse>;
				public static EXTRA_RESPONSE: string;
				public request: net.openid.appauth.EndSessionRequest;
				public state: string;
				public jsonSerialize(): org.json.JSONObject;
				public static fromIntent(param0: globalAndroid.content.Intent): net.openid.appauth.EndSessionResponse;
				public getState(): string;
				public static jsonDeserialize(param0: org.json.JSONObject): net.openid.appauth.EndSessionResponse;
				public toIntent(): globalAndroid.content.Intent;
				public static jsonDeserialize(param0: string): net.openid.appauth.EndSessionResponse;
			}
			export module EndSessionResponse {
				export class Builder {
					public static class: java.lang.Class<net.openid.appauth.EndSessionResponse.Builder>;
					public setRequest(param0: net.openid.appauth.EndSessionRequest): net.openid.appauth.EndSessionResponse.Builder;
					public constructor(param0: net.openid.appauth.EndSessionRequest);
					public build(): net.openid.appauth.EndSessionResponse;
					public setState(param0: string): net.openid.appauth.EndSessionResponse.Builder;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class GrantTypeValues {
				public static class: java.lang.Class<net.openid.appauth.GrantTypeValues>;
				public static AUTHORIZATION_CODE: string;
				public static IMPLICIT: string;
				public static REFRESH_TOKEN: string;
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class IdToken {
				public static class: java.lang.Class<net.openid.appauth.IdToken>;
				public issuer: string;
				public subject: string;
				public audience: java.util.List<string>;
				public expiration: java.lang.Long;
				public issuedAt: java.lang.Long;
				public nonce: string;
				public authorizedParty: string;
			}
			export module IdToken {
				export class IdTokenException {
					public static class: java.lang.Class<net.openid.appauth.IdToken.IdTokenException>;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class JsonUtil {
				public static class: java.lang.Class<net.openid.appauth.JsonUtil>;
				public static getStringIfDefined(param0: org.json.JSONObject, param1: string): string;
				public static get(param0: org.json.JSONObject, param1: net.openid.appauth.JsonUtil.ListField<any>): java.util.List;
				public static getStringMap(param0: org.json.JSONObject, param1: string): java.util.Map<string,string>;
				public static toJsonArray(param0: java.lang.Iterable<any>): org.json.JSONArray;
				public static putIfNotNull(param0: org.json.JSONObject, param1: string, param2: org.json.JSONObject): void;
				public static put(param0: org.json.JSONObject, param1: string, param2: number): void;
				public static getLongIfDefined(param0: org.json.JSONObject, param1: string): java.lang.Long;
				public static getString(param0: org.json.JSONObject, param1: string): string;
				public static getStringListIfDefined(param0: org.json.JSONObject, param1: string): java.util.List<string>;
				public static putIfNotNull(param0: org.json.JSONObject, param1: string, param2: globalAndroid.net.Uri): void;
				public static toStringList(param0: org.json.JSONArray): java.util.List<string>;
				public static put(param0: org.json.JSONObject, param1: string, param2: org.json.JSONObject): void;
				public static putIfNotNull(param0: org.json.JSONObject, param1: string, param2: string): void;
				public static put(param0: org.json.JSONObject, param1: string, param2: string): void;
				public static getUriIfDefined(param0: org.json.JSONObject, param1: string): globalAndroid.net.Uri;
				public static putIfNotNull(param0: org.json.JSONObject, param1: string, param2: java.lang.Long): void;
				public static getStringList(param0: org.json.JSONObject, param1: string): java.util.List<string>;
				public static toUriList(param0: org.json.JSONArray): java.util.List<globalAndroid.net.Uri>;
				public static get(param0: org.json.JSONObject, param1: net.openid.appauth.JsonUtil.Field<any>): any;
				public static getUriList(param0: org.json.JSONObject, param1: string): java.util.List<globalAndroid.net.Uri>;
				public static getUri(param0: org.json.JSONObject, param1: string): globalAndroid.net.Uri;
				public static put(param0: org.json.JSONObject, param1: string, param2: org.json.JSONArray): void;
				public static mapToJsonObject(param0: java.util.Map<string,string>): org.json.JSONObject;
				public static getJsonObjectIfDefined(param0: org.json.JSONObject, param1: string): org.json.JSONObject;
			}
			export module JsonUtil {
				export class BooleanField extends net.openid.appauth.JsonUtil.Field<java.lang.Boolean> {
					public static class: java.lang.Class<net.openid.appauth.JsonUtil.BooleanField>;
				}
				export abstract class Field<T>  extends java.lang.Object {
					public static class: java.lang.Class<net.openid.appauth.JsonUtil.Field<any>>;
					public key: string;
					public defaultValue: T;
				}
				export abstract class ListField<T>  extends java.lang.Object {
					public static class: java.lang.Class<net.openid.appauth.JsonUtil.ListField<any>>;
					public key: string;
					public defaultValue: java.util.List<T>;
				}
				export class StringField extends net.openid.appauth.JsonUtil.Field<string> {
					public static class: java.lang.Class<net.openid.appauth.JsonUtil.StringField>;
				}
				export class StringListField extends net.openid.appauth.JsonUtil.ListField<string> {
					public static class: java.lang.Class<net.openid.appauth.JsonUtil.StringListField>;
				}
				export class UriField extends net.openid.appauth.JsonUtil.Field<globalAndroid.net.Uri> {
					public static class: java.lang.Class<net.openid.appauth.JsonUtil.UriField>;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class NoClientAuthentication extends net.openid.appauth.ClientAuthentication {
				public static class: java.lang.Class<net.openid.appauth.NoClientAuthentication>;
				public static NAME: string;
				public static INSTANCE: net.openid.appauth.NoClientAuthentication;
				public getRequestHeaders(param0: string): java.util.Map<string,string>;
				public getRequestParameters(param0: string): java.util.Map<string,string>;
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class Preconditions {
				public static class: java.lang.Class<net.openid.appauth.Preconditions>;
				public static checkArgument(param0: boolean, param1: any): void;
				public static checkNullOrNotEmpty(param0: string, param1: any): string;
				public static checkNotNull(param0: any, param1: any): any;
				public static checkArgument(param0: boolean): void;
				public static checkArgument(param0: boolean, param1: string, param2: native.Array<any>): void;
				public static checkCollectionNotEmpty(param0: java.util.Collection, param1: any): java.util.Collection;
				public static checkNotEmpty(param0: string, param1: any): string;
				public static checkNotNull(param0: any): any;
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class RedirectUriReceiverActivity {
				public static class: java.lang.Class<net.openid.appauth.RedirectUriReceiverActivity>;
				public onCreate(param0: globalAndroid.os.Bundle): void;
				public constructor();
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class RegistrationRequest {
				public static class: java.lang.Class<net.openid.appauth.RegistrationRequest>;
				public static APPLICATION_TYPE_NATIVE: string;
				public static SUBJECT_TYPE_PAIRWISE: string;
				public static SUBJECT_TYPE_PUBLIC: string;
				public configuration: net.openid.appauth.AuthorizationServiceConfiguration;
				public redirectUris: java.util.List<globalAndroid.net.Uri>;
				public applicationType: string;
				public responseTypes: java.util.List<string>;
				public grantTypes: java.util.List<string>;
				public subjectType: string;
				public jwksUri: globalAndroid.net.Uri;
				public jwks: org.json.JSONObject;
				public tokenEndpointAuthenticationMethod: string;
				public additionalParameters: java.util.Map<string,string>;
				public toJsonString(): string;
				public jsonSerialize(): org.json.JSONObject;
				public static jsonDeserialize(param0: org.json.JSONObject): net.openid.appauth.RegistrationRequest;
				public static jsonDeserialize(param0: string): net.openid.appauth.RegistrationRequest;
				public jsonSerializeString(): string;
			}
			export module RegistrationRequest {
				export class Builder {
					public static class: java.lang.Class<net.openid.appauth.RegistrationRequest.Builder>;
					public setRedirectUriValues(param0: native.Array<globalAndroid.net.Uri>): net.openid.appauth.RegistrationRequest.Builder;
					public setJwksUri(param0: globalAndroid.net.Uri): net.openid.appauth.RegistrationRequest.Builder;
					public setTokenEndpointAuthenticationMethod(param0: string): net.openid.appauth.RegistrationRequest.Builder;
					public setGrantTypeValues(param0: java.util.List<string>): net.openid.appauth.RegistrationRequest.Builder;
					public setConfiguration(param0: net.openid.appauth.AuthorizationServiceConfiguration): net.openid.appauth.RegistrationRequest.Builder;
					public setRedirectUriValues(param0: java.util.List<globalAndroid.net.Uri>): net.openid.appauth.RegistrationRequest.Builder;
					public constructor(param0: net.openid.appauth.AuthorizationServiceConfiguration, param1: java.util.List<globalAndroid.net.Uri>);
					public setSubjectType(param0: string): net.openid.appauth.RegistrationRequest.Builder;
					public setAdditionalParameters(param0: java.util.Map<string,string>): net.openid.appauth.RegistrationRequest.Builder;
					public build(): net.openid.appauth.RegistrationRequest;
					public setGrantTypeValues(param0: native.Array<string>): net.openid.appauth.RegistrationRequest.Builder;
					public setResponseTypeValues(param0: java.util.List<string>): net.openid.appauth.RegistrationRequest.Builder;
					public setResponseTypeValues(param0: native.Array<string>): net.openid.appauth.RegistrationRequest.Builder;
					public setJwks(param0: org.json.JSONObject): net.openid.appauth.RegistrationRequest.Builder;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class RegistrationResponse {
				public static class: java.lang.Class<net.openid.appauth.RegistrationResponse>;
				public request: net.openid.appauth.RegistrationRequest;
				public clientId: string;
				public clientIdIssuedAt: java.lang.Long;
				public clientSecret: string;
				public clientSecretExpiresAt: java.lang.Long;
				public registrationAccessToken: string;
				public registrationClientUri: globalAndroid.net.Uri;
				public tokenEndpointAuthMethod: string;
				public additionalParameters: java.util.Map<string,string>;
				public static fromJson(param0: net.openid.appauth.RegistrationRequest, param1: string): net.openid.appauth.RegistrationResponse;
				public jsonSerialize(): org.json.JSONObject;
				public static jsonDeserialize(param0: org.json.JSONObject): net.openid.appauth.RegistrationResponse;
				public jsonSerializeString(): string;
				public static jsonDeserialize(param0: string): net.openid.appauth.RegistrationResponse;
				public static fromJson(param0: net.openid.appauth.RegistrationRequest, param1: org.json.JSONObject): net.openid.appauth.RegistrationResponse;
				public hasClientSecretExpired(): boolean;
			}
			export module RegistrationResponse {
				export class Builder {
					public static class: java.lang.Class<net.openid.appauth.RegistrationResponse.Builder>;
					public setRegistrationClientUri(param0: globalAndroid.net.Uri): net.openid.appauth.RegistrationResponse.Builder;
					public setAdditionalParameters(param0: java.util.Map<string,string>): net.openid.appauth.RegistrationResponse.Builder;
					public setTokenEndpointAuthMethod(param0: string): net.openid.appauth.RegistrationResponse.Builder;
					public build(): net.openid.appauth.RegistrationResponse;
					public setClientIdIssuedAt(param0: java.lang.Long): net.openid.appauth.RegistrationResponse.Builder;
					public constructor(param0: net.openid.appauth.RegistrationRequest);
					public fromResponseJsonString(param0: string): net.openid.appauth.RegistrationResponse.Builder;
					public setClientId(param0: string): net.openid.appauth.RegistrationResponse.Builder;
					public fromResponseJson(param0: org.json.JSONObject): net.openid.appauth.RegistrationResponse.Builder;
					public setRequest(param0: net.openid.appauth.RegistrationRequest): net.openid.appauth.RegistrationResponse.Builder;
					public setClientSecret(param0: string): net.openid.appauth.RegistrationResponse.Builder;
					public setRegistrationAccessToken(param0: string): net.openid.appauth.RegistrationResponse.Builder;
					public setClientSecretExpiresAt(param0: java.lang.Long): net.openid.appauth.RegistrationResponse.Builder;
				}
				export class MissingArgumentException {
					public static class: java.lang.Class<net.openid.appauth.RegistrationResponse.MissingArgumentException>;
					public constructor(param0: string);
					public getMissingField(): string;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class ResponseTypeValues {
				public static class: java.lang.Class<net.openid.appauth.ResponseTypeValues>;
				public static CODE: string;
				public static TOKEN: string;
				public static ID_TOKEN: string;
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class SystemClock extends net.openid.appauth.Clock {
				public static class: java.lang.Class<net.openid.appauth.SystemClock>;
				public static INSTANCE: net.openid.appauth.SystemClock;
				public getCurrentTimeMillis(): number;
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class TokenRequest {
				public static class: java.lang.Class<net.openid.appauth.TokenRequest>;
				public static PARAM_CLIENT_ID: string;
				public static GRANT_TYPE_PASSWORD: string;
				public static GRANT_TYPE_CLIENT_CREDENTIALS: string;
				public configuration: net.openid.appauth.AuthorizationServiceConfiguration;
				public nonce: string;
				public clientId: string;
				public grantType: string;
				public redirectUri: globalAndroid.net.Uri;
				public authorizationCode: string;
				public scope: string;
				public refreshToken: string;
				public codeVerifier: string;
				public additionalParameters: java.util.Map<string,string>;
				public jsonSerialize(): org.json.JSONObject;
				public getRequestParameters(): java.util.Map<string,string>;
				public static jsonDeserialize(param0: org.json.JSONObject): net.openid.appauth.TokenRequest;
				public jsonSerializeString(): string;
				public getScopeSet(): java.util.Set<string>;
				public static jsonDeserialize(param0: string): net.openid.appauth.TokenRequest;
			}
			export module TokenRequest {
				export class Builder {
					public static class: java.lang.Class<net.openid.appauth.TokenRequest.Builder>;
					public setRedirectUri(param0: globalAndroid.net.Uri): net.openid.appauth.TokenRequest.Builder;
					public setConfiguration(param0: net.openid.appauth.AuthorizationServiceConfiguration): net.openid.appauth.TokenRequest.Builder;
					public build(): net.openid.appauth.TokenRequest;
					public setScope(param0: string): net.openid.appauth.TokenRequest.Builder;
					public setGrantType(param0: string): net.openid.appauth.TokenRequest.Builder;
					public setAdditionalParameters(param0: java.util.Map<string,string>): net.openid.appauth.TokenRequest.Builder;
					public setRefreshToken(param0: string): net.openid.appauth.TokenRequest.Builder;
					public setCodeVerifier(param0: string): net.openid.appauth.TokenRequest.Builder;
					public setClientId(param0: string): net.openid.appauth.TokenRequest.Builder;
					public setAuthorizationCode(param0: string): net.openid.appauth.TokenRequest.Builder;
					public setScopes(param0: native.Array<string>): net.openid.appauth.TokenRequest.Builder;
					public constructor(param0: net.openid.appauth.AuthorizationServiceConfiguration, param1: string);
					public setScopes(param0: java.lang.Iterable<string>): net.openid.appauth.TokenRequest.Builder;
					public setNonce(param0: string): net.openid.appauth.TokenRequest.Builder;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class TokenResponse {
				public static class: java.lang.Class<net.openid.appauth.TokenResponse>;
				public static TOKEN_TYPE_BEARER: string;
				public request: net.openid.appauth.TokenRequest;
				public tokenType: string;
				public accessToken: string;
				public accessTokenExpirationTime: java.lang.Long;
				public idToken: string;
				public refreshToken: string;
				public scope: string;
				public additionalParameters: java.util.Map<string,string>;
				public jsonSerialize(): org.json.JSONObject;
				public jsonSerializeString(): string;
				public getScopeSet(): java.util.Set<string>;
				public static jsonDeserialize(param0: org.json.JSONObject): net.openid.appauth.TokenResponse;
				public static jsonDeserialize(param0: string): net.openid.appauth.TokenResponse;
			}
			export module TokenResponse {
				export class Builder {
					public static class: java.lang.Class<net.openid.appauth.TokenResponse.Builder>;
					public setAccessTokenExpiresIn(param0: java.lang.Long): net.openid.appauth.TokenResponse.Builder;
					public setScope(param0: string): net.openid.appauth.TokenResponse.Builder;
					public constructor(param0: net.openid.appauth.TokenRequest);
					public setIdToken(param0: string): net.openid.appauth.TokenResponse.Builder;
					public fromResponseJson(param0: org.json.JSONObject): net.openid.appauth.TokenResponse.Builder;
					public setTokenType(param0: string): net.openid.appauth.TokenResponse.Builder;
					public setAccessTokenExpirationTime(param0: java.lang.Long): net.openid.appauth.TokenResponse.Builder;
					public fromResponseJsonString(param0: string): net.openid.appauth.TokenResponse.Builder;
					public setAccessToken(param0: string): net.openid.appauth.TokenResponse.Builder;
					public setScopes(param0: native.Array<string>): net.openid.appauth.TokenResponse.Builder;
					public setAdditionalParameters(param0: java.util.Map<string,string>): net.openid.appauth.TokenResponse.Builder;
					public setScopes(param0: java.lang.Iterable<string>): net.openid.appauth.TokenResponse.Builder;
					public build(): net.openid.appauth.TokenResponse;
					public setRequest(param0: net.openid.appauth.TokenRequest): net.openid.appauth.TokenResponse.Builder;
					public setRefreshToken(param0: string): net.openid.appauth.TokenResponse.Builder;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export class Utils {
				public static class: java.lang.Class<net.openid.appauth.Utils>;
				public static closeQuietly(param0: java.io.InputStream): void;
				public static readInputStream(param0: java.io.InputStream): string;
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module browser {
				export class AnyBrowserMatcher extends net.openid.appauth.browser.BrowserMatcher {
					public static class: java.lang.Class<net.openid.appauth.browser.AnyBrowserMatcher>;
					public static INSTANCE: net.openid.appauth.browser.AnyBrowserMatcher;
					public matches(param0: net.openid.appauth.browser.BrowserDescriptor): boolean;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module browser {
				export class BrowserAllowList extends net.openid.appauth.browser.BrowserMatcher {
					public static class: java.lang.Class<net.openid.appauth.browser.BrowserAllowList>;
					public constructor(param0: native.Array<net.openid.appauth.browser.BrowserMatcher>);
					public matches(param0: net.openid.appauth.browser.BrowserDescriptor): boolean;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module browser {
				export class BrowserDenyList extends net.openid.appauth.browser.BrowserMatcher {
					public static class: java.lang.Class<net.openid.appauth.browser.BrowserDenyList>;
					public constructor(param0: native.Array<net.openid.appauth.browser.BrowserMatcher>);
					public matches(param0: net.openid.appauth.browser.BrowserDescriptor): boolean;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module browser {
				export class BrowserDescriptor {
					public static class: java.lang.Class<net.openid.appauth.browser.BrowserDescriptor>;
					public packageName: string;
					public signatureHashes: java.util.Set<string>;
					public version: string;
					public useCustomTab: java.lang.Boolean;
					public constructor(param0: string, param1: java.util.Set<string>, param2: string, param3: boolean);
					public equals(param0: any): boolean;
					public static generateSignatureHash(param0: globalAndroid.content.pm.Signature): string;
					public changeUseCustomTab(param0: boolean): net.openid.appauth.browser.BrowserDescriptor;
					public static generateSignatureHashes(param0: native.Array<globalAndroid.content.pm.Signature>): java.util.Set<string>;
					public hashCode(): number;
					public constructor(param0: globalAndroid.content.pm.PackageInfo, param1: boolean);
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module browser {
				export class BrowserMatcher {
					public static class: java.lang.Class<net.openid.appauth.browser.BrowserMatcher>;
					/**
					 * Constructs a new instance of the net.openid.appauth.browser.BrowserMatcher interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						matches(param0: net.openid.appauth.browser.BrowserDescriptor): boolean;
					});
					public constructor();
					public matches(param0: net.openid.appauth.browser.BrowserDescriptor): boolean;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module browser {
				export class BrowserSelector {
					public static class: java.lang.Class<net.openid.appauth.browser.BrowserSelector>;
					public constructor();
					public static getAllBrowsers(param0: globalAndroid.content.Context): java.util.List<net.openid.appauth.browser.BrowserDescriptor>;
					public static select(param0: globalAndroid.content.Context, param1: net.openid.appauth.browser.BrowserMatcher): net.openid.appauth.browser.BrowserDescriptor;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module browser {
				export class Browsers {
					public static class: java.lang.Class<net.openid.appauth.browser.Browsers>;
				}
				export module Browsers {
					export class Chrome {
						public static class: java.lang.Class<net.openid.appauth.browser.Browsers.Chrome>;
						public static PACKAGE_NAME: string;
						public static SIGNATURE: string;
						public static SIGNATURE_SET: java.util.Set<string>;
						public static MINIMUM_VERSION_FOR_CUSTOM_TAB: net.openid.appauth.browser.DelimitedVersion;
						public static standaloneBrowser(param0: string): net.openid.appauth.browser.BrowserDescriptor;
						public static customTab(param0: string): net.openid.appauth.browser.BrowserDescriptor;
					}
					export class Firefox {
						public static class: java.lang.Class<net.openid.appauth.browser.Browsers.Firefox>;
						public static PACKAGE_NAME: string;
						public static SIGNATURE_HASH: string;
						public static SIGNATURE_SET: java.util.Set<string>;
						public static MINIMUM_VERSION_FOR_CUSTOM_TAB: net.openid.appauth.browser.DelimitedVersion;
						public static standaloneBrowser(param0: string): net.openid.appauth.browser.BrowserDescriptor;
						public static customTab(param0: string): net.openid.appauth.browser.BrowserDescriptor;
					}
					export class SBrowser {
						public static class: java.lang.Class<net.openid.appauth.browser.Browsers.SBrowser>;
						public static PACKAGE_NAME: string;
						public static SIGNATURE_HASH: string;
						public static SIGNATURE_SET: java.util.Set<string>;
						public static MINIMUM_VERSION_FOR_CUSTOM_TAB: net.openid.appauth.browser.DelimitedVersion;
						public static standaloneBrowser(param0: string): net.openid.appauth.browser.BrowserDescriptor;
						public static customTab(param0: string): net.openid.appauth.browser.BrowserDescriptor;
					}
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module browser {
				export class CustomTabManager {
					public static class: java.lang.Class<net.openid.appauth.browser.CustomTabManager>;
					public constructor(param0: globalAndroid.content.Context);
					public bind(param0: string): void;
					public dispose(): void;
					public createSession(param0: androidx.browser.customtabs.CustomTabsCallback, param1: native.Array<globalAndroid.net.Uri>): androidx.browser.customtabs.CustomTabsSession;
					public getClient(): androidx.browser.customtabs.CustomTabsClient;
					public createTabBuilder(param0: native.Array<globalAndroid.net.Uri>): androidx.browser.customtabs.CustomTabsIntent.Builder;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module browser {
				export class DelimitedVersion extends java.lang.Comparable<net.openid.appauth.browser.DelimitedVersion> {
					public static class: java.lang.Class<net.openid.appauth.browser.DelimitedVersion>;
					public equals(param0: any): boolean;
					public toString(): string;
					public constructor(param0: native.Array<number>);
					public compareTo(param0: net.openid.appauth.browser.DelimitedVersion): number;
					public static parse(param0: string): net.openid.appauth.browser.DelimitedVersion;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module browser {
				export class ExactBrowserMatcher extends net.openid.appauth.browser.BrowserMatcher {
					public static class: java.lang.Class<net.openid.appauth.browser.ExactBrowserMatcher>;
					public constructor(param0: net.openid.appauth.browser.BrowserDescriptor);
					public matches(param0: net.openid.appauth.browser.BrowserDescriptor): boolean;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module browser {
				export class VersionRange {
					public static class: java.lang.Class<net.openid.appauth.browser.VersionRange>;
					public static ANY_VERSION: net.openid.appauth.browser.VersionRange;
					public static atLeast(param0: string): net.openid.appauth.browser.VersionRange;
					public toString(): string;
					public static atMost(param0: string): net.openid.appauth.browser.VersionRange;
					public static atLeast(param0: net.openid.appauth.browser.DelimitedVersion): net.openid.appauth.browser.VersionRange;
					public matches(param0: net.openid.appauth.browser.DelimitedVersion): boolean;
					public matches(param0: string): boolean;
					public static atMost(param0: net.openid.appauth.browser.DelimitedVersion): net.openid.appauth.browser.VersionRange;
					public constructor(param0: net.openid.appauth.browser.DelimitedVersion, param1: net.openid.appauth.browser.DelimitedVersion);
					public static between(param0: string, param1: string): net.openid.appauth.browser.VersionRange;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module browser {
				export class VersionedBrowserMatcher extends net.openid.appauth.browser.BrowserMatcher {
					public static class: java.lang.Class<net.openid.appauth.browser.VersionedBrowserMatcher>;
					public static CHROME_CUSTOM_TAB: net.openid.appauth.browser.VersionedBrowserMatcher;
					public static CHROME_BROWSER: net.openid.appauth.browser.VersionedBrowserMatcher;
					public static FIREFOX_CUSTOM_TAB: net.openid.appauth.browser.VersionedBrowserMatcher;
					public static FIREFOX_BROWSER: net.openid.appauth.browser.VersionedBrowserMatcher;
					public static SAMSUNG_BROWSER: net.openid.appauth.browser.VersionedBrowserMatcher;
					public static SAMSUNG_CUSTOM_TAB: net.openid.appauth.browser.VersionedBrowserMatcher;
					public constructor(param0: string, param1: java.util.Set<string>, param2: boolean, param3: net.openid.appauth.browser.VersionRange);
					public matches(param0: net.openid.appauth.browser.BrowserDescriptor): boolean;
					public constructor(param0: string, param1: string, param2: boolean, param3: net.openid.appauth.browser.VersionRange);
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module connectivity {
				export class ConnectionBuilder {
					public static class: java.lang.Class<net.openid.appauth.connectivity.ConnectionBuilder>;
					/**
					 * Constructs a new instance of the net.openid.appauth.connectivity.ConnectionBuilder interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						openConnection(param0: globalAndroid.net.Uri): java.net.HttpURLConnection;
					});
					public constructor();
					public openConnection(param0: globalAndroid.net.Uri): java.net.HttpURLConnection;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module connectivity {
				export class DefaultConnectionBuilder extends net.openid.appauth.connectivity.ConnectionBuilder {
					public static class: java.lang.Class<net.openid.appauth.connectivity.DefaultConnectionBuilder>;
					public static INSTANCE: net.openid.appauth.connectivity.DefaultConnectionBuilder;
					public openConnection(param0: globalAndroid.net.Uri): java.net.HttpURLConnection;
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module internal {
				export class Logger {
					public static class: java.lang.Class<net.openid.appauth.internal.Logger>;
					public static errorWithStack(param0: java.lang.Throwable, param1: string, param2: native.Array<any>): void;
					public static warn(param0: string, param1: native.Array<any>): void;
					public static error(param0: string, param1: native.Array<any>): void;
					public static debugWithStack(param0: java.lang.Throwable, param1: string, param2: native.Array<any>): void;
					public static setInstance(param0: net.openid.appauth.internal.Logger): void;
					public static getInstance(): net.openid.appauth.internal.Logger;
					public static debug(param0: string, param1: native.Array<any>): void;
					public static verbose(param0: string, param1: native.Array<any>): void;
					public static infoWithStack(param0: java.lang.Throwable, param1: string, param2: native.Array<any>): void;
					public static warnWithStack(param0: java.lang.Throwable, param1: string, param2: native.Array<any>): void;
					public log(param0: number, param1: java.lang.Throwable, param2: string, param3: native.Array<any>): void;
					public static verboseWithStack(param0: java.lang.Throwable, param1: string, param2: native.Array<any>): void;
					public static info(param0: string, param1: native.Array<any>): void;
				}
				export module Logger {
					export class AndroidLogWrapper extends net.openid.appauth.internal.Logger.LogWrapper {
						public static class: java.lang.Class<net.openid.appauth.internal.Logger.AndroidLogWrapper>;
						public println(param0: number, param1: string, param2: string): void;
						public getStackTraceString(param0: java.lang.Throwable): string;
						public isLoggable(param0: string, param1: number): boolean;
					}
					export class LogWrapper {
						public static class: java.lang.Class<net.openid.appauth.internal.Logger.LogWrapper>;
						/**
						 * Constructs a new instance of the net.openid.appauth.internal.Logger$LogWrapper interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							println(param0: number, param1: string, param2: string): void;
							isLoggable(param0: string, param1: number): boolean;
							getStackTraceString(param0: java.lang.Throwable): string;
						});
						public constructor();
						public println(param0: number, param1: string, param2: string): void;
						public getStackTraceString(param0: java.lang.Throwable): string;
						public isLoggable(param0: string, param1: number): boolean;
					}
				}
			}
		}
	}
}

declare module net {
	export module openid {
		export module appauth {
			export module internal {
				export class UriUtil {
					public static class: java.lang.Class<net.openid.appauth.internal.UriUtil>;
					public static parseUriIfAvailable(param0: string): globalAndroid.net.Uri;
					public static getLongQueryParameter(param0: globalAndroid.net.Uri, param1: string): java.lang.Long;
					public static formUrlEncode(param0: java.util.Map<string,string>): string;
					public static formUrlDecode(param0: string): java.util.List<androidx.core.util.Pair<string,string>>;
					public static formUrlEncodeValue(param0: string): string;
					public static formUrlDecodeUnique(param0: string): java.util.Map<string,string>;
					public static appendQueryParameterIfNotNull(param0: globalAndroid.net.Uri.Builder, param1: string, param2: any): void;
					public static toCustomTabUriBundle(param0: native.Array<globalAndroid.net.Uri>, param1: number): java.util.List<globalAndroid.os.Bundle>;
				}
			}
		}
	}
}

//Generics information:
//net.openid.appauth.JsonUtil.Field:1
//net.openid.appauth.JsonUtil.ListField:1

