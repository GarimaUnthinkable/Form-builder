import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { ServerService } from "../services/server.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormComponent } from "../form/form.component";

@Component({
  selector: "app-new-form",
  templateUrl: "./new-form.component.html",
  styleUrls: ["./new-form.component.css"],
})
export class NewFormComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public server: ServerService,
    public http: HttpClient,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  components: any = [
    {
      tittle: "Text",
      type: "input-text",
      inputType: "text",
      label: "text",
    },
    {
      tittle: "Password",
      type: "input-password",
      inputType: "password",
      label: "password",
    },
    {
      tittle: "Number",
      type: "input-number",
      inputType: "number",
      label: "number",
    },
    {
      tittle: "Email",
      type: "email",
      inputType: "email",
      label: "email",
    },
    {
      tittle: "Check Box",
      type: "input-check",
      inputType: "checkBox",
      label: "check-box",
      displayText: "Check box",
    },
    {
      tittle: "Button",
      type: "input-button",
      inputType: "button",
      label: "button",
    },
  ];
  name: any;
  obj = {};
  element: any = [];
  button = this.components[4];
  id: any;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  remove(index: any) {
    let val = this.element.indexOf(index);
    this.element.splice(val, 1);
  }

  type(html: any) {
    if (
      html.inputType === "text" ||
      html.inputType === "password" ||
      html.inputType === "number" ||
      html.inputType === "checkBox"
    ) {
      return (
        '<input type="' +
        this.components[html].inputType +
        '" placeholder= "' +
        this.components[html].label +
        '"/>'
      );
    } else {
      return (
        '<button type="' +
        this.components[html].inputType +
        '"> "' +
        this.components[html].label +
        '"</button>'
      );
    }
  }

  edit(index: any) {
    const ref = this.dialog.open(DialogComponent, {
      width: "500px",
      data: {
        label: index.label,
      },
    });
    ref.afterClosed().subscribe((result) => {
      index.label = result;
      this.element.splice(index.label, result);
    });
  }

  save() {
    const ref = this.dialog.open(FormComponent, {
      width: "500px",
      data: {
        name: this.name,
      },
      disableClose: false,
    });

    ref.afterClosed().subscribe((result) => {
      if (this.element) {
        if (result) {
          this.name = result;
          let newObj = { formData: this.element, formName: this.name };
          this.obj = newObj;
          if (this.id == undefined || this.name in this.obj) {
            this.server.postUser(this.obj).subscribe((res) => {
              this.router.navigate(["/new-form"]).then(() => {
                this.element = [];
              });
            });
          } else {
            this.server.updateUser(this.obj, this.id).subscribe((res) => {
              this.router.navigate(["/new-form"]).then(() => {
                this.element = [];
              });
            });
          }
        }
      }
    });
  }

  savedForm() {
    this.route.queryParams.subscribe((res) => {
      if ("form" in res) {
        this.id = res["form"];
      } else {
        this.id = res["edited"];
      }
      this.http
        .get<any>(`http://localhost:4000/forms/${this.id}`)
        .subscribe((data) => {
          this.element = data["formData"];
          this.name = data["formName"];
        });
    });
  }

  ngOnInit(): void {
    this.savedForm();
  }
}
