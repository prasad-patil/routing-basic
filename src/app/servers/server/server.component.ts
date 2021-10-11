import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Params, Router } from "@angular/router";
import { Server } from "src/app/shared/server.model";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit {
  server: Server;
  serverId: number;
  allowServerEdit: boolean = false;

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((param: Params) => {
    //   this.serverId = param["id"];
    //   this.server = this.serversService.getServer(+this.serverId);
    //   console.log("server is", this.server);
    // });

    this.route.data.subscribe((data: Data) => {
      this.server = data["server"];
      this.serverId = this.server.id;
    });

    this.route.queryParams.subscribe(
      (data) =>
        (this.allowServerEdit =
          String(data["allowEdit"]).toLocaleLowerCase() === "true")
    );
  }

  editServer() {
    // here we have two option to navigate
    // one is using the routerlink and otherone using router service
    //       [routerLink]="['../' + server?.id, 'edit']"

    this.router.navigate([`../${this.server.id}`, "edit"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
  }
}
