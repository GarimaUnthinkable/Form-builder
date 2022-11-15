import { Component, Inject } from '@angular/core';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface data {
  label: any;
}
@Component({
  styles: [
    `
      .field-placeholder {
        background: #ccc;
        border: dotted 3px #999;
        min-height: 60px;
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      fieldset {
        height: 300px;
      }

      mat-list-item {
        display: block !important;
      }
    `,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'dragger';
  label: any;

  constructor(public dialog: MatDialog) {}

  components: any[] = [
    {
      tittle: 'Text',
      type: 'input-text',
      inputType: 'text',
      label: '',
    },
    {
      tittle: 'Password',
      type: 'input-password',
      inputType: 'password',
      label: '',
    },
    {
      tittle: 'Number',
      type: 'input-number',
      inputType: 'number',
      label: '',
    },
    {
      tittle: 'Check Box',
      type: 'input-check',
      inputType: 'checkBox',
      label: '',
      displayText: 'Check box',
    },
    {
      tittle: 'Button',
      type: 'input-button',
      inputType: 'button',
      label: '',
    },
  ];

  form: any[] = [];
  button = this.components[4];

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
    let val = this.form.indexOf(index);
    console.log(val);
    this.form.splice(val, 1);
  }

  type(html: any) {
    if (
      html.inputType === 'text' ||
      html.inputType === 'password' ||
      html.inputType === 'number' ||
      html.inputType === 'checkBox'
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

  edit() {
    const ref = this.dialog.open(AppBox, {
      width: '500px',
      data: {
        label: this.label,
      },
    });
    ref.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.label = result;
    });
  }
}

@Component({
  selector: 'app-box',
  templateUrl: './app/app-box.html'
})
export class AppBox {
  label: string | undefined;
  constructor(
    public dialogRef: MatDialogRef<AppBox>,
    @Inject(MAT_DIALOG_DATA) public data: data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
