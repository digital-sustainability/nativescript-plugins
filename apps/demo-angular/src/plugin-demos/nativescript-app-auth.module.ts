import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptAppAuthComponent } from './nativescript-app-auth.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptAppAuthComponent }])],
  declarations: [NativescriptAppAuthComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptAppAuthModule {}
