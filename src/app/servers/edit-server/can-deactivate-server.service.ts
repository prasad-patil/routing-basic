import { Component } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { CanDeactiveComponent } from "src/app/shared/can-deactive.interface";
import { EditServerComponent } from "./edit-server.component";

export class CanDeactivateServer
  implements CanDeactivate<CanDeactiveComponent>
{
  canDeactivate(
    component: EditServerComponent,
    route: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivateComponent();
  }
}
