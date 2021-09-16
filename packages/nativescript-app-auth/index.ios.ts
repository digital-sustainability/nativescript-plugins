import { Application } from '@nativescript/core';
import { AuthConfiguration, ServiceConfiguration } from '.';
import { NativescriptAppAuthCommon } from './common';

// TODO: generate typing from AppAuth
declare var OIDAuthorizationService;
declare var OIDAuthorizationRequest;
declare var OIDResponseTypeCode;
declare var OIDAuthState
export class NativescriptAppAuth extends NativescriptAppAuthCommon {
  static authorize({ serviceConfiguration, clientId, redirectUrl, issuer, scopes}: AuthConfiguration) {
    if (serviceConfiguration != null) {
      this.authorizeWithConfiguration(serviceConfiguration, clientId, redirectUrl, scopes);
    }
    OIDAuthorizationService.discoverServiceConfigurationForIssuerCompletion(
      NSURL.URLWithString(issuer), 
      (fetchedConfiguration, error) => {
        if (error) {
          console.error(error)
          return;
        }
        this.authorizeWithConfiguration(fetchedConfiguration, clientId, redirectUrl, scopes)
      }
    );
  }

  private static authorizeWithConfiguration(config: ServiceConfiguration, clientId: string, redirectUri: string, scopes: string[]) {
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
          console.error(error);
          return
        }
        console.log(authState)
      }
    )
  }
}
