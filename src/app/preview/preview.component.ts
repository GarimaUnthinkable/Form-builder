import { Component, OnInit } from "@angular/core";
import { ServerService } from "../services/server.service";

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.css"],
})
export class PreviewComponent implements OnInit {
  constructor(public server: ServerService) {}

  element: any[] = [];
  preview:any;

  getForm() {
    this.server.getUser().subscribe((res) => {
      console.log(res);
      this.preview = res;
    });
  }

  ngOnInit(): void {}
}
