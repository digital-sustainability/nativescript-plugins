import {
	AndroidActivityResultEventData,
	AndroidApplication,
	Application,
	Utils,
} from '@nativescript/core';
import {
	AuthConfiguration,
	AuthorizeResult,
	FreshTokenConfiguration,
	ServiceConfiguration,
} from '.';
import { NativescriptAppAuthCommon } from './common';
import * as application from '@nativescript/core/application';

const RC_AUTH = 52;
const STORE_NAME = 'AuthState';
const KEY_STATE = 'state';

export class NativescriptAppAuth extends NativescriptAppAuthCommon {
	private authState: net.openid.appauth.AuthState;
	private mPrefs: android.content.SharedPreferences;

	constructor() {
		super();
		this.mPrefs = application.android.context.getSharedPreferences(
			STORE_NAME,
			android.content.Context.MODE_PRIVATE
		);
		this.authState = this.readState();
	}

	private _onActivityResult({
		requestCode,
		intent,
	}: AndroidActivityResultEventData): void {
		if (requestCode !== RC_AUTH) {
			return;
		}

		Application.android.off(
			AndroidApplication.activityResultEvent,
			this._onActivityResult
		);

		// @ts-ignore
		const { resolve, reject } = this;

		// == null checks for undefined as well
		if (intent == null) {
			reject('error: intent is null');
			return;
		}

		const response =
			net.openid.appauth.AuthorizationResponse.fromIntent(intent);
		const exception =
			net.openid.appauth.AuthorizationException.fromIntent(intent);

		this.updateAuthState(response, exception);

		if (response == null) {
			if (exception != null) {
				reject(`${exception.error}: ${exception.errorDescription}`);
			} else {
				reject('error: response is null');
			}
			return;
		}

		const context = Utils.android.getApplicationContext();
		// Create service with default config
		const authService = new net.openid.appauth.AuthorizationService(context);

		const tokenRequest = response.createTokenExchangeRequest();
		const self = this;
		authService.performTokenRequest(
			tokenRequest,
			new net.openid.appauth.AuthorizationService.TokenResponseCallback({
				onTokenRequestCompleted(resp, error) {
					self.updateAuthState(resp, error);
					if (error != null) {
						reject(error);
						return;
					}
					if (resp) {
						resolve({
							accessToken: resp.accessToken,
							idToken: resp.idToken,
							tokenType: resp.tokenType,
							refreshToken: resp.refreshToken,
							accessTokenExpirationDate: resp.accessTokenExpirationTime,
							scopes: resp.scope?.split(' ') ?? [],
							authorizationCode: resp.request.authorizationCode,
						});
					}
				},
			})
		);
	}

	private authorizeWithConfiguration(
		config: net.openid.appauth.AuthorizationServiceConfiguration,
		clientId: string,
		redirectUri: string,
		scopes: string[],
		resolve,
		reject
	): void {
		Application.android.on(
			AndroidApplication.activityResultEvent,
			this._onActivityResult,
			Object.assign(this, { resolve, reject })
		);

		const authRequestBuilder =
			new net.openid.appauth.AuthorizationRequest.Builder(
				config,
				clientId,
				net.openid.appauth.ResponseTypeValues.CODE,
				android.net.Uri.parse(redirectUri)
			);
		const authRequest = authRequestBuilder.setScope(scopes.join(' ')).build();

		const context = Utils.android.getApplicationContext();
		// Create service with default config
		const authService = new net.openid.appauth.AuthorizationService(context);
		const authIntent = authService.getAuthorizationRequestIntent(authRequest);

		const currentActivity =
			Application.android.foregroundActivity ||
			Application.android.startActivity;
		// TODO: Add Android SDK Version check
		currentActivity.startActivityForResult(authIntent, RC_AUTH);
	}

	authorize({
		serviceConfiguration,
		clientId,
		redirectUrl,
		issuer,
		scopes,
	}: AuthConfiguration): Promise<AuthorizeResult> {
		const self = this;
		if (this.isServiceConfiguration(serviceConfiguration)) {
			const config = this.createServiceConfiguration(serviceConfiguration);
			return new Promise<AuthorizeResult>((resolve, reject) =>
				self.authorizeWithConfiguration(
					config,
					clientId,
					redirectUrl,
					scopes,
					resolve,
					reject
				)
			);
		}

		return new Promise<AuthorizeResult>((resolve, reject) =>
			net.openid.appauth.AuthorizationServiceConfiguration.fetchFromIssuer(
				android.net.Uri.parse(issuer),
				new net.openid.appauth.AuthorizationServiceConfiguration.RetrieveConfigurationCallback(
					{
						onFetchConfigurationCompleted(fetchedConfiguration, error) {
							if (error != null) {
								reject(error);
							}
							self.authorizeWithConfiguration(
								fetchedConfiguration,
								clientId,
								redirectUrl,
								scopes,
								resolve,
								reject
							);
						},
					}
				)
			)
		);
	}

	fetchFreshTokens(): Promise<FreshTokenConfiguration> {
		return new Promise<FreshTokenConfiguration>((resolve, reject) => {
			const context = Utils.android.getApplicationContext();
			const authService = new net.openid.appauth.AuthorizationService(context);
			const self = this;
			this.authState.performActionWithFreshTokens(
				authService,
				new net.openid.appauth.AuthState.AuthStateAction({
					execute(accessToken, idToken, ex) {
						if (ex != null) {
							return reject(ex);
						}

						self.writeState(self.authState);
						return resolve({ accessToken, idToken });
					},
				})
			);
		});
	}

	private createServiceConfiguration(
		serviceConfiguration: ServiceConfiguration
	): net.openid.appauth.AuthorizationServiceConfiguration {
		const { registrationEndpoint } = serviceConfiguration;
		if (registrationEndpoint != null) {
			return new net.openid.appauth.AuthorizationServiceConfiguration(
				android.net.Uri.parse(serviceConfiguration.authorizationEndpoint),
				android.net.Uri.parse(serviceConfiguration.tokenEndpoint),
				android.net.Uri.parse(registrationEndpoint)
			);
		}
		return new net.openid.appauth.AuthorizationServiceConfiguration(
			android.net.Uri.parse(serviceConfiguration.authorizationEndpoint),
			android.net.Uri.parse(serviceConfiguration.tokenEndpoint)
		);
	}

	private updateAuthState(
		resp:
			| net.openid.appauth.TokenResponse
			| net.openid.appauth.AuthorizationResponse,
		ex: net.openid.appauth.AuthorizationException
	) {
		this.authState.update(resp as any, ex);
		this.writeState(this.authState);
	}

	private writeState(state: net.openid.appauth.AuthState): void {
		const editor: android.content.SharedPreferences.Editor = this.mPrefs.edit();
		if (state == null) {
			editor.remove(KEY_STATE);
		} else {
			editor.putString(KEY_STATE, state.jsonSerializeString());
		}

		if (!editor.commit()) {
			throw new Error('Failed to write state to shared prefs');
		}
	}

	private readState(): net.openid.appauth.AuthState {
		const currentState = this.mPrefs.getString(KEY_STATE, null);
		if (currentState == null) {
			return new net.openid.appauth.AuthState();
		}

		try {
			return net.openid.appauth.AuthState.jsonDeserialize(currentState);
		} catch (error) {
			console.log('Failed to deserialize stored auth state - discarding');
			return new net.openid.appauth.AuthState();
		}
	}
}
