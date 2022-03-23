import {
  AndroidActivityResultEventData,
  AndroidApplication,
  Application,
  Utils,
} from '@nativescript/core';
import {
  AuthConfiguration,
  AuthorizeResult,
  BuiltInParameters,
  FreshTokenConfiguration,
  ServiceConfiguration,
} from '.';
import { NativescriptAppAuthCommon, NativescriptAppAuthError } from './common';

const RC_AUTH = 52;

export class NativescriptAppAuth extends NativescriptAppAuthCommon {
  private static instance: NativescriptAppAuth;
  private authState: net.openid.appauth.AuthState;

  private constructor() {
    super();
    this.authState = this.loadState();
  }

  static getInstance(): NativescriptAppAuth {
    if (!NativescriptAppAuth.instance) {
      NativescriptAppAuth.instance = new NativescriptAppAuth();
    }

    return NativescriptAppAuth.instance;
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
    const {
      resolve,
      reject,
    }: {
      resolve: (value: AuthorizeResult | PromiseLike<AuthorizeResult>) => void;
      reject: (reason?: any) => void;
    } = this;

    // == null checks for undefined as well
    if (intent == null) {
      reject(
        new NativescriptAppAuthError(
          'authentication_failed: Intent is null',
          1008
        )
      );
      return;
    }

    const response =
      net.openid.appauth.AuthorizationResponse.fromIntent(intent);
    const exception =
      net.openid.appauth.AuthorizationException.fromIntent(intent);

    this.updateAuthState(response, exception);

    if (response == null) {
      if (exception != null) {
        reject(
          new NativescriptAppAuthError(
            exception.error ??
              exception.errorDescription ??
              'authentication_failed',
            exception.code
          )
        );
      } else {
        reject(
          new NativescriptAppAuthError(
            'authentication_failed: Response is null',
            1008
          )
        );
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
            reject(
              new NativescriptAppAuthError(
                error.error ??
                  error.errorDescription ??
                  'token_exchange_failed',
                error.code
              )
            );
            return;
          }
          if (resp) {
            resolve({
              accessToken: resp.accessToken,
              idToken: resp.idToken,
              tokenType: resp.tokenType,
              refreshToken: resp.refreshToken,
              accessTokenExpirationDate: +resp.accessTokenExpirationTime,
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
    resolve: (value: AuthorizeResult | PromiseLike<AuthorizeResult>) => void,
    reject: (reason?: any) => void,
    additionalParameters?: BuiltInParameters & {
      [name: string]: string;
    }
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

    if (additionalParameters) {
      if (additionalParameters.display) {
        authRequestBuilder.setDisplay(additionalParameters.display);
      }

      if (additionalParameters.login_prompt) {
        authRequestBuilder.setLoginHint(additionalParameters.login_prompt);
      }

      if (additionalParameters.prompt) {
        authRequestBuilder.setPrompt(additionalParameters.prompt);
      }
    }

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
    additionalParameters,
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
          reject,
          additionalParameters
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
                reject(
                  new NativescriptAppAuthError(
                    error.error ??
                      error.errorDescription ??
                      'service_configuration_fetch_error',
                    error.code
                  )
                );
              }
              self.authorizeWithConfiguration(
                fetchedConfiguration,
                clientId,
                redirectUrl,
                scopes,
                resolve,
                reject,
                additionalParameters
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
              return reject(
                new NativescriptAppAuthError(
                  ex.error ?? ex.errorDescription ?? 'token_refresh_failed',
                  ex.code
                )
              );
            }

            self.saveState(self.authState);
            return resolve({ accessToken, idToken });
          },
        })
      );
    });
  }

  logout(): void {
    //TODO Add identity provider logout support. Use prompt: login as a workaround.
    this.authState = new net.openid.appauth.AuthState();
    this.saveState(this.authState);
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
    this.saveState(this.authState);
  }

  private saveState(state: net.openid.appauth.AuthState): void {
    const serializedState = state.jsonSerializeString();
    this.writeState(serializedState);
  }

  private loadState(): net.openid.appauth.AuthState {
    const serializedState = this.readState();
    if (serializedState == null) {
      return new net.openid.appauth.AuthState();
    }

    try {
      return net.openid.appauth.AuthState.jsonDeserialize(serializedState);
    } catch (error) {
      console.log(
        'NativescriptAppAuth: Failed to deserialize stored auth state - discarding'
      );
      return new net.openid.appauth.AuthState();
    }
  }
}
