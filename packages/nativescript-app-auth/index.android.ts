import { AndroidActivityResultEventData, AndroidApplication, Application, Utils } from '@nativescript/core';
import { AuthConfiguration, ServiceConfiguration } from '.';
import { NativescriptAppAuthCommon } from './common';

// TODO: generate typing from AppAuth
declare var net: any;

const RC_AUTH = 52;

export class NativescriptAppAuth extends NativescriptAppAuthCommon {

  private static _onActivityResult = ({ requestCode, intent }: AndroidActivityResultEventData) => {
    // == null checks for undefined as well
    if (requestCode !== RC_AUTH || intent == null) {
      return
    }
    const response = net.openid.appauth.AuthorizationResponse.fromIntent(intent)
    const context = Utils.android.getApplicationContext();
    // Create service with default config
    const authService = new net.openid.appauth.AuthorizationService(context)

    const tokenRequest = response.createTokenExchangeRequest();

    authService.performTokenRequest(
      tokenRequest,
      new net.openid.appauth.AuthorizationService.TokenResponseCallback ({
        onTokenRequestCompleted(resp, error) {
          if (error != null) {
            console.error(error);
            return 
          }
          if (resp) {
            console.log(resp.accessToken)
          }
        }
      }) 
    )
    Application.android.off(AndroidApplication.activityResultEvent, NativescriptAppAuth._onActivityResult);
  }

  private static authorizeWithConfiguration(config: ServiceConfiguration, clientId: string, redirectUri: string, scopes: string[]) {
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

  static authorize({ serviceConfiguration, clientId, redirectUrl, issuer, scopes }: AuthConfiguration) {
    Application.android.on(AndroidApplication.activityResultEvent, NativescriptAppAuth._onActivityResult);

    if (serviceConfiguration != null) {
        this.authorizeWithConfiguration(
          serviceConfiguration,
          clientId,
          redirectUrl,
          scopes
        )
    }

    net.openid.appauth.AuthorizationServiceConfiguration.fetchFromIssuer(
      android.net.Uri.parse(issuer),
      new net.openid.appauth.AuthorizationServiceConfiguration.RetrieveConfigurationCallback({
        onFetchConfigurationCompleted(fetchedConfiguration, error) {
          if (error != null) {
            console.error(error);
            return 
          }
          NativescriptAppAuth.authorizeWithConfiguration(
            fetchedConfiguration,
            clientId,
            redirectUrl,
            scopes
          )
        }
      })
    );
  }
}