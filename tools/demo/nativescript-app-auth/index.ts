import { DemoSharedBase } from '../utils';
import {
  AuthConfiguration,
  NativescriptAppAuth,
} from '@digital-sustainability/nativescript-app-auth';
export class DemoSharedNativescriptAppAuth extends DemoSharedBase {
  testIt() {
    const authConfig: AuthConfiguration = {
      issuer: '<YOUR_ISSUER_URL>',
      clientId: '<YOUR_CLIENT_ID>',
      redirectUrl: '<YOUR_REDIRECT_URL>',
      scopes: ['<YOUR_SCOPE_ARRAY>'],
    };

    const auth = new NativescriptAppAuth();
    auth
      .fetchFreshTokens()
      .then((res) => {
        console.log('Successfully retrieved fresh tokens!');
        console.dir(res);
      })
      .catch(() => {
        console.log('Fresh token retrieval failed!');
        auth
          .authorize(authConfig)
          .then(() => {
            console.log('Login successful');
            return auth.fetchFreshTokens();
          })
          .then((res) => {
            console.dir(res);
          })
          .catch((err) => console.log(`log error: ${err}`));
      });
  }
}
