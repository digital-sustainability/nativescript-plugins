import { AndroidActivityResultEventData, AndroidApplication, Application, Utils } from '@nativescript/core';
import { AuthConfiguration, AuthorizeResult, ServiceConfiguration } from '.';
import { NativescriptAppAuthCommon } from './common';

const RC_AUTH = 52;
export class NativescriptAppAuth extends NativescriptAppAuthCommon {

  private static _onActivityResult({ requestCode, intent }: AndroidActivityResultEventData): void {
    if (requestCode !== RC_AUTH) {
      return
    }

    Application.android.off(AndroidApplication.activityResultEvent, NativescriptAppAuth._onActivityResult);

    // @ts-ignore
    const {resolve, reject } = this;

    // == null checks for undefined as well
    if (intent == null) {
      reject('error: intent is null')
      return;
    }

    const response = net.openid.appauth.AuthorizationResponse.fromIntent(intent)

    if (response == null) {
      reject('error: response is null');
      return;
    }

    const context = Utils.android.getApplicationContext();
    // Create service with default config
    const authService = new net.openid.appauth.AuthorizationService(context)

    const tokenRequest = response.createTokenExchangeRequest();

    authService.performTokenRequest(
      tokenRequest,
      new net.openid.appauth.AuthorizationService.TokenResponseCallback ({
        onTokenRequestCompleted(resp, error) {
          if (error != null) {
            reject(error);
            return;
          }
          if (resp) {
            resolve({
              accessToken: resp.accessToken,
              idToken: resp.idToken,
              tokenType: resp.tokenType,
              refreshToken: resp.refreshToken ?? '',
              accessTokenExpirationDate: resp.accessTokenExpirationTime,
              scopes: resp.scope?.split(" ") ?? [],
              authorizationCode: resp.request.authorizationCode,
            });
          }
        }
      }) 
    )
  }

  private static authorizeWithConfiguration(config: net.openid.appauth.AuthorizationServiceConfiguration, clientId: string, redirectUri: string, scopes: string[], resolve, reject): void {
    Application.android.on(AndroidApplication.activityResultEvent, NativescriptAppAuth._onActivityResult, {resolve, reject});

    const authRequestBuilder = new net.openid.appauth.AuthorizationRequest.Builder(
      config, 
      clientId, 
      net.openid.appauth.ResponseTypeValues.CODE, 
      android.net.Uri.parse(redirectUri)
    ); 
    const authRequest = authRequestBuilder.setScope(scopes.join(" ")).build();

    const context = Utils.android.getApplicationContext();
    // Create service with default config
    const authService = new net.openid.appauth.AuthorizationService(context)
    const authIntent = authService.getAuthorizationRequestIntent(authRequest);

    const currentActivity = (Application.android.foregroundActivity || Application.android.startActivity);
    // TODO: Add Android SDK Version check
    currentActivity.startActivityForResult(authIntent, RC_AUTH);
  }

  static authorize({ serviceConfiguration, clientId, redirectUrl, issuer, scopes }: AuthConfiguration): Promise<AuthorizeResult> {

    if (this.isServiceConfiguration(serviceConfiguration)) {
      const config = this.createServiceConfiguration(serviceConfiguration);
        return new Promise<AuthorizeResult>((resolve, reject) => 
          NativescriptAppAuth.authorizeWithConfiguration(
            config,
            clientId,
            redirectUrl,
            scopes,
            resolve,
            reject
          )
        )
    }

    return new Promise<AuthorizeResult>((resolve, reject) => 
      net.openid.appauth.AuthorizationServiceConfiguration.fetchFromIssuer(
        android.net.Uri.parse(issuer),
        new net.openid.appauth.AuthorizationServiceConfiguration.RetrieveConfigurationCallback({
          onFetchConfigurationCompleted(fetchedConfiguration, error) {
            if (error != null) {
              reject(error);
            }
            NativescriptAppAuth.authorizeWithConfiguration(
              fetchedConfiguration,
              clientId,
              redirectUrl,
              scopes,
              resolve,
              reject
            )
          }
        })
      )
    );
  }

  private static createServiceConfiguration(serviceConfiguration: ServiceConfiguration ): net.openid.appauth.AuthorizationServiceConfiguration {
    const { registrationEndpoint } = serviceConfiguration;
    if (registrationEndpoint != null) {
      return new net.openid.appauth.AuthorizationServiceConfiguration(
        android.net.Uri.parse(serviceConfiguration.authorizationEndpoint),
        android.net.Uri.parse(serviceConfiguration.tokenEndpoint),
        android.net.Uri.parse(registrationEndpoint)
      )
    }
    return new net.openid.appauth.AuthorizationServiceConfiguration(
      android.net.Uri.parse(serviceConfiguration.authorizationEndpoint),
      android.net.Uri.parse(serviceConfiguration.tokenEndpoint)
    );
  }
}