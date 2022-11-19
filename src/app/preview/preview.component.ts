import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ServerService } from "../services/server.service";

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.css"],
})
export class PreviewComponent implements OnInit {
  constructor(public server: ServerService, public http: HttpClient) {}

  element: any[] = [];

  getForm() {
    this.server.getUser().subscribe((res) => {
      console.log(res);
    });
  }

  ngOnInit(): void {}
}
