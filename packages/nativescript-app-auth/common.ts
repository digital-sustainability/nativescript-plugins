import { SecureStorage } from '@nativescript/secure-storage';
import { ServiceConfiguration } from '.';

const STATE_KEY = 'appAuthState';

export class NativescriptAppAuthCommon {
  private secureStorage: SecureStorage;

  protected constructor() {
    this.secureStorage = new SecureStorage();
  }

  protected isServiceConfiguration(obj: unknown): obj is ServiceConfiguration {
    return (
      obj != null &&
      typeof (obj as ServiceConfiguration).authorizationEndpoint === 'string' &&
      typeof (obj as ServiceConfiguration).tokenEndpoint === 'string'
    );
  }

  protected writeState(state: string): boolean {
    return this.secureStorage.setSync({
      key: STATE_KEY,
      value: state,
    });
  }

  protected readState(): string {
    return this.secureStorage.getSync({
      key: STATE_KEY,
    });
  }
}

export class NativescriptAppAuthError extends Error {
  name = 'NativescriptAppAuthError';
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}
