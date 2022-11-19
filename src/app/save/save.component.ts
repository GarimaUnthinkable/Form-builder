import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ServerService } from "../services/server.service";

@Component({
  selector: "app-save",
  templateUrl: "./save.component.html",
  styleUrls: ["./save.component.css"],
})
export class SaveComponent implements OnInit {
  list: any;

  constructor(public server: ServerService, public http: HttpClient) {}

  getDetails() {
    this.server.getUser().subscribe((res) => {
      console.log(res);
      this.list = res;
    });
  }

  delete(index: any) {
    this.http
      .delete<any>(`http://localhost:4000/forms/${index.id}`)
      .subscribe((res) => {
        return res;
      });
    this.getDetails();
  }

  getId(index:any) {
    this.http
    .get<any>(`http://localhost:4000/forms/${index.id}`)
    .subscribe((res) => {
      return res;
    });
  this.getDetails();
  }

  ngOnInit(): void {
    this.getDetails();
  }
}
