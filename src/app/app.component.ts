import { Component } from '@angular/core';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { BoxComponent } from './box/box.component';

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

  components: any[] = [
    {
      tittle: 'Text',
      type: 'input-text',
      inputType: 'text',
      placeHolder: '',
    },
    {
      tittle: 'Password',
      type: 'input-password',
      inputType: 'password',
      placeHolder: '',
    },
    {
      tittle: 'Number',
      type: 'input-number',
      inputType: 'number',
      placeHolder: '',
    },
    {
      tittle: 'Check Box',
      type: 'input-check',
      inputType: 'checkBox',
      placeHolder: null,
      displayText: 'Check box',
    },
    {
      tittle: 'Button',
      type: 'input-button',
      inputType: 'button',
      placeHolder: '',
    },
  ];
  placeHolder: any;

  constructor(public dialog: MatDialog) {}

  form: any[] = [];
  button = this.components[4];
  placeholder: any;

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
        html.inputType +
        '" placeholder= "' +
        html.placeholder +
        '"/>'
      );
    } else {
      return (
        '<button type="' +
        html.inputType +
        '"> "' +
        html.placeholder +
        '"</button>'
      );
    }
  }

  edit() {
    const dialogRef = this.dialog.open(BoxComponent)
  }
}
