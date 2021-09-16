import { DemoSharedBase } from '../utils';
import { AuthConfiguration, NativescriptAppAuth } from '@digital-sustainability/nativescript-app-auth';

export class DemoSharedNativescriptAppAuth extends DemoSharedBase {
  testIt() {
    const config: AuthConfiguration = {
      issuer: '<YOUR_ISSUER_URL>',
      clientId: '<YOUR_CLIENT_ID>',
      redirectUrl: '<YOUR_REDIRECT_URL>',
      scopes: ['<YOUR_SCOPE_ARRAY>'],
    };
    NativescriptAppAuth.authorize(config).then(
      auth => console.log(`log auth: ${auth}`)
    ).catch(
      (err) => console.log(`log error: ${err}`)
    )
  }
}