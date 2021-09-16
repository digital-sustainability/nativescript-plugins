import { Application } from '@nativescript/core';
import { AuthConfiguration, AuthorizeResult, ServiceConfiguration } from '.';
import { NativescriptAppAuthCommon } from './common';

// TODO: generate typing from AppAuth
declare var OIDAuthorizationService;
declare var OIDAuthorizationRequest;
declare var OIDResponseTypeCode;
declare var OIDAuthState
export class NativescriptAppAuth extends NativescriptAppAuthCommon {
  static authorize({ serviceConfiguration, clientId, redirectUrl, issuer, scopes}: AuthConfiguration): Promise<AuthorizeResult> {
    if (serviceConfiguration != null) {
      return new Promise<AuthorizeResult>(
        (resolve, reject) => this.authorizeWithConfiguration(serviceConfiguration, clientId, redirectUrl, scopes, resolve, reject)
      );
    }
    return new Promise<AuthorizeResult>(
      (resolve, reject) => OIDAuthorizationService.discoverServiceConfigurationForIssuerCompletion(
        NSURL.URLWithString(issuer), 
        (fetchedConfiguration, error) => {
          if (error) {
            console.error(error)
            reject(error)
          }
          this.authorizeWithConfiguration(fetchedConfiguration, clientId, redirectUrl, scopes, resolve, reject)
        }
      )
    )
  }

  private static authorizeWithConfiguration(config: ServiceConfiguration, clientId: string, redirectUri: string, scopes: string[], resolve, reject): void {
    const additionalParameters = NSDictionary.new(); 
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
        console.log(authState)
        resolve(authState)
      }
    )
  }
}
