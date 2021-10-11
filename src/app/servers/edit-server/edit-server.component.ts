import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable } from "rxjs";
import { CanDeactiveComponent } from "src/app/shared/can-deactive.interface";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit, CanDeactiveComponent {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";

  changesSaved: boolean = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.server = this.serversService.getServer(1);

    console.log(this.route.snapshot.fragment);
    console.log(this.route.snapshot.queryParams);

    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params["id"]);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    });
    this.route.queryParams.subscribe((queryParams) => console.log(queryParams));
    this.route.fragment.subscribe((params: string) => console.log(params));
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });

    this.changesSaved = true;

    this.router.navigate(["../"], {
      relativeTo: this.route,
    });
  }

  canDeactivateComponent(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changesSaved) {
      return true;
    }
    if (
      (this.server.name !== this.serverName ||
        this.server.status !== this.serverStatus) &&
      !this.changesSaved
    ) {
      return confirm("are you sure you want to exit");
    }
  }
}
