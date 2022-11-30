import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DeleteComponent } from "../delete/delete.component";
import { ServerService } from "../services/server.service";

@Component({
  selector: "app-save",
  templateUrl: "./save.component.html",
  styleUrls: ["./save.component.css"],
})
export class SaveComponent implements OnInit {
  list: any;
  id: any;

  constructor(
    public server: ServerService,
    public http: HttpClient,
    public router: Router,
    public dialog: MatDialog
  ) {}

  getDetails() {
    this.server.getUser().subscribe((res) => {
      this.list = res;
    });
  }

  delete(index: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.http
          .delete<any>(`http://localhost:4000/forms/${index.id}`)
          .subscribe((res) => {
            this.getDetails();
          });
      }
    });
  }

  formId(index: any) {
    let value = JSON.parse(JSON.stringify(index["id"]));
    this.router.navigate(["/preview"], {
      queryParams: { val: value },
    });
  }

  editId(index: any) {
    let value = index["id"];
    this.router.navigate(["/new-form"], {
      queryParams: { form: value },
    });
  }

  ngOnInit(): void {
    this.getDetails();
  }
}
