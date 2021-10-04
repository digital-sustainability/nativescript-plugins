import { Application } from '@nativescript/core';
import { AuthConfiguration, AuthorizeResult, ServiceConfiguration } from '.';
import { NativescriptAppAuthCommon } from './common';

export class NativescriptAppAuth extends NativescriptAppAuthCommon {
  static authorize({ serviceConfiguration, clientId, redirectUrl, issuer, scopes}: AuthConfiguration): Promise<AuthorizeResult> {
    if (this.isServiceConfiguration(serviceConfiguration)) {
      const config = this.createServiceConfiguration(serviceConfiguration);
      return new Promise<AuthorizeResult>(
        (resolve, reject) => this.authorizeWithConfiguration(config, clientId, redirectUrl, scopes, resolve, reject)
      );
    }
    return new Promise<AuthorizeResult>(
      (resolve, reject) => OIDAuthorizationService.discoverServiceConfigurationForIssuerCompletion(
        NSURL.URLWithString(issuer), 
        (fetchedConfiguration, error) => {
          if (error) {
            reject(error)
          }
          this.authorizeWithConfiguration(fetchedConfiguration, clientId, redirectUrl, scopes, resolve, reject)
        }
      )
    )
  }

  private static authorizeWithConfiguration(config: OIDServiceConfiguration, clientId: string, redirectUri: string, scopes: string[], resolve, reject): void {
    const additionalParameters = NSDictionary.new<string,string>(); 
    const req = OIDAuthorizationRequest.alloc()
      .initWithConfigurationClientIdScopesRedirectURLResponseTypeAdditionalParameters(
        config, 
        clientId, 
        NSArray.arrayWithArray(scopes),
        NSURL.URLWithString(redirectUri), 
        OIDResponseTypeCode, 
        additionalParameters
      );
    const rootController = Application.ios.rootController;
    OIDAuthState.authStateByPresentingAuthorizationRequestPresentingViewControllerCallback(
      req, 
      rootController, 
      (authState, error) => {
        if (error != null) {
          reject(error)
        }
        resolve({
          accessToken: authState.lastTokenResponse.accessToken,
          idToken: authState.lastTokenResponse.idToken,
          refreshToken: authState.lastTokenResponse.refreshToken,
          tokenType: authState.lastTokenResponse.tokenType,
          scopes: authState.lastTokenResponse.scope?.split(" ") ?? [],
          authorizationCode: authState.lastTokenResponse.request.authorizationCode,
        })
      }
    )
  }

  private static createServiceConfiguration(serviceConfiguration: ServiceConfiguration ): OIDServiceConfiguration {
    const config = {
      authorizationEndpoint: NSURL.URLWithString(serviceConfiguration.authorizationEndpoint),
      tokenEndpoint: NSURL.URLWithString(serviceConfiguration.tokenEndpoint),
    };

    const { registrationEndpoint } = serviceConfiguration;
    if (registrationEndpoint) {
      config['registrationEndpoint'] = NSURL.URLWithString(registrationEndpoint);
    }

    return new OIDServiceConfiguration(config);
  }
}
