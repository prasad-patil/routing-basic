import { Observable } from "rxjs";

export interface CanDeactiveComponent {
  canDeactivateComponent(): Observable<boolean> | Promise<boolean> | boolean;
}
