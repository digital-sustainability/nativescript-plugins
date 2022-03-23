import { Application } from '@nativescript/core';
import {
  AuthConfiguration,
  AuthorizeResult,
  BuiltInParameters,
  FreshTokenConfiguration,
  ServiceConfiguration,
} from '.';
import { NativescriptAppAuthCommon, NativescriptAppAuthError } from './common';

export class NativescriptAppAuth extends NativescriptAppAuthCommon {
  private static instance: NativescriptAppAuth;
  private authState: OIDAuthState;

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

  authorize({
    serviceConfiguration,
    clientId,
    redirectUrl,
    issuer,
    scopes,
    additionalParameters,
  }: AuthConfiguration): Promise<AuthorizeResult> {
    if (this.isServiceConfiguration(serviceConfiguration)) {
      const config = this.createServiceConfiguration(serviceConfiguration);
      return new Promise<AuthorizeResult>((resolve, reject) =>
        this.authorizeWithConfiguration(
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
      OIDAuthorizationService.discoverServiceConfigurationForIssuerCompletion(
        NSURL.URLWithString(issuer),
        (fetchedConfiguration, error) => {
          if (error) {
            reject(
              new NativescriptAppAuthError(
                error.localizedDescription,
                error.code
              )
            );
            return;
          }
          this.authorizeWithConfiguration(
            fetchedConfiguration,
            clientId,
            redirectUrl,
            scopes,
            resolve,
            reject,
            additionalParameters
          );
        }
      )
    );
  }

  fetchFreshTokens(): Promise<FreshTokenConfiguration> {
    const self = this;
    return new Promise<FreshTokenConfiguration>((resolve, reject) => {
      this.authState.performActionWithFreshTokens(
        (accessToken, idToken, error) => {
          if (error != null) {
            return reject(
              new NativescriptAppAuthError(
                error.localizedDescription,
                error.code
              )
            );
          }
          self.saveState(self.authState);
          return resolve({
            accessToken,
            idToken,
          });
        }
      );
    });
  }

  logout(): void {
    //TODO Add identity provider logout support. Use prompt: login as a workaround.
    this.authState = OIDAuthState.alloc();
    this.saveState(this.authState);
  }

  private authorizeWithConfiguration(
    config: OIDServiceConfiguration,
    clientId: string,
    redirectUri: string,
    scopes: string[],
    resolve: (value: AuthorizeResult | PromiseLike<AuthorizeResult>) => void,
    reject: (reason?: any) => void,
    additionalParameters?: BuiltInParameters & {
      [name: string]: string;
    }
  ): void {
    const additionalParameterDictionary = NSMutableDictionary.new<
      string,
      string
    >();

    if (additionalParameters) {
      for (const entry of Object.entries(additionalParameters)) {
        additionalParameterDictionary.setObjectForKey(entry[1], entry[0]);
      }
    }

    const req =
      OIDAuthorizationRequest.alloc().initWithConfigurationClientIdScopesRedirectURLResponseTypeAdditionalParameters(
        config,
        clientId,
        NSArray.arrayWithArray(scopes),
        NSURL.URLWithString(redirectUri),
        OIDResponseTypeCode,
        additionalParameterDictionary
      );
    const self = this;
    const rootController = Application.ios.rootController;
    OIDAuthState.authStateByPresentingAuthorizationRequestPresentingViewControllerCallback(
      req,
      rootController,
      (authState, error) => {
        if (error != null) {
          reject(
            new NativescriptAppAuthError(error.localizedDescription, error.code)
          );
          return;
        }
        // TODO: add typeguard
        if (authState == null) {
          reject(new NativescriptAppAuthError('AuthState is undefined', 0));
          return;
        }
        self.saveState(authState);
        resolve({
          accessToken: authState.lastTokenResponse.accessToken,
          idToken: authState.lastTokenResponse.idToken,
          refreshToken: authState.lastTokenResponse.refreshToken,
          accessTokenExpirationDate:
            authState.lastTokenResponse.accessTokenExpirationDate.getTime(),
          tokenType: authState.lastTokenResponse.tokenType,
          scopes: authState.lastTokenResponse.scope?.split(' ') ?? [],
          authorizationCode:
            authState.lastTokenResponse.request.authorizationCode,
        });
      }
    );
  }

  private createServiceConfiguration(
    serviceConfiguration: ServiceConfiguration
  ): OIDServiceConfiguration {
    const config = {
      authorizationEndpoint: NSURL.URLWithString(
        serviceConfiguration.authorizationEndpoint
      ),
      tokenEndpoint: NSURL.URLWithString(serviceConfiguration.tokenEndpoint),
    };

    const { registrationEndpoint } = serviceConfiguration;
    if (registrationEndpoint) {
      config['registrationEndpoint'] =
        NSURL.URLWithString(registrationEndpoint);
    }

    return new OIDServiceConfiguration(config);
  }

  private saveState(state: OIDAuthState) {
    this.authState = state;
    const archivedData = NSKeyedArchiver.archivedDataWithRootObject(state);
    const archivedDataString =
      archivedData.base64EncodedStringWithOptions(null);
    this.writeState(archivedDataString);
  }

  private loadState(): OIDAuthState {
    const archivedDataDataString = this.readState();
    if (archivedDataDataString == null) {
      return OIDAuthState.alloc();
    }
    try {
      const archivedData = NSData.alloc().initWithBase64EncodedStringOptions(
        archivedDataDataString,
        null
      );
      return NSKeyedUnarchiver.unarchiveObjectWithData(archivedData);
    } catch (error) {
      console.log(
        'NativescriptAppAuth: Failed to deserialize stored auth state - discarding'
      );
      return OIDAuthState.alloc();
    }
  }
}
