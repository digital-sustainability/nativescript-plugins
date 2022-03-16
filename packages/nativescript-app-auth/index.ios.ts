import { Application } from '@nativescript/core';
import {
  AuthConfiguration,
  AuthorizeResult,
  FreshTokenConfiguration,
  ServiceConfiguration,
} from '.';
import { NativescriptAppAuthCommon } from './common';

export class NativescriptAppAuth extends NativescriptAppAuthCommon {
  private authState: OIDAuthState;

  constructor() {
    super();
    this.authState = this.loadState();
  }

  authorize({
    serviceConfiguration,
    clientId,
    redirectUrl,
    issuer,
    scopes,
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
          reject
        )
      );
    }
    return new Promise<AuthorizeResult>((resolve, reject) =>
      OIDAuthorizationService.discoverServiceConfigurationForIssuerCompletion(
        NSURL.URLWithString(issuer),
        (fetchedConfiguration, error) => {
          if (error) {
            reject(error);
            return;
          }
          this.authorizeWithConfiguration(
            fetchedConfiguration,
            clientId,
            redirectUrl,
            scopes,
            resolve,
            reject
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
            return reject(error);
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

  private authorizeWithConfiguration(
    config: OIDServiceConfiguration,
    clientId: string,
    redirectUri: string,
    scopes: string[],
    resolve,
    reject
  ): void {
    const additionalParameters = NSDictionary.new<string, string>();
    const req =
      OIDAuthorizationRequest.alloc().initWithConfigurationClientIdScopesRedirectURLResponseTypeAdditionalParameters(
        config,
        clientId,
        NSArray.arrayWithArray(scopes),
        NSURL.URLWithString(redirectUri),
        OIDResponseTypeCode,
        additionalParameters
      );
    const self = this;
    const rootController = Application.ios.rootController;
    OIDAuthState.authStateByPresentingAuthorizationRequestPresentingViewControllerCallback(
      req,
      rootController,
      (authState, error) => {
        if (error != null) {
          reject(error);
          return;
        }
        // TODO: add typeguard
        if (authState == null) {
          reject('authState is undefined');
          return;
        }
        self.saveState(authState);
        resolve({
          accessToken: authState.lastTokenResponse.accessToken,
          idToken: authState.lastTokenResponse.idToken,
          refreshToken: authState.lastTokenResponse.refreshToken,
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
      console.log('Failed to deserialize stored auth state - discarding');
      return OIDAuthState.alloc();
    }
  }
}
