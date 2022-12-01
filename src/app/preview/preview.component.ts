import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ServerService } from "../services/server.service";

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.css"],
})
export class PreviewComponent implements OnInit {
  constructor(
    public server: ServerService,
    public http: HttpClient,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  inputs: any;
  inputId: any;

  getInput() {
    this.route.queryParams.subscribe((res) => {
      this.inputId = res["val"];
    });
    this.http
      .get<any>(`http://localhost:4000/forms/${this.inputId}`)
      .subscribe((data) => {
        this.inputs = data["formData"];
      });
  }

  editId() {
    let value = this.inputId;
    this.router.navigate(["/new-form"], {
      queryParams: { edited: value },
    });
  }

  ngOnInit(): void {
    this.getInput();
  }
}
