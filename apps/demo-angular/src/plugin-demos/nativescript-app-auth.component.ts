import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptAppAuth } from '@demo/shared';
import { } from '@digital-sustainability/nativescript-app-auth';

@Component({
	selector: 'demo-nativescript-app-auth',
	templateUrl: 'nativescript-app-auth.component.html',
})
export class NativescriptAppAuthComponent {
  
  demoShared: DemoSharedNativescriptAppAuth;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptAppAuth();
  }

}