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

  elements: any;
  id: any;

  getInput() {
    this.route.queryParams.subscribe((res) => {
      this.id = res["val"];
    });
    this.http
      .get<any>(`http://localhost:4000/forms/${this.id}`)
      .subscribe((data) => {
        this.elements = data["formData"];
      });
  }

  editId() {
    let value = this.id;
    this.router.navigate(["/new-form"], {
      queryParams: { edited: value },
    });
  }

  ngOnInit(): void {
    this.getInput();
  }
}
